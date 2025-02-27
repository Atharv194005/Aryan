# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "1234567890"
}
```

### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
    "email": "john@example.com",
    "password": "password123"
}
```

## Courses

### Get All Courses
```http
GET /courses
```

### Get Single Course
```http
GET /courses/:id
```

### Create Course (Admin)
```http
POST /courses
Authorization: Bearer {token}
```

**Request Body:**
```json
{
    "name": "Web Development",
    "description": "Learn web development from scratch",
    "price": 499,
    "imageUrl": "https://example.com/image.jpg",
    "category": "Web Development",
    "duration": 8,
    "level": "Beginner"
}
```

## Enrollments

### Get User Enrollments
```http
GET /enrollments/my-enrollments
Authorization: Bearer {token}
```

### Create Enrollment
```http
POST /enrollments
Authorization: Bearer {token}
```

**Request Body:**
```json
{
    "courseId": "course_id_here"
}
```

### Update Progress
```http
PUT /enrollments/:id/progress
Authorization: Bearer {token}
```

**Request Body:**
```json
{
    "progress": 75
}
```

## Users

### Get Profile
```http
GET /users/profile
Authorization: Bearer {token}
```

### Update Profile
```http
PUT /users/profile
Authorization: Bearer {token}
```

**Request Body:**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890"
}
```

## Error Responses

### 400 Bad Request
```json
{
    "success": false,
    "message": "Invalid input data"
}
```

### 401 Unauthorized
```json
{
    "success": false,
    "message": "Please log in to access this resource"
}
```

### 403 Forbidden
```json
{
    "success": false,
    "message": "Not authorized to perform this action"
}
```

### 404 Not Found
```json
{
    "success": false,
    "message": "Resource not found"
}
```

### 500 Server Error
```json
{
    "success": false,
    "message": "Something went wrong!"
}
```
