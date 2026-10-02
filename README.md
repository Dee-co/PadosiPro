PadosiPro
PadosiPro is a mobile-first local services application where users can
register with email verification, complete their profile, select the
services they provide, and manage their account.

Features
Authentication
Email and password registration

6-digit email OTP verification

OTP expires after 10 minutes

Maximum 5 incorrect OTP attempts

OTP resend cooldown

OTP stored as a bcrypt hash instead of plain text

Login available only after email verification

Access token + refresh token authentication

Persistent login session

Logout support

User Profile
Name

Indian mobile number validation

Address

Optional business name

Profile completion flow after first verification/login

Edit profile after onboarding

Services
24 predefined services

4 service categories

Search services

Category-based grouping

Multi-select services

Save selected services

View selected services from Home

Mobile App
React Native CLI

Android support

Light and dark theme

Theme preference persisted locally

NativeWind styling

Eina01 custom typography

Safe-area handling

Loading, empty and error states

Pull-to-refresh on Home

Toast notifications

Project Structure
PADOSI/
├── backend/
│   ├── prisma/
│   ├── src/
│   ├── .env
│   └── package.json
├── frontend/
│   ├── android/
│   ├── ios/
│   ├── src/
│   ├── App.jsx
│   ├── global.css
│   └── package.json
├── README.md
└── DESIGN.md
Tech Stack
Frontend
React Native CLI

React

React Navigation

NativeWind

Tailwind CSS

React Hook Form

Zod

Axios

AsyncStorage

Lucide React Native

React Native Safe Area Context

React Native Keyboard Controller

Eina01 fonts

Backend
Node.js

Express.js

Prisma ORM

PostgreSQL

JWT

bcrypt

Nodemailer

CORS

dotenv

Development
Docker / Docker Compose

PostgreSQL

Mailpit for local OTP email testing

Prerequisites
Install:

Node.js 24+

npm

Docker Desktop

Android Studio

Android SDK

React Native CLI development environment

Android emulator or physical Android device

Backend Setup
cd backend
npm install
Create backend/.env:

DATABASE_URL=postgresql://padosipro:padosipro_password@localhost:5432/padosipro?schema=public
PORT=5001
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_FROM=PadosiPro <no-reply@padosipro.local>
Do not commit .env to source control.

Start PostgreSQL and Mailpit
docker compose up -d
Database Setup
npx prisma migrate dev
npx prisma generate
npx prisma db seed
Start Backend
npm run dev
Backend:

http://localhost:5001
Mailpit
Mailpit provides a local inbox for OTP emails.

http://localhost:8025
No real email account is required for local development.

Frontend Setup
cd frontend
npm install
Start Metro:

npm start
For a clean cache:

npm start -- --reset-cache
Run Android:

npm run android
or:

npx react-native run-android
API Overview
Base URL:

http://localhost:5001/api
Authentication
POST /auth/register
POST /auth/verify-otp
POST /auth/resend-otp
POST /auth/login
POST /auth/refresh
POST /auth/logout
Register example:

{
  "email": "user@example.com",
  "password": "Password@123",
  "confirmPassword": "Password@123"
}
Verify OTP:

{
  "email": "user@example.com",
  "otp": "123456"
}
Login:

{
  "email": "user@example.com",
  "password": "Password@123"
}
Profile
Authenticated requests use:

Authorization: Bearer <access-token>
Endpoints:

GET /profile
PATCH /profile
Example:

{
  "name": "John Doe",
  "mobile": "9876543210",
  "address": "Chennai, Tamil Nadu",
  "businessName": "John Services"
}
Services
GET /tasks?limit=50
GET /tasks/selected
POST /tasks/select
Example selection payload:

{
  "taskIds": [1, 3, 7, 12]
}
User Flow
Launch App
    ↓
Register
    ↓
Email OTP
    ↓
Verify Email
    ↓
Complete Profile
    ↓
Select Services
    ↓
Home
Returning verified users:

Launch App
    ↓
Login
    ↓
Home
If profile completion is pending:

Login
    ↓
Profile Onboarding
    ↓
Service Selection
    ↓
Home
Security
Passwords are hashed using bcrypt.

OTPs are hashed before database storage.

OTPs have a limited validity period.

OTP verification attempts are limited.

OTP resend requests have a cooldown.

Email verification is required before normal login.

JWT access and refresh tokens are used for authenticated sessions.

Protected endpoints require authentication.

Environment variables are used for server/database configuration.

Server-side validation is applied to API inputs.

Theme
The application supports light and dark themes.

The selected theme is persisted with AsyncStorage and restored when the
application starts.

NativeWind theme variables are used so existing utility classes such as
bg-surface, bg-background, and border-border can respond to the
selected theme.

Database
PostgreSQL is used as the application database.

Main entities:

User
RefreshToken
EmailOtp
Task
UserTask
UserTask represents the relationship between users and their selected
services.

Local Development
Recommended startup order:

1. Infrastructure
docker compose up -d
2. Backend
cd backend
npm install
npm run dev
3. Frontend
cd frontend
npm install
npm start
4. Android
npx react-native run-android
Troubleshooting
PostgreSQL connection
Check Docker:

docker ps
Verify DATABASE_URL in backend/.env.

OTP email
Open:

http://localhost:8025
Verify:

SMTP_HOST=localhost
SMTP_PORT=1025
Metro cache
npm start -- --reset-cache
Android build
cd android
./gradlew clean
cd ..
npx react-native run-android
Physical Android device
For a physical device, localhost points to the device itself. Use the
development machine's local network IP for the API when required.

Environment Notes
Backend development port: 5001

Mailpit SMTP port: 1025

Mailpit web UI: 8025

API base path: /api

Project Documentation
Additional architecture and design decisions are documented in:

DESIGN.md
Author
PadosiPro --- React Native + Node.js full-stack application.

