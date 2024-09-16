const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject:String,
    message: String
});

const Contact = mongoose.model('Contact', ContactSchema);
; // Correct model name
module.exports = Contact;
