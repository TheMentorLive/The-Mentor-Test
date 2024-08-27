const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

// Define the UserSchema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, // Remove extra spaces
    },
    username: {
        type: String,
        unique: true,
        minlength: 3,
    },
    lastName: {
        type: String,
        trim: true, // Remove extra spaces
    },
    email: {
        type: String,
        unique: true,
        // required: true, // Ensure email is provided
        lowercase: true, // Convert to lowercase before saving
        trim: true, // Remove extra spaces
    },
    mobile: {
        type: String,
        trim: true, // Remove extra spaces
    },
    // password: {
    //     type: String,
    //     required: true, // Ensure password is provided
    // },
    otp: { 
        type: String,
        trim: true, // Remove extra spaces
    },
    otpExpires: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Define possible roles
        default: 'user', // Default role
    },
}, { timestamps: true });



UserSchema.pre('save', async function(next) {
    if (!this.username) {
        let generatedUsername;
        let isUnique = false;

        // Keep generating until a unique username is found
        while (!isUnique) {
            generatedUsername = faker.internet.userName();

            // Check if the generated username is unique
            const existingUser = await mongoose.models.User.findOne({ username: generatedUsername });
            if (!existingUser) {
                isUnique = true;
            }
        }

        this.username = generatedUsername;
    }

    next();
});

// Create and export the model
module.exports = mongoose.model('User', UserSchema);



