"""
Email templates for Monstrino Monster High Social Network
Flexible templates that can be adapted for any email service (SendGrid, Mailgun, SMTP, etc.)
"""

from typing import Dict, Any

# Base template with Monster High branding
MONSTER_HIGH_FOOTER = """
<div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #2d1b69 0%, #8b5fbf 100%); border-radius: 8px;">
    <div style="text-align: center; margin-bottom: 15px;">
        <h2 style="color: #ff69b4; font-family: 'Creepster', cursive; font-size: 24px; margin: 0; text-shadow: 2px 2px 4px rgba(255, 105, 180, 0.3);">
            MONSTRINO
        </h2>
        <p style="color: #a855f7; font-size: 12px; margin: 5px 0 0 0; font-family: 'Fira Code', monospace;">
            MONSTER HIGH SOCIAL NETWORK
        </p>
    </div>
    
    <div style="border-top: 1px solid rgba(255, 105, 180, 0.3); padding-top: 15px; color: #d1d5db; font-size: 11px; line-height: 1.4;">
        <p style="margin: 0 0 8px 0; text-align: center;">
            <strong>⚠️ IMPORTANT DISCLAIMER ⚠️</strong>
        </p>
        <p style="margin: 0 0 8px 0; text-align: center;">
            This is a fan-made, non-commercial social network created by and for Monster High enthusiasts.
        </p>
        <p style="margin: 0 0 8px 0; text-align: center;">
            Monster High™ is a trademark of Mattel, Inc. This project is not affiliated with, endorsed by, or sponsored by Mattel, Inc.
        </p>
        <p style="margin: 0 0 15px 0; text-align: center;">
            All rights to Monster High characters, names, and designs belong to Mattel, Inc.
        </p>
        
        <div style="text-align: center; margin-top: 15px;">
            <p style="margin: 0; font-size: 10px; color: #9ca3af;">
                Made with 💜 by the Monster High fan community
            </p>
        </div>
    </div>
</div>
"""

def get_newsletter_template_variant_1(username: str = "Ghoul") -> Dict[str, Any]:
    """
    Newsletter Template Variant 1 - Friendly & Welcoming
    Gothic theme with warm, community-focused messaging
    """
    return {
        "subject": "🦇 Welcome to the Monstrino Pack! Your Monster High Adventure Begins",
        "html_body": f"""
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background: #1a1625; color: #ffffff; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #ff69b4; font-family: 'Creepster', cursive; font-size: 36px; margin: 0; text-shadow: 2px 2px 4px rgba(255, 105, 180, 0.3);">
                    MONSTRINO
                </h1>
                <p style="color: #a855f7; font-size: 14px; margin: 5px 0 0 0; font-family: 'Fira Code', monospace;">
                    WHERE MONSTERS UNITE
                </p>
            </div>
            
            <div style="background: rgba(139, 95, 191, 0.1); padding: 25px; border-radius: 12px; border: 1px solid rgba(255, 105, 180, 0.2);">
                <h2 style="color: #ff69b4; margin: 0 0 15px 0;">Welcome to the Pack, {username}! 🎉</h2>
                
                <p style="color: #e5e7eb; line-height: 1.6; margin-bottom: 20px;">
                    Get ready for a <strong>fang-tastic</strong> journey into the most spook-tacular social network for Monster High fans! 
                    You've just joined a community where every ghoul and monster can embrace their unique style and connect with fellow collectors.
                </p>
                
                <div style="background: rgba(255, 105, 180, 0.1); padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #fbbf24; margin: 0 0 15px 0;">🌟 What awaits you in Monstrino:</h3>
                    <ul style="color: #d1d5db; line-height: 1.8; padding-left: 20px;">
                        <li><strong>Showcase your Collections:</strong> Display your Monster High dolls with pride</li>
                        <li><strong>Connect with Fellow Monsters:</strong> Make friends who share your passion</li>
                        <li><strong>Share Monster Moments:</strong> Post about your latest finds and adventures</li>
                        <li><strong>Join Groups & Communities:</strong> Find your perfect monster crew</li>
                        <li><strong>Track Your Wishlist:</strong> Never forget which dolls you're hunting for</li>
                    </ul>
                </div>
                
                <div style="text-align: center; margin: 25px 0;">
                    <a href="{{app_url}}" style="display: inline-block; background: linear-gradient(135deg, #ff69b4 0%, #a855f7 100%); color: #000000; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px;">
                        🦇 Start Your Monster Journey
                    </a>
                </div>
                
                <p style="color: #9ca3af; font-size: 14px; text-align: center; margin-top: 20px;">
                    Ready to unleash your inner monster? Your fellow ghouls are waiting!
                </p>
            </div>
            
            {MONSTER_HIGH_FOOTER}
        </div>
        """,
        "text_body": f"""
        Welcome to Monstrino, {username}!
        
        Get ready for a fang-tastic journey into the most spook-tacular social network for Monster High fans!
        
        What awaits you in Monstrino:
        - Showcase your Collections: Display your Monster High dolls with pride
        - Connect with Fellow Monsters: Make friends who share your passion  
        - Share Monster Moments: Post about your latest finds and adventures
        - Join Groups & Communities: Find your perfect monster crew
        - Track Your Wishlist: Never forget which dolls you're hunting for
        
        Start your monster journey: {{app_url}}
        
        Ready to unleash your inner monster? Your fellow ghouls are waiting!
        
        ---
        MONSTRINO - MONSTER HIGH SOCIAL NETWORK
        
        IMPORTANT DISCLAIMER:
        This is a fan-made, non-commercial social network created by and for Monster High enthusiasts.
        Monster High™ is a trademark of Mattel, Inc. This project is not affiliated with, endorsed by, or sponsored by Mattel, Inc.
        All rights to Monster High characters, names, and designs belong to Mattel, Inc.
        
        Made with 💜 by the Monster High fan community
        """
    }

