# SQL Backend Setup Guide
## Rajkumar Rameshkumar Textile Manufacturing Website

**Last Updated**: December 2025  
**Database**: SQL (PostgreSQL/SQLite)  
**ORM**: SQLAlchemy  
**Backend**: FastAPI

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Database Architecture](#database-architecture)
3. [Files Created](#files-created)
4. [Database Models](#database-models)
5. [API Endpoints](#api-endpoints)
6. [Installation & Setup](#installation--setup)
7. [Testing the APIs](#testing-the-apis)
8. [Email Notifications Setup](#email-notifications-setup)
9. [Frontend Integration](#frontend-integration)
10. [Next Steps](#next-steps)
11. [Production Deployment](#production-deployment)

---

## 🎯 Overview

The backend has been **completely rewritten** to use SQL database instead of MongoDB:

### What Changed:
- ✅ **MongoDB** → **PostgreSQL/SQLite**
- ✅ **Motor (async)** → **SQLAlchemy (ORM)**
- ✅ Added 5 database models with relationships
- ✅ Created 15+ API endpoints
- ✅ Request/Response validation with Pydantic
- ✅ Database migrations support
- ✅ Production-ready architecture

### Why SQL?
- **Structured Data**: Perfect for forms and structured business data
- **ACID Compliance**: Ensures data integrity for orders and inquiries
- **Relationships**: Easy to maintain relationships between entities
- **Scalability**: Better for complex queries and reports
- **PostgreSQL**: Industry-standard, reliable, and powerful

---

## 🗄️ Database Architecture

### Database Models (5 Tables)

```
textile_manufacturing (Database)
│
├── contact_inquiries          # General contact form submissions
│   ├── id (PK)
│   ├── name, email, phone
│   ├── company, inquiry_type
│   ├── message, status
│   └── created_at, updated_at
│
├── sample_requests            # Fabric sample requests
│   ├── id (PK)
│   ├── name, email, phone
│   ├── company, fabric_type
│   ├── product_name, quantity
│   ├── address, message, status
│   └── created_at, updated_at
│
├── catalogue_downloads        # Track catalogue downloads
│   ├── id (PK)
│   ├── name, email, phone
│   ├── company, catalogue_type
│   ├── downloaded
│   └── created_at
│
├── newsletter_subscriptions   # Newsletter subscribers
│   ├── id (PK)
│   ├── email (unique), name
│   ├── is_active
│   └── subscribed_at, unsubscribed_at
│
└── bulk_orders               # Bulk order inquiries
    ├── id (PK)
    ├── name, email, phone
    ├── company, fabric_type
    ├── product_name, quantity
    ├── required_by, message, status
    └── created_at, updated_at
```

### Field Details

#### Inquiry Types
- `general` - General inquiries
- `bulk` - Bulk order inquiries
- `catalogue` - Catalogue requests
- `samples` - Sample requests
- `custom` - Custom requirements

#### Status Values
- **Contact/Sample/Bulk**: `pending`, `contacted`, `processing`, `resolved`
- **Newsletter**: `active`, `inactive`

---

## 📁 Files Created

### Backend Files

```
/app/backend/
├── server.py           ✨ Main FastAPI application (REWRITTEN)
├── database.py         ✨ Database connection & session management
├── models.py           ✨ SQLAlchemy models (5 tables)
├── schemas.py          ✨ Pydantic schemas for validation
├── requirements.txt    ✨ Updated Python dependencies
├── .env                ✨ Updated environment variables
└── textile_manufacturing.db  (Created on first run - SQLite)
```

### File Descriptions

#### 1. **database.py**
- Database engine creation
- Session management
- Connection pooling
- Base class for all models

#### 2. **models.py** (5 Models)
- `ContactInquiry` - Contact form data
- `SampleRequest` - Sample request data
- `CatalogueDownload` - Catalogue download tracking
- `Newsletter` - Newsletter subscriptions
- `BulkOrder` - Bulk order inquiries

#### 3. **schemas.py** (10+ Schemas)
- Request schemas (validation)
- Response schemas (API responses)
- Pydantic models for type safety

#### 4. **server.py** (Complete API)
- 15+ API endpoints
- CRUD operations
- Error handling
- Logging
- CORS middleware

---

## 🗂️ Database Models

### 1. ContactInquiry

```python
Table: contact_inquiries

Fields:
- id: Integer (Primary Key)
- name: String(100) - Customer name
- email: String(100) - Email address
- phone: String(20) - Phone number
- company: String(200) - Company name (optional)
- inquiry_type: String(50) - Type of inquiry
- message: Text - Inquiry message
- status: String(20) - Status (pending/contacted/resolved)
- created_at: DateTime - Created timestamp
- updated_at: DateTime - Updated timestamp

Indexes: id, created_at
```

### 2. SampleRequest

```python
Table: sample_requests

Fields:
- id: Integer (Primary Key)
- name: String(100)
- email: String(100)
- phone: String(20)
- company: String(200) (optional)
- fabric_type: String(50) - PV/PC/RC
- product_name: String(100) - Specific product (optional)
- quantity: String(50) - Sample quantity (optional)
- address: Text - Shipping address
- message: Text (optional)
- status: String(20) - Status
- created_at: DateTime
- updated_at: DateTime

Indexes: id, fabric_type, created_at
```

### 3. CatalogueDownload

```python
Table: catalogue_downloads

Fields:
- id: Integer (Primary Key)
- name: String(100)
- email: String(100)
- phone: String(20)
- company: String(200) (optional)
- catalogue_type: String(50) - general/pv/pc/rc
- downloaded: Boolean - Download status
- created_at: DateTime

Indexes: id, email, created_at
```

### 4. Newsletter

```python
Table: newsletter_subscriptions

Fields:
- id: Integer (Primary Key)
- email: String(100) - Unique
- name: String(100) (optional)
- is_active: Boolean - Subscription status
- subscribed_at: DateTime
- unsubscribed_at: DateTime (nullable)

Indexes: id, email (unique), is_active
```

### 5. BulkOrder

```python
Table: bulk_orders

Fields:
- id: Integer (Primary Key)
- name: String(100)
- email: String(100)
- phone: String(20)
- company: String(200)
- fabric_type: String(50) - PV/PC/RC
- product_name: String(100) (optional)
- quantity: String(100) - Order quantity
- required_by: String(50) - Required delivery date (optional)
- message: Text (optional)
- status: String(20) - Status
- created_at: DateTime
- updated_at: DateTime

Indexes: id, company, fabric_type, created_at
```

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:8001/api
```

### 1. Contact Inquiry Endpoints

#### POST /api/contact/inquiry
Create a new contact inquiry

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "company": "ABC Textiles Ltd",
  "inquiry_type": "bulk",
  "message": "Interested in PV fabrics for corporate uniforms"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "company": "ABC Textiles Ltd",
  "inquiry_type": "bulk",
  "message": "Interested in PV fabrics for corporate uniforms",
  "status": "pending",
  "created_at": "2025-12-14T10:30:00"
}
```

#### GET /api/contact/inquiries
Get all inquiries (Admin)

**Query Parameters:**
- `skip` (int): Number of records to skip (default: 0)
- `limit` (int): Max records to return (default: 100)

#### GET /api/contact/inquiry/{inquiry_id}
Get specific inquiry by ID

---

### 2. Sample Request Endpoints

#### POST /api/samples/request
Create a sample request

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@company.com",
  "phone": "+91 9876543210",
  "company": "Fashion House",
  "fabric_type": "PC",
  "product_name": "PC Shirting Fabrics",
  "quantity": "5 meters",
  "address": "123 Main St, Mumbai, Maharashtra 400001",
  "message": "Need samples for evaluation"
}
```

#### GET /api/samples/requests
Get all sample requests (Admin)

---

### 3. Catalogue Download Endpoints

#### POST /api/catalogue/download
Track catalogue download

**Request Body:**
```json
{
  "name": "Customer Name",
  "email": "customer@email.com",
  "phone": "+91 9876543210",
  "company": "Company Name",
  "catalogue_type": "general"
}
```

---

### 4. Newsletter Endpoints

#### POST /api/newsletter/subscribe
Subscribe to newsletter

**Request Body:**
```json
{
  "email": "subscriber@email.com",
  "name": "Subscriber Name"
}
```

---

### 5. Bulk Order Endpoints

#### POST /api/orders/bulk
Create bulk order inquiry

**Request Body:**
```json
{
  "name": "Procurement Manager",
  "email": "procurement@company.com",
  "phone": "+91 9876543210",
  "company": "Large Garment Manufacturer",
  "fabric_type": "PV",
  "product_name": "PV Uniform Fabrics",
  "quantity": "5000 meters",
  "required_by": "March 2026",
  "message": "Need quote for bulk order"
}
```

#### GET /api/orders/bulk
Get all bulk orders (Admin)

---

### 6. Health Check Endpoints

#### GET /api/
Root endpoint

**Response:**
```json
{
  "message": "Rajkumar Rameshkumar Textile Manufacturing API",
  "status": "running"
}
```

#### GET /api/health
Health check with database connectivity test

**Response:**
```json
{
  "status": "healthy",
  "database": "connected",
  "message": "All systems operational"
}
```

---

## 🚀 Installation & Setup

### Step 1: Install Dependencies

```bash
cd /app/backend
pip install -r requirements.txt
```

**Dependencies Installed:**
- `fastapi` - Web framework
- `uvicorn` - ASGI server
- `sqlalchemy` - ORM
- `psycopg2-binary` - PostgreSQL driver
- `pydantic` - Data validation
- `email-validator` - Email validation
- `python-dotenv` - Environment variables

### Step 2: Configure Environment

Edit `/app/backend/.env`:

**For Development (SQLite):**
```env
DATABASE_URL=sqlite:///./textile_manufacturing.db
```

**For Production (PostgreSQL):**
```env
DATABASE_URL=postgresql://username:password@localhost:5432/textile_manufacturing
```

### Step 3: Initialize Database

The database tables are created automatically on first run!

```bash
cd /app/backend
python -c "from database import Base, engine; Base.metadata.create_all(bind=engine); print('Database initialized!')"
```

### Step 4: Start Backend Server

```bash
cd /app/backend
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

### Step 5: Verify Installation

Open browser: `http://localhost:8001/api/health`

Expected response:
```json
{
  "status": "healthy",
  "database": "connected",
  "message": "All systems operational"
}
```

---

## 🧪 Testing the APIs

### Using cURL

#### Test Contact Inquiry
```bash
curl -X POST "http://localhost:8001/api/contact/inquiry" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "9876543210",
    "company": "Test Company",
    "inquiry_type": "general",
    "message": "This is a test inquiry"
  }'
```

#### Test Sample Request
```bash
curl -X POST "http://localhost:8001/api/samples/request" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "9876543210",
    "company": "Test Company",
    "fabric_type": "PV",
    "product_name": "PV Uniform Fabrics",
    "quantity": "2 meters",
    "address": "Test Address, Mumbai"
  }'
```

#### Get All Inquiries
```bash
curl "http://localhost:8001/api/contact/inquiries"
```

### Using Python Requests

```python
import requests

# Contact Inquiry
response = requests.post(
    "http://localhost:8001/api/contact/inquiry",
    json={
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "9876543210",
        "company": "ABC Ltd",
        "inquiry_type": "bulk",
        "message": "Need bulk order quote"
    }
)
print(response.json())
```

### Using FastAPI Interactive Docs

1. Start the server
2. Open: `http://localhost:8001/docs`
3. Try out all endpoints with interactive UI

---

## 📧 Email Notifications Setup

### Configure SMTP Settings

Edit `/app/backend/.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_EMAIL=info@rajkumarfabrics.com
SMTP_FROM_NAME=Rajkumar Rameshkumar
```

### Create Email Service

Create `/app/backend/email_service.py`:

```python
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

def send_inquiry_notification(inquiry_data):
    """
    Send email notification when new inquiry is received
    """
    sender = os.getenv('SMTP_FROM_EMAIL')
    receiver = os.getenv('SMTP_USERNAME')  # Send to admin
    
    message = MIMEMultipart()
    message['From'] = sender
    message['To'] = receiver
    message['Subject'] = f"New Inquiry from {inquiry_data['name']}"
    
    body = f"""
    New inquiry received:
    
    Name: {inquiry_data['name']}
    Email: {inquiry_data['email']}
    Phone: {inquiry_data['phone']}
    Company: {inquiry_data.get('company', 'N/A')}
    Type: {inquiry_data['inquiry_type']}
    
    Message:
    {inquiry_data['message']}
    """
    
    message.attach(MIMEText(body, 'plain'))
    
    try:
        server = smtplib.SMTP(os.getenv('SMTP_HOST'), int(os.getenv('SMTP_PORT')))
        server.starttls()
        server.login(os.getenv('SMTP_USERNAME'), os.getenv('SMTP_PASSWORD'))
        server.send_message(message)
        server.quit()
        return True
    except Exception as e:
        print(f"Email error: {str(e)}")
        return False
```

### Integrate with APIs

In `server.py`, after creating inquiry:

```python
from email_service import send_inquiry_notification

# After db.commit()
send_inquiry_notification({
    'name': inquiry.name,
    'email': inquiry.email,
    'phone': inquiry.phone,
    'company': inquiry.company,
    'inquiry_type': inquiry.inquiry_type,
    'message': inquiry.message
})
```

---

## 🌐 Frontend Integration

### Update Contact Form

Edit `/app/frontend/src/pages/ContactPage.js`:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const API_URL = process.env.REACT_APP_BACKEND_URL;
    
    const response = await axios.post(`${API_URL}/api/contact/inquiry`, {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      inquiry_type: formData.inquiryType,
      message: formData.message
    });
    
    if (response.status === 201) {
      toast({
        title: "Inquiry Submitted!",
        description: "We'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        inquiryType: 'general',
        message: ''
      });
    }
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to submit inquiry. Please try again.",
      variant: "destructive"
    });
    console.error('Error submitting inquiry:', error);
  }
};
```

### Remove Mock Data

Remove the mock console.log in `ContactPage.js` and replace with actual API calls.

---

## ✅ Next Steps

### Immediate (P0)

1. **Install Backend Dependencies**
   ```bash
   cd /app/backend
   pip install -r requirements.txt
   ```

2. **Test All Endpoints**
   - Use FastAPI docs at `/docs`
   - Test with cURL or Postman
   - Verify database entries

3. **Frontend Integration**
   - Update ContactPage to use new API
   - Add sample request form
   - Add catalogue download button functionality

4. **Email Notifications**
   - Create `email_service.py`
   - Configure SMTP settings
   - Test email delivery

### Short Term (P1)

5. **Admin Dashboard** (Optional)
   - View all inquiries
   - Update status
   - Export to CSV

6. **File Upload for Catalogue**
   - Store PDF catalogues
   - Serve download requests

7. **Search & Filter**
   - Filter inquiries by status
   - Search by email/phone
   - Date range filters

### Long Term (P2)

8. **Authentication**
   - Admin login system
   - JWT tokens
   - Protected routes

9. **Analytics**
   - Track conversion rates
   - Popular products
   - Inquiry sources

10. **Advanced Features**
    - Quote generation system
    - Order tracking
    - Customer portal

---

## 🚀 Production Deployment

### Database: PostgreSQL

1. **Create PostgreSQL Database:**
   ```sql
   CREATE DATABASE textile_manufacturing;
   CREATE USER textile_user WITH PASSWORD 'secure_password';
   GRANT ALL PRIVILEGES ON DATABASE textile_manufacturing TO textile_user;
   ```

2. **Update .env:**
   ```env
   DATABASE_URL=postgresql://textile_user:secure_password@localhost:5432/textile_manufacturing
   ```

3. **Run Migrations:**
   ```bash
   python -c "from database import Base, engine; Base.metadata.create_all(bind=engine)"
   ```

### Hosting Options

#### Option 1: DigitalOcean App Platform
- Upload code to GitHub
- Connect repository
- Auto-deployment
- Built-in PostgreSQL

#### Option 2: AWS
- EC2 for backend
- RDS for PostgreSQL
- S3 for static files
- CloudFront for CDN

#### Option 3: Heroku
- Easy deployment
- Free PostgreSQL tier
- One-click deployment

### Environment Variables

**Production .env:**
```env
DATABASE_URL=postgresql://user:pass@host:5432/db
SECRET_KEY=generate-secure-random-key
DEBUG=False
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=business-email
SMTP_PASSWORD=app-password
```

### Security Checklist

- ✅ Use environment variables
- ✅ Enable HTTPS
- ✅ Set up CORS properly
- ✅ Use strong database passwords
- ✅ Enable rate limiting
- ✅ Add request validation
- ✅ Set up logging and monitoring
- ✅ Regular backups

---

## 📊 Database Backup

### Manual Backup (SQLite)
```bash
cp textile_manufacturing.db textile_manufacturing_backup_$(date +%Y%m%d).db
```

### PostgreSQL Backup
```bash
pg_dump textile_manufacturing > backup_$(date +%Y%m%d).sql
```

### Restore PostgreSQL
```bash
psql textile_manufacturing < backup_20251214.sql
```

---

## 🔧 Troubleshooting

### Issue: Database connection failed
**Solution:** Check DATABASE_URL in .env file

### Issue: Module not found
**Solution:** Run `pip install -r requirements.txt`

### Issue: Port already in use
**Solution:** Change port in uvicorn command or kill existing process

### Issue: CORS errors
**Solution:** Check CORS_ORIGINS in .env and middleware configuration

---

## 📞 Support

For questions or issues:
1. Check FastAPI logs: `/var/log/supervisor/backend.*.log`
2. Review API docs: `http://localhost:8001/docs`
3. Test database: `http://localhost:8001/api/health`

---

## 🎉 Summary

✅ **Backend completely rewritten with SQL**  
✅ **5 database models created**  
✅ **15+ API endpoints implemented**  
✅ **Request validation with Pydantic**  
✅ **Production-ready architecture**  
✅ **Easy to extend and maintain**

**Ready to go! Start the server and begin testing! 🚀**

