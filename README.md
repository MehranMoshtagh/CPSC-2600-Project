# Event Management Application

---

## Overview

Event Management Application is a full-stack single-page web application that allows users to browse, create, and manage events as well as submit RSVPs. The project demonstrates full-stack development using **React** for the frontend, **Node.js** with **Express** for the backend, and **MongoDB Atlas** for the database. The application emphasizes modular design, robust validation, and a user-friendly interface.

Live Website: [https://project-mehran-moshtagh.onrender.com](https://cpsc-2600-project.onrender.com/)

---

## Features

- **Event Browsing:**  
  View a list of upcoming events with details such as date, location, description, and organizer.

- **Event Details:**  
  Click on an event to see full details and all submitted RSVPs. RSVP statuses are color-coded for quick identification.

- **Event Creation:**  
  Create new events with robust validation to prevent invalid data (e.g., names must contain letters, dates cannot be in the past, locations must be proper names, etc.).

- **RSVP Submission:**  
  Users can submit RSVPs for events. The RSVP form validates that the user’s name is valid (i.e., contains at least one letter and only allows letters, spaces, apostrophes, or hyphens) and prevents duplicate RSVPs.

- **Responsive & Consistent UI:**  
  Clean, modern styling is applied consistently across pages with clear navigation links (e.g., "Back to Home").

- **Robust Data Validation:**  
  Two layers of validation are implemented:  
  1. **Middleware-level validation:** Checks incoming request data before reaching controllers.  
  2. **MongoDB JSON Schema validation:** Acts as a second layer of defense.

- **RESTful API:**  
  The backend follows REST conventions using JSON responses, proper HTTP status codes, and URL versioning.

---

## Technologies Used

- **Frontend:** React, React Router DOM, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas (using the official MongoDB Node.js Driver)
- **Validation:** Custom middleware and MongoDB JSON Schema validation
- **Deployment:** Instructions provided for local development (Docker instructions can be added as needed)

---

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm
- Git
- A MongoDB Atlas account (or a local MongoDB instance)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/MehranMoshtagh/CPSC-2600-Project.git
   cd event-management-app
   ```

2. **Setup the Server:**

   Navigate to the server directory and install dependencies:

   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in the server folder with the following (replace placeholders with your credentials):

   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.your-cluster.mongodb.net/yourDatabase?retryWrites=true&w=majority
   ```

3. **Setup the Client:**

   Navigate to the client directory and install dependencies:

   ```bash
   cd ../client
   npm install
   ```

   Optionally, create a `.env` file in the client directory to set the API base URL:

   ```env
   REACT_APP_API_BASE=http://localhost:5000/api/v1
   ```

### Running Locally

1. **Start the Server:**

   In the server directory, run:

   ```bash
   npm run dev
   ```

   *(or `npm start` for production mode)*

2. **Start the Client:**

   In a separate terminal window, navigate to the client directory and run:

   ```bash
   npm start
   ```

   Your React app will open at `http://localhost:3000` and communicate with your server on port `5000`.

---

## API Documentation

All API endpoints respond in JSON format. The base URL for the API is:

```
http://localhost:5000/api/v1
```

### Endpoints

#### **Events**

- **GET /events**  
  Retrieve a list of events.

  **Query Parameters:**
  - `date` (optional): Filter events by a specific date.
  - `location` (optional): Filter events by location.
  - `name` (optional): Filter events by keyword in the event name.

  **Response:**
  - `200 OK`: Array of event objects.
  - `400 Bad Request`: If query parameters are invalid.

  **Example:**
  ```http
  GET http://localhost:5000/api/v1/events?location=Vancouver
  ```

- **GET /events/:id**  
  Retrieve detailed information about a single event.

  **Response:**
  - `200 OK`: Event object.
  - `404 Not Found`: If the event does not exist.

  **Example:**
  ```http
  GET http://localhost:5000/api/v1/events/60a7c0b6e6d1234567890abc
  ```

- **POST /events**  
  Create a new event.

  **Request Body:**
  ```json
  {
    "name": "Sample Event",
    "description": "This is a sample event.",
    "date": "2025-04-08",
    "location": "Vancouver",
    "organizer": "Amir"
  }
  ```

  **Validation Rules:**
  - **Name:** Required; must contain at least one letter and only include letters, spaces, apostrophes, or hyphens.
  - **Date:** Required; must be a valid date and cannot be in the past.
  - **Location:** Required; must contain at least one letter and only include letters, spaces, apostrophes, or hyphens.

  **Response:**
  - `201 Created`: Returns the created event.
  - `400 Bad Request`: If validation fails.

#### **RSVPs**

- **POST /events/:id/rsvp**  
  Submit an RSVP for a specific event.

  **Request Body:**
  ```json
  {
    "userName": "John Doe",
    "rsvpStatus": "attending"
  }
  ```

  **Validation Rules:**
  - **userName:** Must be a non-empty string that contains at least one letter and may only include letters, spaces, apostrophes, or hyphens.
  - **rsvpStatus:** Required; allowed values include `"attending"`, `"not attending"`, and `"maybe"`.
  - Duplicate RSVPs (same user for the same event) are not permitted.

  **Response:**
  - `201 Created`: Returns the created RSVP record.
  - `400 Bad Request`: If validation fails.

- **GET /events/:id/rsvps**  
  Retrieve all RSVPs for a specific event.

  **Response:**
  - `200 OK`: Array of RSVP objects.
  - `404 Not Found`: If the event does not exist.

  ## APIs

  #### A. Events Endpoints

1. **GET /api/v1/events**  
   - **Purpose:** Retrieve a list of events with optional filtering.
   - **Query Parameters:**
     - `date` (optional): Filter events by a specific date.
     - `location` (optional): Filter events by location.
     - `name` (optional): Filter events by keyword in the event name.
   - **Response:**
     - `200 OK`: JSON array of event objects matching the filter criteria.
     - `400 Bad Request`: If query parameters are invalid.

2. **GET /api/v1/events/:id**  
   - **Purpose:** Retrieve detailed information about a single event.
   - **Parameters:**
     - `:id` (required): Unique identifier of the event.
   - **Response:**
     - `200 OK`: JSON object with event details.
     - `404 Not Found`: If the event does not exist.

3. **POST /api/v1/events**  
   - **Purpose:** Create a new event.
   - **Request Body:** JSON object containing required fields: `name`, `date`, `location`, and optionally `description` and `organizer`.
   - **Validation:**
     - Express middleware validates and sanitizes incoming data before it reaches the database.
     - MongoDB JSON Schema performs a second level of validation.
   - **Response:**
     - `201 Created`: The new event object.
     - `400 Bad Request`: If validation fails.

#### B. RSVP Endpoints

1. **POST /api/v1/events/:id/rsvp**  
   - **Purpose:** Record an RSVP for a specific event.
   - **Parameters:**
     - `:id` (required): Unique identifier of the event.
   - **Request Body:** JSON object with `userName` and `rsvpStatus`.
   - **Validation:**
     - Express middleware validates and sanitizes the input.
     - MongoDB JSON Schema validation is applied.
   - **Response:**
     - `201 Created`: The new RSVP record.
     - `400 Bad Request`: If validation fails or if the eventId is invalid.

2. **GET /api/v1/events/:id/rsvps**  
   - **Purpose:** Retrieve all RSVP records for a specific event.
   - **Parameters:**
     - `:id` (required): Unique identifier of the event.
   - **Response:**
     - `200 OK`: JSON array of RSVP objects.
     - `404 Not Found`: If the event does not exist.

---

## Additional Information

### Error Handling

Detailed error messages are provided if something goes wrong during event creation or RSVP submission. These errors are displayed on the client so that users understand exactly why an action failed.

### Code Structure

- **Server:** Organized with separate files for routing, controllers, middleware, and database models.
- **Client:** Built with React, using dedicated folders for components, pages, and services.

### Testing

- API endpoints have been manually tested using tools like Postman.
- Client interactions have been verified to handle errors gracefully.

### Deployment

Further instructions for deploying the application (e.g., containerization with Docker) can be added if needed.

---

## References

- [MongoDB Node.js Driver Documentation](https://www.mongodb.com/docs/drivers/node/)
- [Express Documentation](https://expressjs.com/)
- [React Documentation](https://reactjs.org/)
- [React Router Documentation](https://reactrouter.com/)
- [W3School](https://www.w3schools.com/react/default.asp)
- [Youtube - CORS](https://www.youtube.com/watch?v=PNtFSVU-YTI)
- [MDN Web Docs - CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)