def get_newsletter_template_variant_2(username: str = "Ghoul") -> Dict[str, Any]:
    """
    Newsletter Template Variant 2 - Bold & Energetic
    High-energy design with strong call-to-actions
    """
    return {
        "subject": "⚡ MONSTER ALERT: Welcome to Monstrino - Where Ghouls Rule! ⚡",
        "html_body": f"""
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background: #0f0a19; color: #ffffff; padding: 20px;">
            <div style="background: linear-gradient(135deg, #ff69b4 0%, #8b5fbf 50%, #fbbf24 100%); padding: 20px; text-align: center; border-radius: 15px; margin-bottom: 25px;">
                <h1 style="color: #000000; font-family: 'Creepster', cursive; font-size: 42px; margin: 0; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);">
                    MONSTRINO
                </h1>
                <p style="color: #2d1b69; font-size: 16px; margin: 5px 0 0 0; font-family: 'Fira Code', monospace; font-weight: bold;">
                    ⚡ POWER UP YOUR MONSTER LIFE ⚡
                </p>
            </div>
            
            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="color: #ff69b4; font-size: 28px; margin: 0 0 10px 0;">
                    🔥 WELCOME TO THE REVOLUTION, {username.upper()}! 🔥
                </h2>
                <p style="color: #fbbf24; font-size: 18px; font-weight: bold; margin: 0;">
                    THE ULTIMATE MONSTER HIGH EXPERIENCE IS HERE!
                </p>
            </div>
            
            <div style="background: linear-gradient(135deg, rgba(255, 105, 180, 0.2) 0%, rgba(139, 95, 191, 0.2) 100%); padding: 25px; border-radius: 12px; border: 2px solid #ff69b4; margin-bottom: 25px;">
                <p style="color: #e5e7eb; line-height: 1.7; font-size: 16px; margin-bottom: 25px;">
                    You've just unlocked access to the most <strong>ELECTRIFYING</strong> Monster High community on the web! 
                    Get ready to connect, collect, and conquer alongside thousands of fellow monster enthusiasts!
                </p>
                
                <div style="display: grid; gap: 15px; margin: 25px 0;">
                    <div style="background: rgba(255, 105, 180, 0.3); padding: 15px; border-radius: 8px; border-left: 4px solid #ff69b4;">
                        <strong style="color: #fbbf24;">⚡ INSTANT COLLECTION SHOWCASE</strong>
                        <p style="color: #d1d5db; margin: 5px 0 0 0;">Flaunt your dolls like never before!</p>
                    </div>
                    <div style="background: rgba(139, 95, 191, 0.3); padding: 15px; border-radius: 8px; border-left: 4px solid #8b5fbf;">
                        <strong style="color: #fbbf24;">⚡ MONSTER SQUAD CONNECTIONS</strong>
                        <p style="color: #d1d5db; margin: 5px 0 0 0;">Find your perfect monster crew!</p>
                    </div>
                    <div style="background: rgba(251, 191, 36, 0.3); padding: 15px; border-radius: 8px; border-left: 4px solid #fbbf24;">
                        <strong style="color: #fbbf24;">⚡ EPIC WISHLIST TRACKING</strong>
                        <p style="color: #d1d5db; margin: 5px 0 0 0;">Never miss a must-have doll again!</p>
                    </div>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="{{app_url}}" style="display: inline-block; background: linear-gradient(135deg, #fbbf24 0%, #ff69b4 100%); color: #000000; padding: 18px 35px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 18px; text-transform: uppercase; box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);">
                        🚀 UNLEASH THE MONSTER
                    </a>
                </div>
            </div>
            
            <div style="background: rgba(0, 0, 0, 0.3); padding: 20px; border-radius: 10px; text-align: center;">
                <p style="color: #ff69b4; font-size: 16px; font-weight: bold; margin: 0 0 10px 0;">
                    🎯 Your Monster Adventure Starts NOW!
                </p>
                <p style="color: #d1d5db; font-size: 14px; margin: 0;">
                    Join thousands of collectors already living their best monster life!
                </p>
            </div>
            
            {MONSTER_HIGH_FOOTER}
        </div>
        """,
        "text_body": f"""
        ⚡ MONSTER ALERT: WELCOME TO MONSTRINO ⚡
        
        WELCOME TO THE REVOLUTION, {username.upper()}!
        THE ULTIMATE MONSTER HIGH EXPERIENCE IS HERE!
        
        You've just unlocked access to the most ELECTRIFYING Monster High community on the web!
        
        What's waiting for you:
        ⚡ INSTANT COLLECTION SHOWCASE - Flaunt your dolls like never before!
        ⚡ MONSTER SQUAD CONNECTIONS - Find your perfect monster crew!
        ⚡ EPIC WISHLIST TRACKING - Never miss a must-have doll again!
        
        UNLEASH THE MONSTER: {{app_url}}
        
        Your Monster Adventure Starts NOW!
        Join thousands of collectors already living their best monster life!
        
        ---
        MONSTRINO - MONSTER HIGH SOCIAL NETWORK
        
        IMPORTANT DISCLAIMER:
        This is a fan-made, non-commercial social network created by and for Monster High enthusiasts.
        Monster High™ is a trademark of Mattel, Inc. This project is not affiliated with, endorsed by, or sponsored by Mattel, Inc.
        All rights to Monster High characters, names, and designs belong to Mattel, Inc.
        
        Made with 💜 by the Monster High fan community
        """
    }

