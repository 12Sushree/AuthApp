const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is Required"],
        trim: true
    },
    otp: {
        type: Number
    }
}, { timestamps: true })

module.exports = mongoose.model("Otp", otpSchema);