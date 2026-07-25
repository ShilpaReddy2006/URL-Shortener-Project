# 🔗 Secure URL Shortener - Full Stack Application


A full-stack URL shortening application that converts long URLs into short, shareable links while providing secure authentication and URL management features.

The application allows users to register, authenticate securely using JWT, generate unique short URLs, manage URL mappings, track URL visits, and redirect users to original URLs through REST APIs.

This project demonstrates secure backend development, REST API design, database integration, authentication, Docker containerization, cloud deployment, and full-stack application development.


---

# 📌 Project Overview

The Secure URL Shortener is a web-based application that helps users transform lengthy URLs into compact and easy-to-share links.

Instead of sharing long URLs, users can generate short URLs that redirect to the original destination.

The application provides:

- Secure user authentication
- JWT-based API security
- URL shortening functionality
- Unique short code generation
- URL redirection
- Click count tracking
- Persistent storage using MySQL
- React and Spring Boot integration


---

# 🎯 Problem Statement

Long URLs are difficult to share, remember, and manage.

They create problems in:

- Social media platforms with character limitations
- Messaging applications
- Email communication
- Managing frequently used links


A system is required that can generate shorter URLs while maintaining a secure mapping between shortened URLs and their original destinations.

---

# 💡 Solution

The Secure URL Shortener solves this problem by generating unique short codes for long URLs.

The generated short URL is stored along with the original URL in the database.

When a user accesses the shortened URL:

```
Short URL
     |
     |
Extract Short Code
     |
     |
Search Database
     |
     |
Retrieve Original URL
     |
     |
Redirect User
```


JWT authentication ensures secure access to protected backend operations.


---

# ✨ Features


## 🔐 Authentication

- User registration
- Secure login
- JWT-based authentication
- Password encryption using BCrypt
- Protected REST APIs
- Secure API communication


## 🔗 URL Management

- Convert long URLs into short URLs
- Generate unique short codes
- Redirect short URLs
- Store URL mappings
- Track URL click count
- Retrieve shortened URLs
- Delete URL mappings


## ⚙️ Backend Features

- RESTful API architecture
- Layered architecture
- Controller-Service-Repository pattern
- Exception handling
- Database persistence using JPA
- Hibernate ORM
- Maven build management


## 🎨 Frontend Features

- Responsive React interface
- User authentication pages
- URL shortening interface
- API integration using Axios
- Dynamic UI updates


---

# 🛠️ Technology Stack


## Backend

- Java 21
- Spring Boot
- Spring MVC
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate ORM
- Maven


## Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Axios


## Database

- MySQL


## DevOps & Tools

- Docker
- Render
- Aiven MySQL
- Git
- GitHub
- Postman
- Eclipse IDE
- MySQL Workbench


---

# 🏗️ System Architecture


```
                         User
                           |
                           |
                   React Frontend
                           |
                           |
                    REST API Request
                           |
                           |
             Spring Security Filter Chain
                           |
                           |
             JWT Authentication Filter
                           |
                           |
                    Controllers
          (AuthController / UrlController)
                           |
                           |
                    Service Layer
              (Business Logic Processing)
                           |
                           |
                 Repository Layer
              (Spring Data JPA)
                           |
                           |
                  MySQL Database
```


---

# 🔄 Application Workflow


## User Registration Flow

```
User enters registration details
              |
              |
Frontend sends request
              |
              |
Spring Boot validates data
              |
              |
Password encrypted using BCrypt
              |
              |
User saved into database
```


---

## User Login Flow

```
User Login Request
          |
          |
Validate Credentials
          |
          |
Generate JWT Token
          |
          |
Return Token
          |
          |
Client sends token with requests
```


---

## URL Shortening Flow

```
User enters long URL
          |
          |
Backend generates unique short code
          |
          |
Store URL mapping in database
          |
          |
Return shortened URL
```


---

## URL Redirect Flow

```
User opens short URL
          |
          |
Extract short code
          |
          |
Find URL in database
          |
          |
Increase Click Count
          |
          |
Redirect to Original URL
```


---

# 📂 Project Structure


```
url-shortener
│
├── frontend
│   │
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
│
├── backend
│   │
│   ├── src
│   │   └── main
│   │       │
│   │       ├── java
│   │       │   └── com.shilpa.url_shortener
│   │       │       │
│   │       │       ├── config
│   │       │       ├── controller
│   │       │       ├── dtos
│   │       │       ├── entity
│   │       │       ├── exception
│   │       │       ├── repository
│   │       │       ├── service
│   │       │       └── UrlShortenerApplication.java
│   │       │
│   │       └── resources
│   │           ├── application.properties
│   │           └── static
│   │
│   ├── Dockerfile
│   └── pom.xml
│
│
└── README.md
```


---

# 📁 Folder Description


## Frontend

| Folder/File | Purpose |
|---|---|
| components | Reusable React components |
| pages | Application pages |
| services | Axios API communication |
| App.jsx | Main React component |
| main.jsx | React entry point |


## Backend

| Folder/File | Purpose |
|---|---|
| config | Security and JWT configuration |
| controller | Handles REST API requests |
| dtos | Request and response objects |
| entity | JPA database entities |
| exception | Custom exception handling |
| repository | Database communication layer |
| service | Business logic implementation |
| resources | Application configuration |
| Dockerfile | Container configuration |
| pom.xml | Maven dependencies |