def get_newsletter_template_variant_3(username: str = "Ghoul") -> Dict[str, Any]:
    """
    Newsletter Template Variant 3 - Elegant & Sophisticated
    More refined design with focus on community and collecting
    """
    return {
        "subject": "🌙 Your Invitation to Monstrino - The Premier Monster High Community",
        "html_body": f"""
        <div style="max-width: 600px; margin: 0 auto; font-family: 'Georgia', serif; background: #1a1625; color: #ffffff; padding: 30px;">
            <div style="text-align: center; margin-bottom: 40px; padding-bottom: 25px; border-bottom: 2px solid rgba(139, 95, 191, 0.3);">
                <h1 style="color: #ff69b4; font-family: 'Creepster', cursive; font-size: 32px; margin: 0; text-shadow: 2px 2px 4px rgba(255, 105, 180, 0.3); letter-spacing: 2px;">
                    MONSTRINO
                </h1>
                <p style="color: #a855f7; font-size: 14px; margin: 10px 0 0 0; font-family: 'Fira Code', monospace; letter-spacing: 1px;">
                    A DISTINGUISHED MONSTER HIGH SOCIETY
                </p>
            </div>
            
            <div style="margin-bottom: 35px;">
                <h2 style="color: #fbbf24; font-size: 24px; margin: 0 0 20px 0; text-align: center;">
                    Greetings, {username} 🌙
                </h2>
                
                <p style="color: #e5e7eb; line-height: 1.8; font-size: 16px; margin-bottom: 25px; text-align: justify;">
                    You have been cordially invited to join <strong>Monstrino</strong>, the most distinguished social network 
                    for Monster High enthusiasts and collectors. Our community celebrates the artistry, creativity, and 
                    passion that makes Monster High collecting such a treasured hobby.
                </p>
                
                <div style="background: linear-gradient(135deg, rgba(139, 95, 191, 0.1) 0%, rgba(255, 105, 180, 0.1) 100%); padding: 30px; border-radius: 10px; border: 1px solid rgba(139, 95, 191, 0.3); margin: 25px 0;">
                    <h3 style="color: #ff69b4; margin: 0 0 20px 0; font-size: 20px; text-align: center;">
                        ✨ Discover Your New Monster Home ✨
                    </h3>
                    
                    <div style="margin: 20px 0;">
                        <div style="margin-bottom: 15px; padding: 12px 0; border-bottom: 1px solid rgba(255, 105, 180, 0.2);">
                            <strong style="color: #fbbf24;">🏛️ Curated Collections</strong>
                            <p style="color: #d1d5db; margin: 5px 0 0 0; font-size: 14px;">Showcase your treasured dolls in beautifully organized galleries</p>
                        </div>
                        <div style="margin-bottom: 15px; padding: 12px 0; border-bottom: 1px solid rgba(255, 105, 180, 0.2);">
                            <strong style="color: #fbbf24;">👥 Refined Community</strong>
                            <p style="color: #d1d5db; margin: 5px 0 0 0; font-size: 14px;">Connect with fellow collectors who appreciate the finer details</p>
                        </div>
                        <div style="margin-bottom: 15px; padding: 12px 0; border-bottom: 1px solid rgba(255, 105, 180, 0.2);">
                            <strong style="color: #fbbf24;">📚 Knowledge Sharing</strong>
                            <p style="color: #d1d5db; margin: 5px 0 0 0; font-size: 14px;">Exchange insights, tips, and stories with passionate enthusiasts</p>
                        </div>
                        <div style="padding: 12px 0;">
                            <strong style="color: #fbbf24;">💎 Exclusive Features</strong>
                            <p style="color: #d1d5db; margin: 5px 0 0 0; font-size: 14px;">Advanced wishlist tracking and collection management tools</p>
                        </div>
                    </div>
                </div>
                
                <div style="text-align: center; margin: 35px 0;">
                    <a href="{{app_url}}" style="display: inline-block; background: linear-gradient(135deg, #8b5fbf 0%, #ff69b4 100%); color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 3px 12px rgba(139, 95, 191, 0.3);">
                        🌙 Enter Monstrino
                    </a>
                </div>
                
                <p style="color: #a855f7; font-size: 14px; text-align: center; font-style: italic; margin-top: 25px;">
                    "Where every collector finds their perfect monster family"
                </p>
            </div>
            
            {MONSTER_HIGH_FOOTER}
        </div>
        """,
        "text_body": f"""
        Greetings, {username}!
        
        You have been cordially invited to join Monstrino, the most distinguished social network for Monster High enthusiasts and collectors.
        
        Our community celebrates the artistry, creativity, and passion that makes Monster High collecting such a treasured hobby.
        
        Discover Your New Monster Home:
        🏛️ Curated Collections - Showcase your treasured dolls in beautifully organized galleries
        👥 Refined Community - Connect with fellow collectors who appreciate the finer details  
        📚 Knowledge Sharing - Exchange insights, tips, and stories with passionate enthusiasts
        💎 Exclusive Features - Advanced wishlist tracking and collection management tools
        
        Enter Monstrino: {{app_url}}
        
        "Where every collector finds their perfect monster family"
        
        ---
        MONSTRINO - A DISTINGUISHED MONSTER HIGH SOCIETY
        
        IMPORTANT DISCLAIMER:
        This is a fan-made, non-commercial social network created by and for Monster High enthusiasts.
        Monster High™ is a trademark of Mattel, Inc. This project is not affiliated with, endorsed by, or sponsored by Mattel, Inc.
        All rights to Monster High characters, names, and designs belong to Mattel, Inc.
        
        Made with 💜 by the Monster High fan community
        """
    }

