from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

# Contact Inquiry Schemas
class ContactInquiryCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    company: Optional[str] = Field(None, max_length=200)
    inquiry_type: str = Field(..., pattern="^(general|bulk|catalogue|samples|custom)$")
    message: str = Field(..., min_length=10)

class ContactInquiryResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    company: Optional[str]
    inquiry_type: str
    message: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


# Sample Request Schemas
class SampleRequestCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    company: Optional[str] = Field(None, max_length=200)
    fabric_type: str = Field(..., pattern="^(PV|PC|RC)$")
    product_name: Optional[str] = Field(None, max_length=100)
    quantity: Optional[str] = Field(None, max_length=50)
    address: str = Field(..., min_length=10)
    message: Optional[str] = None

class SampleRequestResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    company: Optional[str]
    fabric_type: str
    product_name: Optional[str]
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


# Catalogue Download Schemas
class CatalogueDownloadCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    company: Optional[str] = Field(None, max_length=200)
    catalogue_type: str = Field(default='general')

class CatalogueDownloadResponse(BaseModel):
    id: int
    name: str
    email: str
    catalogue_type: str
    created_at: datetime

    class Config:
        from_attributes = True


# Newsletter Schemas
class NewsletterSubscribe(BaseModel):
    email: EmailStr
    name: Optional[str] = Field(None, max_length=100)

class NewsletterResponse(BaseModel):
    id: int
    email: str
    name: Optional[str]
    is_active: bool
    subscribed_at: datetime

    class Config:
        from_attributes = True


# Bulk Order Schemas
class BulkOrderCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    company: str = Field(..., min_length=2, max_length=200)
    fabric_type: str = Field(..., pattern="^(PV|PC|RC)$")
    product_name: Optional[str] = Field(None, max_length=100)
    quantity: str = Field(..., min_length=1, max_length=100)
    required_by: Optional[str] = Field(None, max_length=50)
    message: Optional[str] = None

class BulkOrderResponse(BaseModel):
    id: int
    name: str
    email: str
    company: str
    fabric_type: str
    quantity: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


# Generic Response
class SuccessResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None
