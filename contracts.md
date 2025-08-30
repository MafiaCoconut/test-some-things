# Monstrino API Contracts

## Overview
This document outlines the API contracts needed to integrate the frontend with the backend for the Monstrino Monster High social network landing page.

## Current Mock Data Implementation
The frontend currently uses mock data from `/app/frontend/src/data/mock.js` including:
- Features data (6 feature cards)
- Testimonials (3 user testimonials) 
- Stats (4 community statistics)

## Required Backend Endpoints

### 1. Authentication Endpoints

#### POST /api/auth/register
Register a new monster user
```json
Request:
{
  "email": "string",
  "password": "string", 
  "username": "string"
}

Response:
{
  "success": boolean,
  "message": "string",
  "user": {
    "id": "string",
    "email": "string", 
    "username": "string",
    "createdAt": "datetime"
  },
  "token": "string"
}
```

#### POST /api/auth/login
Login existing monster user
```json
Request:
{
  "email": "string",
  "password": "string"
}

Response:
{
  "success": boolean,
  "message": "string",
  "user": {
    "id": "string",
    "email": "string",
    "username": "string"
  },
  "token": "string"
}
```

### 2. Email Subscription Endpoint

#### POST /api/subscribe
Subscribe to monster updates
```json
Request:
{
  "email": "string"
}

Response:
{
  "success": boolean,
  "message": "string",
  "subscriber": {
    "id": "string",
    "email": "string",
    "subscribedAt": "datetime"
  }
}
```

### 3. Content Endpoints (Static Data)

#### GET /api/features
Get features list for the features section
```json
Response:
{
  "success": boolean,
  "features": [
    {
      "id": "number",
      "title": "string",
      "description": "string", 
      "icon": "string",
      "bgColor": "string",
      "tags": ["string"]
    }
  ]
}
```

#### GET /api/stats
Get community statistics
```json
Response:
{
  "success": boolean,
  "stats": [
    {
      "label": "string",
      "value": "string", 
      "icon": "string"
    }
  ]
}
```

## Database Models Required

### User Model
```javascript
{
  id: ObjectId,
  email: String (unique, required),
  username: String (unique, required),
  password: String (hashed, required),
  createdAt: Date,
  updatedAt: Date
}
```

### Subscriber Model  
```javascript
{
  id: ObjectId,
  email: String (unique, required),
  subscribedAt: Date,
  active: Boolean (default: true)
}
```

### Feature Model (Optional - could be hardcoded)
```javascript
{
  id: ObjectId,
  title: String,
  description: String,
  icon: String,
  bgColor: String, 
  tags: [String],
  order: Number,
  active: Boolean
}
```

## Frontend Integration Changes Needed

### Remove Mock Data
1. Remove mock.js imports in components
2. Replace mock data with API calls using axios
3. Add loading states and error handling

### Add API Service Layer
Create `/app/frontend/src/services/api.js`:
- Authentication functions (login, register)
- Subscription function
- Features data fetching
- Error handling utilities

### Update Components
1. **AuthModal**: Connect to real authentication endpoints
2. **HeroSection**: Connect email subscription to backend
3. **FeaturesSection**: Fetch features from API
4. **Add Loading States**: Show spinners/skeletons during API calls
5. **Add Error Handling**: Display error messages for failed requests

## Authentication Flow
1. User submits login/register form
2. Frontend validates form data
3. API call to backend endpoint
4. Backend validates and responds with user data + JWT token
5. Frontend stores token (localStorage/sessionStorage)
6. Redirect user or show success message

## Email Subscription Flow
1. User enters email in hero section
2. Frontend validates email format
3. API call to /api/subscribe
4. Backend saves subscriber to database
5. Frontend shows success message "Subscribed!"

## Error Cases to Handle
- Invalid email format
- Duplicate email (registration/subscription)
- Weak password
- Server errors (500)
- Network errors
- Rate limiting

## Security Considerations
- Password hashing (bcrypt)
- JWT token validation
- Email validation
- Input sanitization
- Rate limiting on auth endpoints
- CORS configuration

## Testing Strategy
1. Test all API endpoints with valid data
2. Test error cases (invalid data, duplicates)
3. Test authentication flow end-to-end
4. Test email subscription with duplicate emails
5. Verify frontend error handling displays correctly