def get_v1_release_template(username: str = "Ghoul") -> Dict[str, Any]:
    """
    Template for v1.0 release announcement
    """
    return {
        "subject": "🎉 MONSTRINO v1.0 IS LIVE! Your Monster High Social Network Awaits",
        "html_body": f"""
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background: #1a1625; color: #ffffff; padding: 20px;">
            <div style="background: linear-gradient(135deg, #ff69b4 0%, #8b5fbf 100%); padding: 25px; text-align: center; border-radius: 15px; margin-bottom: 25px;">
                <h1 style="color: #000000; font-family: 'Creepster', cursive; font-size: 38px; margin: 0; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);">
                    MONSTRINO v1.0
                </h1>
                <p style="color: #2d1b69; font-size: 18px; margin: 10px 0 0 0; font-family: 'Fira Code', monospace; font-weight: bold;">
                    🎉 OFFICIALLY LAUNCHED! 🎉
                </p>
            </div>
            
            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="color: #fbbf24; font-size: 24px; margin: 0 0 15px 0;">
                    The Wait is Over, {username}! 
                </h2>
                <p style="color: #e5e7eb; font-size: 16px; line-height: 1.6;">
                    Your favorite Monster High social network is now <strong>LIVE</strong> and ready for you to explore!
                </p>
            </div>
            
            <div style="background: rgba(139, 95, 191, 0.1); padding: 25px; border-radius: 12px; border: 1px solid rgba(255, 105, 180, 0.2); margin-bottom: 25px;">
                <h3 style="color: #ff69b4; margin: 0 0 20px 0; text-align: center;">✨ What's New in v1.0 ✨</h3>
                
                <ul style="color: #d1d5db; line-height: 1.8; padding-left: 20px;">
                    <li><strong>Full Collection Management:</strong> Upload, organize, and showcase your Monster High dolls</li>
                    <li><strong>Social Features:</strong> Connect with friends, join groups, and share your monster moments</li>
                    <li><strong>Wishlist System:</strong> Keep track of dolls you want to add to your collection</li>
                    <li><strong>Achievement System:</strong> Unlock badges as you grow your monster community</li>
                    <li><strong>Mobile-Optimized:</strong> Perfect experience on all your devices</li>
                    <li><strong>Community Groups:</strong> Find and join specialized collector communities</li>
                </ul>
                
                <div style="text-align: center; margin: 25px 0;">
                    <a href="{{app_url}}" style="display: inline-block; background: linear-gradient(135deg, #fbbf24 0%, #ff69b4 100%); color: #000000; padding: 16px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px;">
                        🚀 Explore Monstrino v1.0
                    </a>
                </div>
            </div>
            
            <div style="background: rgba(251, 191, 36, 0.1); padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 25px;">
                <h4 style="color: #fbbf24; margin: 0 0 10px 0;">🙏 Thank You for Your Patience!</h4>
                <p style="color: #d1d5db; font-size: 14px; margin: 0;">
                    We've been working hard to create the ultimate Monster High experience. Your feedback and support have been incredible!
                </p>
            </div>
            
            {MONSTER_HIGH_FOOTER}
        </div>
        """,
        "text_body": f"""
        MONSTRINO v1.0 IS LIVE!
        
        The Wait is Over, {username}!
        
        Your favorite Monster High social network is now LIVE and ready for you to explore!
        
        What's New in v1.0:
        - Full Collection Management: Upload, organize, and showcase your Monster High dolls
        - Social Features: Connect with friends, join groups, and share your monster moments
        - Wishlist System: Keep track of dolls you want to add to your collection  
        - Achievement System: Unlock badges as you grow your monster community
        - Mobile-Optimized: Perfect experience on all your devices
        - Community Groups: Find and join specialized collector communities
        
        Explore Monstrino v1.0: {{app_url}}
        
        Thank You for Your Patience!
        We've been working hard to create the ultimate Monster High experience. Your feedback and support have been incredible!
        
        ---
        MONSTRINO - MONSTER HIGH SOCIAL NETWORK
        
        IMPORTANT DISCLAIMER:
        This is a fan-made, non-commercial social network created by and for Monster High enthusiasts.
        Monster High™ is a trademark of Mattel, Inc. This project is not affiliated with, endorsed by, or sponsored by Mattel, Inc.
        All rights to Monster High characters, names, and designs belong to Mattel, Inc.
        
        Made with 💜 by the Monster High fan community
        """
    }

# Utility function to get template by variant
def get_template_by_variant(variant: str, username: str = "Ghoul", template_type: str = "newsletter") -> Dict[str, Any]:
    """
    Get email template by variant number
    
    Args:
        variant: "1", "2", or "3" for newsletter templates, "v1_release" for release announcement
        username: Username to personalize the email
        template_type: "newsletter" or "release"
    
    Returns:
        Dictionary with subject, html_body, and text_body
    """
    if template_type == "release":
        return get_v1_release_template(username)
    
    template_map = {
        "1": get_newsletter_template_variant_1,
        "2": get_newsletter_template_variant_2, 
        "3": get_newsletter_template_variant_3
    }
    
    if variant not in template_map:
        raise ValueError(f"Unknown template variant: {variant}. Available variants: {list(template_map.keys())}")
    
    return template_map[variant](username)