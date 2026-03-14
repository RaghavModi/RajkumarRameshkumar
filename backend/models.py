from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from sqlalchemy.sql import func
from database import Base

class ContactInquiry(Base):
    __tablename__ = "contact_inquiries"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    company = Column(String(200), nullable=True)
    inquiry_type = Column(String(50), nullable=False)  # general, bulk, catalogue, samples, custom
    message = Column(Text, nullable=False)
    status = Column(String(20), default='pending')  # pending, contacted, resolved
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<ContactInquiry(id={self.id}, name={self.name}, email={self.email})>"


class SampleRequest(Base):
    __tablename__ = "sample_requests"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    company = Column(String(200), nullable=True)
    fabric_type = Column(String(50), nullable=False)  # PV, PC, RC
    product_name = Column(String(100), nullable=True)  # specific sub-product
    quantity = Column(String(50), nullable=True)
    address = Column(Text, nullable=False)
    message = Column(Text, nullable=True)
    status = Column(String(20), default='pending')  # pending, processed, shipped, delivered
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<SampleRequest(id={self.id}, name={self.name}, fabric_type={self.fabric_type})>"


class CatalogueDownload(Base):
    __tablename__ = "catalogue_downloads"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    company = Column(String(200), nullable=True)
    catalogue_type = Column(String(50), default='general')  # general, pv, pc, rc
    downloaded = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    def __repr__(self):
        return f"<CatalogueDownload(id={self.id}, name={self.name}, email={self.email})>"


class Newsletter(Base):
    __tablename__ = "newsletter_subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(100), unique=True, nullable=False)
    name = Column(String(100), nullable=True)
    is_active = Column(Boolean, default=True)
    subscribed_at = Column(DateTime(timezone=True), server_default=func.now())
    unsubscribed_at = Column(DateTime(timezone=True), nullable=True)

    def __repr__(self):
        return f"<Newsletter(id={self.id}, email={self.email}, is_active={self.is_active})>"


class BulkOrder(Base):
    __tablename__ = "bulk_orders"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    company = Column(String(200), nullable=False)
    fabric_type = Column(String(50), nullable=False)
    product_name = Column(String(100), nullable=True)
    quantity = Column(String(100), nullable=False)  # e.g., "1000 meters"
    required_by = Column(String(50), nullable=True)  # delivery date
    message = Column(Text, nullable=True)
    status = Column(String(20), default='pending')  # pending, quoted, confirmed, processing, completed
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<BulkOrder(id={self.id}, company={self.company}, quantity={self.quantity})>"
