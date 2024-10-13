import express from 'express'; // Import the express module for creating the server
import { generateUrl, redirectToOriginal } from '../controllers/url.controller.js'; // Import the controller functions for URL generation and redirection

const router = express.Router(); // Created an instance of the router

// Route to generate a hashed URL
router.post('/generate', generateUrl); // I have defined a POST route at '/generate' that calls the generateUrl function from the controller

// Route to redirect to the original URL
router.get('/:hashedKey', redirectToOriginal); // I have defined a GET route with a dynamic parameter ':hashedKey' that calls the redirectToOriginal function from the controller

export default router; // I exported the router instance for use in other parts of the application
