import { nanoid } from 'nanoid'; // Import the nanoid library for generating unique IDs
import { Url } from '../models/url.model.js'; // Import the Url model for database interactions
import dotenv from 'dotenv'; // Import dotenv for environment variable management

dotenv.config(); // Load environment variables from .env file
const BASE_URL = process.env.BASE_URL; // Retrieve the base URL from environment variables

/**
 * Generates a hashed URL for the given original URL.
 * 
 * @param {Object} req - The request object containing the original URL and usage limit.
 * @param {Object} res - The response object used to send back the hashed URL.
 */
const generateUrl = async (req, res) => {
  const { originalUrl, usageLimit } = req.body; // Extract original URL and usage limit from the request body

  try {
    const hashedKey = nanoid(8); // Generate a short unique key (8 characters)
    const hashedUrl = `${BASE_URL}/${hashedKey}`; // Construct the full hashed URL

    // Create a new URL document with the original URL, hashed URL, and usage limit
    const newUrl = new Url({ originalUrl, hashedUrl, usageLimit });
    await newUrl.save(); // Save the document to the database

    // Respond with the generated hashed URL
    res.status(201).json({ hashedUrl });
  } catch (error) {
    // Handle any errors that occur during URL generation
    res.status(500).json({ message: 'Error generating hashed URL', error });
  }
};

/**
 * Tracks clicks on the hashed URL and redirects to the original URL.
 * 
 * @param {Object} req - The request object containing the hashed key in the parameters.
 * @param {Object} res - The response object used to redirect to the original URL.
 */
const redirectToOriginal = async (req, res) => {
  const { hashedKey } = req.params; // Extract the hashed key from the request parameters

  try {
    // Find the URL document associated with the hashed key
    const urlDoc = await Url.findOne({ hashedUrl: `${BASE_URL}/${hashedKey}` });

    // Handle case where the URL document is not found
    if (!urlDoc) {
      return res.status(404).json({ message: 'URL not found' });
    }

    // Handle case where the usage limit has been reached
    if (urlDoc.clickCount >= urlDoc.usageLimit) {
      return res.status(403).json({ message: 'Usage limit reached' });
    }

    // Increment the click count and save the updated document
    urlDoc.clickCount += 1;
    await urlDoc.save();

    // Redirect to the original URL
    res.redirect(urlDoc.originalUrl);
  } catch (error) {
    // Handle any errors that occur during the redirect process
    res.status(500).json({ message: 'Error tracking URL', error });
  }
};

// Export the functions for use in other modules
export { generateUrl, redirectToOriginal };
