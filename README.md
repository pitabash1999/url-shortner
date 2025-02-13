# **URL Shortener**

A web application designed to convert long, complex URLs into shorter, more manageable links. Built with **React.js** for the frontend, **Spring Boot** for the backend, **PostgreSQL** as the database, and **Tailwind CSS** for styling, this project allows users to shorten URLs, store them securely, and track click analytics. It also incorporates **Spring Security** for robust user authentication and authorization.

---

## **Features**

- **URL Shortening**: Convert long URLs into short, shareable links.
- **Secure Storage**: Store shortened URLs securely in the database.
- **User Authentication**: Secure user accounts with **Spring Security** (login and registration).
- **Responsive Design**: Works seamlessly on all devices (desktop, tablet, mobile).
- **Copy to Clipboard**: Easily copy shortened URLs with a single click.

---

## **Tech Stack**

### **Frontend**
- **React.js**: For building a dynamic and responsive user interface.
- **Tailwind CSS**: For modern, clean, and responsive styling.
- **Axios**: For making API calls to the backend.

### **Backend**
- **Spring Boot**: For handling backend logic, API endpoints, and business logic.
- **Spring Security**: For secure user authentication and authorization.
- **JWT (JSON Web Tokens)**: For secure user sessions and token-based authentication.

### **Database**
- **PostgreSQL**: For storing user data, original URLs, shortened URLs, and click analytics.

### **Other Tools**
- **REST APIs**: For communication between the frontend and backend.
- **Postman**: For testing API endpoints during development.

---

## **How It Works**

1. **User Registration/Login**:
   - Users can register and log in securely using **Spring Security**.
   - JWT tokens are used to manage user sessions.

2. **URL Shortening**:
   - Users input a long URL, and the system generates a unique shortened link.
   - Optionally, users can create custom aliases for personalized short URLs.

3. **Storage**:
   - Original and shortened URLs are securely stored in the **PostgreSQL** database.
   - Each URL is associated with the user who created it.

4. **Secure Access**:
   - **Spring Security** ensures that only authenticated users can shorten URLs and access their data.

---


**Access the Application**:
   - Open your browser and navigate to `https://short-url-pro.netlify.app`.

---

## **API Endpoints**

### **Authentication**
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in and receive a JWT token.

### **URL Shortening**
- `POST /api/url/shorten`: Shorten a long URL.
- `GET /api/url/{shortUrl}`: Redirect to the original URL.

### **User Management**
- `GET /api/url/getUrls`: Get all URLs created by the logged-in user.

---


---

## **Acknowledgements**

- Built with ❤️ using **React.js**, **Spring Boot**, **PostgreSQL**, and **Tailwind CSS**.
- Special thanks to the open-source community for providing amazing tools and libraries.

---

## **Contact**

For any questions or feedback, feel free to reach out:
- **Email**: pitabashk196@gmail.com

---

Enjoy shortening your URLs! 🚀
