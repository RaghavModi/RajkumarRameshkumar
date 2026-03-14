# Product Requirements Document (PRD)
# B2B Textile Manufacturing Website - Rajkumar Rameshkumar

## Original Problem Statement
Create a modern, professional B2B textile manufacturing website for Rajkumar Rameshkumar, a fabric manufacturer based in Ahmedabad, India specializing in PV, PC and R/C fabrics. The website should target fabric traders, garment manufacturers, uniform suppliers, wholesalers, and exporters.

## User Personas
1. **Fabric Traders**: Looking for reliable manufacturers with consistent quality and competitive pricing
2. **Garment Manufacturers**: Need bulk fabric supply with specific requirements
3. **Uniform Suppliers**: Require durable fabrics suitable for corporate, school, and industrial uniforms
4. **Wholesalers**: Looking for large volume orders with good margins
5. **Exporters**: Need international quality standards and reliable delivery

## Core Requirements (Static)

### Business Information
- Company Name: Rajkumar Rameshkumar
- Industry: Textile Manufacturing
- Location: Ahmedabad, Gujarat, India
- Products: PV Fabrics, PC Fabrics, R/C Fabrics, Shirting Fabrics, Uniform Fabrics
- Fabric Width Range: 36 inches – 58 inches

### Website Structure
1. Homepage - Hero banner, product preview, why choose us, CTA
2. About Us - Company introduction, expertise, capabilities
3. Products - Detailed product information for PV, PC, R/C fabrics
4. Gallery - Product images with filtering
5. Contact - Form, map, WhatsApp integration

### Key Features Required
- Mobile responsive design
- SEO optimized
- WhatsApp inquiry button (floating + contact section)
- Catalogue download section (placeholder)
- Inquiry form for bulk orders
- Google Maps integration
- Contact form with multiple inquiry types

---

## What's Been Implemented

### Phase 1: Frontend with Mock Data (Completed - Dec 2025)

#### Pages Created:
1. **HomePage** (`/app/frontend/src/pages/HomePage.js`)
   - Hero section with tagline
   - Product preview cards (3 products)
   - Why Choose Us section (6 features)
   - CTA section for catalogue and sample requests

2. **AboutPage** (`/app/frontend/src/pages/AboutPage.js`)
   - Company introduction
   - Strengths section (4 highlights)
   - Production capabilities
   - Markets we serve (6 target segments)

3. **ProductsPage** (`/app/frontend/src/pages/ProductsPage.js`)
   - Detailed product information for each fabric type
   - Features, applications, colors, width range
   - Custom requirements section

4. **GalleryPage** (`/app/frontend/src/pages/GalleryPage.js`)
   - 9 gallery images
   - Category filtering (All, PV, PC, R/C, Manufacturing)
   - Hover effects with image details

5. **ContactPage** (`/app/frontend/src/pages/ContactPage.js`)
   - Contact information cards
   - Inquiry form with validation
   - Google Maps embed (Ahmedabad)
   - WhatsApp integration
   - Quick actions (Catalogue, Samples)

#### Components Created:
- Header with responsive navigation
- Footer with links and contact info
- WhatsAppButton (floating button)

#### Mock Data (`/app/frontend/src/mock.js`):
- Company information
- 3 product types with detailed specs
- 6 why choose us points
- 9 gallery images
- 4 about highlights

#### Design Implementation:
- Clean B2B professional design
- White and deep blue color scheme
- Shadcn UI components used throughout
- Lucide-react icons
- Responsive layout
- Smooth transitions and hover effects

---

## Prioritized Backlog

### P0 Features (Critical - Next Phase)
1. **Backend Development**
   - FastAPI endpoints for contact form
   - MongoDB integration for storing inquiries
   - Email notification system for form submissions

2. **Contact Form Integration**
   - POST /api/contact/inquiry - Store inquiry in database
   - POST /api/contact/send-email - Send email notification
   - Validation and error handling

3. **Testing**
   - End-to-end testing of contact form
   - Email notification testing
   - Form validation testing

### P1 Features (Important)
1. **Catalogue Download**
   - File upload capability for PDF catalogue
   - Download tracking
   - GET /api/catalogue/download endpoint

2. **Sample Request System**
   - Separate form for sample requests
   - POST /api/samples/request endpoint
   - Admin notification system

3. **SEO Optimization**
   - Meta tags for all pages
   - Structured data for products
   - Sitemap generation

### P2 Features (Nice to Have)
1. **Admin Dashboard**
   - View inquiries
   - Manage products
   - Upload gallery images

2. **Analytics Integration**
   - Google Analytics
   - Track conversions and inquiries

3. **Product Management**
   - Add/edit products from admin panel
   - Update colors and specifications

---

## Next Tasks (Immediate)

1. ✅ Frontend with mock data completed
2. ⏭️ **Backend Development**
   - Create MongoDB models for Contact Inquiry
   - Implement contact form API endpoint
   - Set up email notification service (will need SMTP details)
   - Integrate frontend form with backend API
   - Remove mock data from contact form

3. ⏭️ **Testing**
   - Test contact form submission
   - Verify email notifications
   - Test all pages and navigation

4. ⏭️ **Catalogue & Sample Request**
   - Implement catalogue download (placeholder button functional)
   - Create sample request flow

---

## API Contracts (To Be Implemented)

### Contact Form API
```
POST /api/contact/inquiry
Request Body:
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "company": "string (optional)",
  "inquiryType": "general|bulk|catalogue|samples|custom",
  "message": "string"
}

Response:
{
  "success": true,
  "message": "Inquiry submitted successfully",
  "inquiryId": "string"
}
```

### Email Notification (Backend Internal)
- Trigger email on form submission
- Send to business email
- Include all form details

### Catalogue Download (Future)
```
GET /api/catalogue/download
Response: PDF file stream
```

### Sample Request (Future)
```
POST /api/samples/request
Request Body: Similar to contact inquiry with additional fields
```

---

## Technical Stack
- **Frontend**: React, Tailwind CSS, Shadcn UI, Lucide React
- **Backend**: FastAPI, Python
- **Database**: MongoDB
- **Deployment**: Emergent Platform

## Notes
- Currently using placeholder images (user will provide actual product photos later)
- WhatsApp number needs to be updated with actual business number
- Email SMTP configuration needed for email notifications
- Catalogue PDF needs to be provided for download functionality