---

# 🗄️ Database Design


The application uses **MySQL** as the relational database.

Hibernate and Spring Data JPA are used for object-relational mapping between Java entities and database tables.


Database tables:

1. Users Table
2. URL Mapping Table


---

# 👤 Users Table (`users`)


Stores registered user information.


| Column | Data Type | Constraints | Description |
|---|---|---|---|
| id | BIGINT | Primary Key, Auto Increment | Unique user identifier |
| username | VARCHAR(255) | NOT NULL | Username |
| password | VARCHAR(255) | NOT NULL | BCrypt encrypted password |


---

# 🔗 URL Mapping Table (`url_mapping`)


Stores original URLs and generated short codes.


| Column | Data Type | Constraints | Description |
|---|---|---|---|
| id | BIGINT | Primary Key | URL identifier |
| original_url | TEXT | NOT NULL | Original long URL |
| short_code | VARCHAR(255) | UNIQUE | Generated short code |
| click_count | BIGINT | Default 0 | Number of visits |


---

# 🔌 API Documentation


## Authentication APIs


| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login user and generate JWT token |


---

## URL APIs


| Method | Endpoint | Description |
|---|---|---|
| POST | `/url/shorten` | Generate short URL |
| GET | `/{shortCode}` | Redirect to original URL |
| GET | `/url/all` | Retrieve all URLs |
| DELETE | `/url/{id}` | Delete URL |


---

# 🔒 Security Implementation


The application uses Spring Security with JWT authentication.


Security Flow:

```
Login Request
        |
        |
Validate Username & Password
        |
        |
Generate JWT Token
        |
        |
Client Stores Token
        |
        |
Send Token in Authorization Header
        |
        |
JWT Filter Validates Token
        |
        |
Allow Protected Request
```


Security Features:

- JWT authentication
- BCrypt password hashing
- Stateless session management
- Protected REST endpoints
- CORS configuration


---

# ⚙️ Installation & Setup


## Clone Repository


```bash
git clone <repository-url>
```


---

# Backend Setup


Navigate:

```bash
cd backend
```


Install dependencies:

```bash
mvn clean install
```


Configure database in:

```
src/main/resources/application.properties
```


Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/url_shortener

spring.datasource.username=root

spring.datasource.password=password

spring.jpa.hibernate.ddl-auto=update
```


Run backend:

```bash
mvn spring-boot:run
```


Backend:

```
http://localhost:8080
```


---

# Frontend Setup


Navigate:

```bash
cd frontend
```


Install dependencies:

```bash
npm install
```


Run application:

```bash
npm run dev
```


Frontend:

```
http://localhost:5173
```


---

# 🐳 Docker Support


The Spring Boot backend is containerized using Docker.


Navigate:

```bash
cd backend
```


Build Docker image:

```bash
docker build -t url-shortener .
```


Run container:

```bash
docker run -p 8080:8080 url-shortener
```


---

# 🚀 Deployment


Deployment architecture:


```
Spring Boot Backend
          |
          |
     Docker Image
          |
          |
       Render
          |
          |
    Aiven MySQL Database
```


Deployment:

- Backend deployed using Render
- Database hosted using Aiven MySQL
- Docker used for application containerization


---

# 📸 Screenshots


Add screenshots:

1. Registration Page
2. Login Page
3. JWT Token Response
4. URL Shortening API
5. URL Redirect
6. MySQL Database
7. Docker Build
8. Docker Container Running
9. Application Deployment


---

# 🚧 Challenges Faced


## JWT Authentication Implementation

Implemented Spring Security with JWT token generation and validation to secure REST APIs.


## Unique Short Code Generation

Designed logic to generate unique short identifiers for URLs.


## React and Spring Boot Integration

Configured API communication between frontend and backend using Axios and CORS.


## Docker Deployment

Containerized Spring Boot application and configured deployment environment.


## Database Connectivity

Configured MySQL connection and solved database connectivity issues during deployment.


---

# 📚 Lessons Learned


This project improved my understanding of:

- Spring Boot application development
- Spring Security
- JWT authentication
- REST API design
- Spring Data JPA
- Hibernate ORM
- MySQL database management
- Docker containerization
- Maven build lifecycle
- React API integration
- Cloud deployment


---

# 🚀 Future Enhancements


- User-specific URL history
- Custom short URLs
- URL expiration
- QR code generation
- Analytics dashboard
- Rate limiting
- Redis caching
- Swagger/OpenAPI documentation
- Role-based authorization
- Docker Compose
- AWS deployment
- CI/CD pipeline using GitHub Actions


---

# 👩‍💻 Author


**Yerravalla Shilpa Reddy**

Java Full Stack Developer


Skills:

- Java
- Spring Boot
- Spring Security
- React.js
- MySQL
- REST APIs
- Docker

## 🌐 Links

🔗 **GitHub Repository:**  
https://github.com/ShilpaReddy2006/URL-Shortener-Project

🚀 **Live Demo:**  
https://url-shortener-project-1-7men.onrender.com

---



⭐ If you like this project, consider giving it a star.
