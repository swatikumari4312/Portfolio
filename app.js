const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const path = require('path');
const app = express();
const Contact = require('./modle/Contact'); // Ensure this path is correct
const connectDB = require('./config'); // Ensure this path is correct

// Middleware
app.use(cors());  // To allow cross-origin requests
app.use(express.json());  // To parse JSON data
app.use(express.urlencoded({ extended: true }));  // To decode URL-encoded data
app.use(express.static('public'));  // To serve static files

// Connect to MongoDB
connectDB(); // Call the connectDB function from your config file

// API Routes
app.get('/pfolio', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'portfolio.html'));
});

app.post('/pfolioPost', async (req, res) => {
    try {
        const contactData = new Contact(req.body);
        await contactData.save();  // Save data to MongoDB
        console.log('Data saved:', req.body);
        res.sendFile(path.join(__dirname, 'public', 'thankyou.html'));
    } catch (error) {
        console.error('Error saving data:', error.message);
        res.status(500).send(`An error occurred while saving data: ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});