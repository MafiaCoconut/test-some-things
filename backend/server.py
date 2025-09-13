from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
from email_templates import get_template_by_variant


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class EmailSubscription(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    username: Optional[str] = "Ghoul"
    template_variant: str = "1"  # Default to variant 1
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True

class EmailSubscriptionCreate(BaseModel):
    email: EmailStr
    username: Optional[str] = "Ghoul"
    template_variant: Optional[str] = "1"

class EmailTemplate(BaseModel):
    subject: str
    html_body: str
    text_body: str
    recipient_email: str
    recipient_username: str
    template_variant: str
    template_type: str

class EmailSendRequest(BaseModel):
    email: EmailStr
    username: Optional[str] = "Ghoul"
    template_variant: str = "1"
    template_type: str = "newsletter"  # or "release"

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Email Subscription Endpoints
@api_router.post("/email/subscribe", response_model=EmailSubscription)
async def subscribe_to_newsletter(subscription: EmailSubscriptionCreate):
    """
    Subscribe user to newsletter and store subscription in database
    """
    try:
        # Check if email already exists
        existing_subscription = await db.email_subscriptions.find_one({"email": subscription.email})
        
        if existing_subscription:
            # Reactivate if inactive
            if not existing_subscription.get("is_active", True):
                await db.email_subscriptions.update_one(
                    {"email": subscription.email},
                    {"$set": {"is_active": True, "subscribed_at": datetime.utcnow()}}
                )
                existing_subscription["is_active"] = True
                existing_subscription["subscribed_at"] = datetime.utcnow()
                return EmailSubscription(**existing_subscription)
            else:
                raise HTTPException(status_code=400, detail="Email already subscribed")
        
        # Create new subscription
        subscription_dict = subscription.dict()
        subscription_obj = EmailSubscription(**subscription_dict)
        
        # Store in database
        await db.email_subscriptions.insert_one(subscription_obj.dict())
        
        logger.info(f"New email subscription: {subscription.email}")
        return subscription_obj
        
    except HTTPException:
        # Re-raise HTTPExceptions (like duplicate email)
        raise
    except Exception as e:
        logger.error(f"Error creating email subscription: {e}")
        raise HTTPException(status_code=500, detail="Failed to subscribe to newsletter")

@api_router.post("/email/template", response_model=EmailTemplate)
async def get_email_template(request: EmailSendRequest):
    """
    Generate email template for given parameters
    This endpoint returns the template content but doesn't send the email
    Use this to preview templates or integrate with your email service
    """
    try:
        # Get template based on variant and type
        template_data = get_template_by_variant(
            variant=request.template_variant,
            username=request.username,
            template_type=request.template_type
        )
        
        # Create template response
        email_template = EmailTemplate(
            subject=template_data["subject"],
            html_body=template_data["html_body"],
            text_body=template_data["text_body"],
            recipient_email=request.email,
            recipient_username=request.username,
            template_variant=request.template_variant,
            template_type=request.template_type
        )
        
        logger.info(f"Generated email template variant {request.template_variant} for {request.email}")
        return email_template
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error generating email template: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate email template")

@api_router.get("/email/subscriptions", response_model=List[EmailSubscription])
async def get_email_subscriptions():
    """
    Get all active email subscriptions (admin endpoint)
    """
    try:
        subscriptions = await db.email_subscriptions.find({"is_active": True}).to_list(1000)
        return [EmailSubscription(**sub) for sub in subscriptions]
    except Exception as e:
        logger.error(f"Error fetching email subscriptions: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch subscriptions")

class EmailUnsubscribeRequest(BaseModel):
    email: EmailStr

@api_router.post("/email/unsubscribe")
async def unsubscribe_from_newsletter(request: EmailUnsubscribeRequest):
    """
    Unsubscribe user from newsletter
    """
    try:
        result = await db.email_subscriptions.update_one(
            {"email": request.email},
            {"$set": {"is_active": False}}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Email subscription not found")
        
        logger.info(f"Email unsubscribed: {request.email}")
        return {"message": "Successfully unsubscribed from newsletter"}
        
    except HTTPException:
        # Re-raise HTTPExceptions (like not found)
        raise
    except Exception as e:
        logger.error(f"Error unsubscribing email: {e}")
        raise HTTPException(status_code=500, detail="Failed to unsubscribe from newsletter")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
