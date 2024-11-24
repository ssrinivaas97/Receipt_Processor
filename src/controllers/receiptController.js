const receiptSchema = require('../models/receipt');
const { v4: uuidv4 } = require('uuid');
const { calculatePoints } = require('../services/pointsCalculator');

// In-memory storage for receipts
const receipts = {};

// Function to process the receipt
const processReceipt = (req, res) => {
    // Step 1: Validate the receipt using the schema
    const { error, value } = receiptSchema.validate(req.body, { abortEarly: false });

    if (error) {
        // Return a 400 response if validation fails
        return res.status(400).json({ errors: error.details.map(err => err.message) });
    }

    // Step 2: Generate a unique ID for the receipt
    const id = uuidv4();

    // Step 3: Store the validated receipt in memory
    receipts[id] = value; // `value` contains the validated receipt data

    // Step 4: Return the generated ID in the response
    res.status(200).json({ id });
};

// Function to get points for a receipt by ID
const getReceiptPoints = (req, res) => {
    // Step 1: Extract the ID from the URL
    const { id } = req.params;

    // Step 2: Check if the receipt exists in memory
    const receipt = receipts[id];
    if (!receipt) {
        // Return a 404 response if the receipt is not found
        return res.status(404).json({ error: 'Receipt not found' });
    }

    // Step 3: Calculate points using the service
    const points = calculatePoints(receipt);

    // Step 4: Return the points in the response
    res.status(200).json({ points });
};

// Function to display all receipts
const getAllReceipts = (req, res) => {
    // Return all receipts in memory
    res.status(200).json({ receipts });
};

module.exports = { processReceipt, getReceiptPoints, getAllReceipts, receipts };
