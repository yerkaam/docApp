# DocApp — Doctor Appointment Booking System (MVP)

## Description
DocApp is a web application for booking doctor appointments online. It allows patients to book visits, view their medical information, and communicate with doctors. Doctors can manage schedules and update patient medical records.

## Problem
Traditional appointment booking (phone calls or in-person visits) is time-consuming and often leads to scheduling conflicts. This is inconvenient for both patients and doctors.

## Solution
DocApp provides an online platform where users can choose available time slots and book appointments. All data is stored centrally and accessible only to authorized users.

## Target Users
- **Patients** — book appointments and manage personal medical information
- **Doctors** — manage schedules and update patient medical records

## Technology Stack
- **Frontend:** Angular
- **Backend:** Node.js
- **Database:** MongoDB
- **Authentication:** JWT

## Project Setup

### Backend
```bash
node server.js
```

### Frontend
```bash
npm install
ng serve
```

## Project Status
This project is an MVP created for academic purposes. It can be extended and improved in future releases.

---

## Product Requirements (PRD)

### Product Vision
Create a fast and easy-to-use web platform for online doctor appointment booking to reduce paperwork and improve accessibility of healthcare services.

### Product Goals
- Simplify doctor appointment booking
- Prevent overlapping appointments
- Provide easy access to medical records for patients and doctors

### Functional Requirements

#### Authentication
- Patients and doctors can register
- Users can log in using email and password

#### Appointment Management
- Patients can view a list of available doctors
- Patients can book appointments by selecting date and time

#### Medical Records
- Doctors can add and update patient medical data
- Patients can view their medical history

#### Payments
- Appointment payment confirmation

### Non-Functional Requirements
- **Security:** JWT-based authentication
- **Reliability:** Appointment data consistency
- **Scalability:** Modular backend architecture
- **Maintainability:** Clear code structure

### MVP Scope
**Included:**
- Appointment booking
- User authentication
- Medical record management

**Not Included:**
- Notifications
- Reviews and ratings
- Admin panel

---

## Architecture

### Architectural Style
Client–server architecture with separation between frontend, backend, and database layers.

### High-Level Components
- **Client (Angular):** User interface and input validation
- **Server (Node.js):** Business logic, authentication, REST API
- **Database (MongoDB):** Users, appointments, medical records

### Logical Architecture (Textual)
```
[Angular Client] -> REST API (HTTPS) -> [Node.js Backend] -> MongoDB
```

### Data Flow
1. User performs an action in the frontend
2. Angular sends a REST request
3. Backend validates JWT and business rules
4. Data is stored/retrieved from MongoDB
5. JSON response is returned to the client

### Deployment
Frontend and backend can be deployed separately. Backend is stateless and supports horizontal scaling.

### Future Extensions
- Notification microservice
- Admin management service

---

## API Specification

### API Design Principles
- RESTful architecture
- JSON request/response format
- Stateless authentication using JWT

### Main API Endpoints

#### Users
`/api/users` — user registration and profile management

#### Doctors
`/api/doctors` — doctor profiles and authentication

#### Appointments
`/api/appointments` — appointment booking and retrieval

#### Medical Records
`/api/medical-card` — manage patient medical records

#### Feedback
`/api/feedback` — user feedback

### Error Handling
- `400` — Bad request
- `401` — Unauthorized
- `500` — Internal server error

---

## Testing

### Testing Strategy
Manual testing focused on functional correctness and API reliability.

### Tools Used
- Postman — API testing
- Browser Developer Tools — UI and console debugging

### Test Scenarios

**Authentication**
- User registration
- Login with valid and invalid credentials

**Appointment Booking**
- Book appointment with valid date/time
- Prevent double booking for the same time slot

### Test Data Management
Separate test accounts were used. Test data was cleared after each test cycle.

### Limitations
- No automated tests at MVP stage
- No load or performance testing

### Future Improvements
- Unit tests with Jest
- API integration tests

---

## Environment Variables
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```
