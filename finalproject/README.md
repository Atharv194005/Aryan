# Course Management System

A professional course management platform built with Node.js, Express, MongoDB, and Material Design.

## Features

- 🔐 Secure Authentication System
- 👥 User & Admin Dashboards
- 📚 Course Management
- 📊 Analytics Dashboard
- 📱 Responsive Design
- 💳 Enrollment System
- 📈 Progress Tracking
- 📧 Contact System

## Tech Stack

- **Frontend:**
  - HTML5
  - CSS3 (Material Design)
  - JavaScript (ES6+)
  - Material Design Lite
  
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - JWT Authentication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd course-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file in the root directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/course-management
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=30d
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:5000 in your browser

## Project Structure

```
course-management-system/
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── models/
├── routes/
├── middlewares/
├── controllers/
├── utils/
├── tests/
└── docs/
```

## API Documentation

Detailed API documentation can be found in the `/docs` directory.

## Security Features

- JWT Authentication
- Password Hashing
- Input Validation
- XSS Protection
- CORS Configuration
- Rate Limiting
- Security Headers

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any queries or support, please contact us through our [contact page](contact.html).
