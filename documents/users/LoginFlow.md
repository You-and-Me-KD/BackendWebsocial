# Login Flow Documentation

## Overview
The login flow enables users to access their accounts securely using either a traditional username/password combination or Google authentication. The flow ensures user authentication, session management, and security best practices.

## Authentication Methods
1. **Username & Password Login**
2. **Google Login (OAuth 2.0)**

---

## Requirements
### 1. **Username & Password Login**
- Users must provide a valid **username or email** and **password**.
- The system validates the credentials against the stored user records.
- If authentication is successful, a session token or JWT is issued.
- If authentication fails, an appropriate error message is displayed.
- Option for "Remember Me" should persist session data securely.
- A "Forgot Password?" option should be available for password recovery.

#### **Validation Rules**
- **Username:**
  - Must be alphanumeric (letters and numbers only, no special characters).
  - Length: **3 to 20 characters**.
  - Case-insensitive.
- **Email:**
  - Must follow a valid email format (e.g., `user@example.com`).
  - Case-insensitive.
  - Must not contain spaces or special characters outside of standard email symbols.
- **Password:**
  - Minimum **8 characters**.
  - Must include at least **one uppercase letter**, **one lowercase letter**, **one number**, and **one special character** (`!@#$%^&*`).
  - Must not be a commonly used password.
  - Must not contain the username or email.

#### API Endpoints:
- **POST** `/api/auth/login`
  - **Request Body:**
    ```json
    {
      "username": "user@example.com",
      "password": "Secure@123",
    }
    ```
  - **Response:**
    ```json
    {
      "meta": {
        "code": 200,
        "message": "Successful",
        "pagination": null,
        "path": "/api/auth/login"
      },
      "summary": "User authenticated successfully",
      "data": {
        "token": "jwt_token_here",
        "expiresIn": 3600
      }
    }
    ```

### 2. **Google Login (OAuth 2.0)**
- Users can authenticate via their Google account.
- The system uses Google's OAuth 2.0 authentication flow.
- Upon successful authentication, the system retrieves the user's profile and verifies their email.
- If the email exists in the system, the user is logged in.
- If the email does not exist, the system prompts the user to complete the registration process.

#### API Endpoints:
- **GET** `/api/auth/google` (Redirects to Google login page)
- **POST** `/api/auth/google/callback`
  - **Request Body:**
    ```json
    {
      "googleToken": "google_oauth_token"
    }
    ```
  - **Response:**
    ```json
    {
      "meta": {
        "code": 200,
        "message": "Successful",
        "pagination": null,
        "path": "/api/auth/google/callback"
      },
      "summary": "Google authentication successful",
      "data": {
        "token": "jwt_token_here",
        "expiresIn": 3600
      }
    }
    ```

---

## Security Considerations
- Passwords must be stored using **bcrypt hashing**.
- Implement **rate limiting** to prevent brute-force attacks.
- Use **JWT or session-based authentication** for user sessions.
- Implement **multi-factor authentication (MFA)** for additional security.
- Enforce **OAuth scopes and permissions** when using Google login.
- Ensure all login attempts are **logged and monitored** for suspicious activity.

---

## UI/UX Considerations
- The login form should include:
  - Fields for **username/email** and **password**.
  - A **Remember Me** checkbox.
  - A **Forgot Password?** link.
  - A **Login with Google** button.
- Error messages should be user-friendly and avoid exposing system vulnerabilities.
- Successful login should redirect users to the dashboard or their intended page.

---

## Edge Cases & Handling
- **Incorrect credentials** → Display an error message.
- **Invalid email format** → Prompt user to enter a valid email.
- **Weak password** → Inform the user and suggest a stronger password.
- **Account locked** → Notify the user and provide recovery options.
- **Google login failure** → Show relevant error messages and retry option.
- **Session expiry** → Prompt the user to log in again.
- **Network issues** → Show a fallback error message.

---

## Conclusion
This login flow ensures a seamless and secure authentication process for users while maintaining security best practices. The integration of Google login enhances user convenience and reduces password-related security risks.

