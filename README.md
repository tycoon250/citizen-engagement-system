# Citizen Engagement System

A modern web-based platform that empowers citizens to submit complaints and feedback on public services, and enables government agencies to track, respond, and resolve them efficiently.

## What It Does

- Citizens submit complaints (e.g., electricity, healthcare, infrastructure)
- System routes them to the appropriate agency
- Agencies manage, respond to, and update complaint statuses
- Admins can monitor and analyze system-wide performance
- Role-based dashboards for Citizens, Agencies, and Admins

## Project Structure

### Backend (Node.js + MySQL)
server/
├── config/              # DB and server configs
├── controllers/         # All business logic
│   └── complaintsController.js
│   └── complaintStatsController.js
├── routes/              # API route definitions
│   └── complaints.js
│   └── stats.js
├── middleware/          # (Optional) auth/validation
├── models/              # (Optional) SQL abstraction
└── server.js            # App entry point

### Frontend (React + TailwindCSS + Vite)
client/
├── src/
│   ├── components/      # Navbar, Sidebar, Layout, etc.
│   ├── pages/           # Auth & Dashboards
│   │   └── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   │   └── dashboards/
│   │       ├── CitizenDashboard.jsx
│   │       ├── AgencyDashboard.jsx
│   │       ├── SubmitComplaint.jsx
│   │       ├── MyComplaints.jsx
│   │       └── RespondToComplaint.jsx
│   ├── services/        # Axios API calls
│   ├── utils/           # Role redirects
│   └── App.jsx          # Main router

## Technologies Used

- Frontend: React.js, TailwindCSS, React Router, Axios
- Backend: Node.js, Express.js, MySQL
- Database: MySQL with complaints, users, agencies, responses
- Auth: JWT (planned), role-based localStorage logic for now

## Installation

### Backend

```
cd server
npm install
cp .env.example .env
# Configure your DB credentials in .env
npm run dev
```

### Frontend

```
cd client
npm install
cp .env.example .env
# Set VITE_API_URL=http://localhost:5000/api
npm run dev
```

## Sample API Endpoints

- POST /api/auth/login
- POST /api/complaints
- GET /api/complaints/user/:id
- GET /api/complaints/agency/:id
- GET /api/stats/citizen/:id
- GET /api/stats/agency/:id

## User Roles

- Citizen: Submit and track complaints
- Agency: View assigned complaints, respond, and resolve
- Admin (planned): View all data, manage users/agencies

## Status

- [x] MVP functional
- [x] Role-based routing complete
- [x] Complaint submission and tracking
- [x] Agency response and status update

## License

This project is licensed under the MIT License.