from fastapi import FastAPI, APIRouter, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from dotenv import load_dotenv
import os
import logging
from pathlib import Path
from typing import List

# Import database and models
from database import engine, get_db, Base
from models import ContactInquiry, SampleRequest, CatalogueDownload, Newsletter, BulkOrder
from schemas import (
    ContactInquiryCreate, ContactInquiryResponse,
    SampleRequestCreate, SampleRequestResponse,
    CatalogueDownloadCreate, CatalogueDownloadResponse,
    NewsletterSubscribe, NewsletterResponse,
    BulkOrderCreate, BulkOrderResponse,
    SuccessResponse
)

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create all tables
Base.metadata.create_all(bind=engine)

# Create the main app
app = FastAPI(title="Rajkumar Rameshkumar Textile Manufacturing API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ==================== CONTACT INQUIRY ENDPOINTS ====================

@api_router.post("/contact/inquiry", response_model=ContactInquiryResponse, status_code=status.HTTP_201_CREATED)
async def create_contact_inquiry(
    inquiry: ContactInquiryCreate,
    db: Session = Depends(get_db)
):
    """
    Create a new contact inquiry
    """
    try:
        db_inquiry = ContactInquiry(
            name=inquiry.name,
            email=inquiry.email,
            phone=inquiry.phone,
            company=inquiry.company,
            inquiry_type=inquiry.inquiry_type,
            message=inquiry.message
        )
        db.add(db_inquiry)
        db.commit()
        db.refresh(db_inquiry)
        
        logger.info(f"New inquiry created: {db_inquiry.id} from {inquiry.email}")
        
        # TODO: Send email notification here
        
        return db_inquiry
    except Exception as e:
        logger.error(f"Error creating inquiry: {str(e)}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create inquiry"
        )


@api_router.get("/contact/inquiries", response_model=List[ContactInquiryResponse])
async def get_all_inquiries(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    Get all contact inquiries (for admin)
    """
    inquiries = db.query(ContactInquiry).order_by(ContactInquiry.created_at.desc()).offset(skip).limit(limit).all()
    return inquiries


@api_router.get("/contact/inquiry/{inquiry_id}", response_model=ContactInquiryResponse)
async def get_inquiry(inquiry_id: int, db: Session = Depends(get_db)):
    """
    Get a specific inquiry by ID
    """
    inquiry = db.query(ContactInquiry).filter(ContactInquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return inquiry


# ==================== SAMPLE REQUEST ENDPOINTS ====================

@api_router.post("/samples/request", response_model=SampleRequestResponse, status_code=status.HTTP_201_CREATED)
async def create_sample_request(
    request: SampleRequestCreate,
    db: Session = Depends(get_db)
):
    """
    Create a new sample request
    """
    try:
        db_request = SampleRequest(
            name=request.name,
            email=request.email,
            phone=request.phone,
            company=request.company,
            fabric_type=request.fabric_type,
            product_name=request.product_name,
            quantity=request.quantity,
            address=request.address,
            message=request.message
        )
        db.add(db_request)
        db.commit()
        db.refresh(db_request)
        
        logger.info(f"New sample request: {db_request.id} from {request.email}")
        
        # TODO: Send email notification
        
        return db_request
    except Exception as e:
        logger.error(f"Error creating sample request: {str(e)}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create sample request"
        )


@api_router.get("/samples/requests", response_model=List[SampleRequestResponse])
async def get_all_sample_requests(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    Get all sample requests (for admin)
    """
    requests = db.query(SampleRequest).order_by(SampleRequest.created_at.desc()).offset(skip).limit(limit).all()
    return requests


# ==================== CATALOGUE DOWNLOAD ENDPOINTS ====================

@api_router.post("/catalogue/download", response_model=CatalogueDownloadResponse, status_code=status.HTTP_201_CREATED)
async def request_catalogue_download(
    request: CatalogueDownloadCreate,
    db: Session = Depends(get_db)
):
    """
    Track catalogue download request
    """
    try:
        db_download = CatalogueDownload(
            name=request.name,
            email=request.email,
            phone=request.phone,
            company=request.company,
            catalogue_type=request.catalogue_type,
            downloaded=True
        )
        db.add(db_download)
        db.commit()
        db.refresh(db_download)
        
        logger.info(f"Catalogue download tracked: {db_download.id} - {request.email}")
        
        # TODO: Return catalogue file or send email with link
        
        return db_download
    except Exception as e:
        logger.error(f"Error tracking catalogue download: {str(e)}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to process catalogue request"
        )


# ==================== NEWSLETTER ENDPOINTS ====================

@api_router.post("/newsletter/subscribe", response_model=NewsletterResponse, status_code=status.HTTP_201_CREATED)
async def subscribe_newsletter(
    subscription: NewsletterSubscribe,
    db: Session = Depends(get_db)
):
    """
    Subscribe to newsletter
    """
    try:
        # Check if already subscribed
        existing = db.query(Newsletter).filter(Newsletter.email == subscription.email).first()
        if existing:
            if existing.is_active:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email already subscribed"
                )
            else:
                # Reactivate subscription
                existing.is_active = True
                db.commit()
                db.refresh(existing)
                return existing
        
        # Create new subscription
        db_subscription = Newsletter(
            email=subscription.email,
            name=subscription.name
        )
        db.add(db_subscription)
        db.commit()
        db.refresh(db_subscription)
        
        logger.info(f"New newsletter subscription: {subscription.email}")
        
        return db_subscription
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error subscribing to newsletter: {str(e)}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to subscribe"
        )


# ==================== BULK ORDER ENDPOINTS ====================

@api_router.post("/orders/bulk", response_model=BulkOrderResponse, status_code=status.HTTP_201_CREATED)
async def create_bulk_order(
    order: BulkOrderCreate,
    db: Session = Depends(get_db)
):
    """
    Create a new bulk order inquiry
    """
    try:
        db_order = BulkOrder(
            name=order.name,
            email=order.email,
            phone=order.phone,
            company=order.company,
            fabric_type=order.fabric_type,
            product_name=order.product_name,
            quantity=order.quantity,
            required_by=order.required_by,
            message=order.message
        )
        db.add(db_order)
        db.commit()
        db.refresh(db_order)
        
        logger.info(f"New bulk order: {db_order.id} from {order.company}")
        
        # TODO: Send email notification
        
        return db_order
    except Exception as e:
        logger.error(f"Error creating bulk order: {str(e)}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create bulk order"
        )


@api_router.get("/orders/bulk", response_model=List[BulkOrderResponse])
async def get_all_bulk_orders(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    Get all bulk orders (for admin)
    """
    orders = db.query(BulkOrder).order_by(BulkOrder.created_at.desc()).offset(skip).limit(limit).all()
    return orders


# ==================== HEALTH CHECK ====================

@api_router.get("/")
async def root():
    return {"message": "Rajkumar Rameshkumar Textile Manufacturing API", "status": "running"}


@api_router.get("/health")
async def health_check(db: Session = Depends(get_db)):
    """
    Health check endpoint with database connectivity test
    """
    try:
        # Test database connection
        from sqlalchemy import text
        db.execute(text("SELECT 1"))
        return {
            "status": "healthy",
            "database": "connected",
            "message": "All systems operational"
        }
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Service unavailable"
        )


# Include the router in the main app
app.include_router(api_router)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Application shutting down")
