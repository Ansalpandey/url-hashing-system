## URL Hashing and Click Tracking System

This project implements a URL hashing system designed for NewsBytes' marketing department. It offers several benefits:

* **Shortened URLs:** Generates unique, concise URLs using a hashing mechanism.
* **Click Tracking:** Logs clicks for each shortened URL to measure campaign effectiveness.
* **Usage Limits:** Supports creating single-use or limited-use URLs for controlled distribution.
* **UTM Tag Preservation:** Maintains UTM parameters and other query strings for accurate tracking.
* **Error Handling:** Gracefully manages invalid URLs, missing records, and usage limit violations.
* **Privacy-aware Design:** Stores minimal data to respect user privacy.

## Features

* Generates shortened URLs using a unique hashing mechanism.
* Tracks clicks for each shortened URL.
* Allows setting single-use or limited-use URLs.
* Preserves all query parameters, including UTM tags.
* Implements robust error handling for various scenarios.
* Stores minimal information to prioritize user privacy.

## Architecture

The system consists of two main components:

* **Client:** User submits a long URL and a usage limit (if desired) through an API call.
* **Server:**
    * Generates a unique key (hash) using `nanoid`.
    * Stores the original URL, hash, and usage limit in a MongoDB database.
    * When a hashed URL is accessed, redirects to the original URL and increments the click count.
    * Enforces usage limits by blocking further access upon exceeding the limit.


**System Diagram:**

```
Client -> POST /generate -> Server -> MongoDB (Stores URLs)
Client -> GET /:hashedKey -> Server -> MongoDB -> Redirect to original URL
```

## Tech Stack

* Backend: Node.js, Express
* Database: MongoDB
* Hashing Library: nanoid
* Environment Management: dotenv
* Deployment: Flexible deployment options (Heroku, Vercel, AWS EC2)

## Installation and Setup

**Prerequisites:**

* Node.js installed
* Running MongoDB instance (local or cloud)
* Git installed

**Steps:**

1. Clone the repository:

```bash
git clone https://github.com/your-repo/url-hashing-system.git
cd url-hashing-system
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

   Create a file named `.env` in the project root directory and add the following content, replacing placeholders with your actual values:

   ```
   BASE_URL=http://localhost:3000
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/urlhashing
   ```

4. Run the server:

```bash
npm start
```

The server will be accessible at http://localhost:3000.

## API Endpoints

### 1. Generate a Hashed URL

**Endpoint:** POST /generate

**Request Body (JSON):**

```json
{
  "originalUrl": "https://github.com",
  "usageLimit": 5 (optional)
}
```

**Response (JSON):**

```json
{
  "hashedUrl": "http://localhost:3000/abc12345"
}
```

### 2. Redirect to Original URL

**Endpoint:** GET /:hashedKey

**Description:** Redirects to the original URL if the usage limit has not been reached.

**Response:**

* Redirection to the original URL.
* JSON response with message ("Usage limit reached") if the limit is exceeded.

## Usage

### Generating a Short URL

* Use tools like Postman or curl to send a POST request to `/generate`.
* Include the original URL and optional usage limit in the request body.

### Accessing the Short URL

* Open the generated hashed URL in a browser (e.g., http://localhost:3000/abc12345).
* If the usage limit is not exceeded, you will be redirected to the original URL.

## Error Handling

* **500 Internal Server Error:** Occurs for unexpected server-side issues.
* **404 Not Found:** Indicates the requested hashed URL doesn't exist in the database.
* **403 Forbidden:** Signals that the usage limit for the hashed URL has been reached.

## Environment Variables

The project utilizes the following environment variables:

* **BASE_URL:** The base URL of your deployed server (e.g., http://localhost:3000).
* **PORT:** The port on which the server runs (default: 3000).
* **MONGODB_URI:** The connection string for your MongoDB instance (local or MongoDB Atlas)