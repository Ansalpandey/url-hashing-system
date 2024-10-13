import mongoose from 'mongoose'; // Import Mongoose for MongoDB object modeling

// Define the schema for the URL collection in the database
const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true }, // The original URL to be shortened
  hashedUrl: { type: String, required: true, unique: true }, // The unique hashed URL generated
  usageLimit: { type: Number, default: 1 }, // The maximum number of times the URL can be used (default is 1 for single use)
  clickCount: { type: Number, default: 0 }, // The count of clicks on the hashed URL (default is 0)
  createdAt: { type: Date, default: Date.now }, // The date when the URL document was created
});

// Create the URL model based on the defined schema
const Url = mongoose.model('Url', urlSchema); // 'Url' is the name of the model

// Export the Url model for use in other parts of the application
export { Url };
