const mongoose = require('mongoose');

// Define the UserSchema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, // Remove extra spaces
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
        unique: true,
        // required: true, // Ensure mobile is provided
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

// Create and export the model
module.exports = mongoose.model('User', UserSchema);


// Middleware to generate a username
// UserSchema.pre('save', async function (next) {
//     if (this.isNew || this.isModified('firstName') || this.isModified('lastName')) {
//         // Generate a username
//         let username = (this.firstName && this.lastName)
//             ? `${this.firstName.toLowerCase()}.${this.lastName.toLowerCase()}`
//             : this.email.split('@')[0].toLowerCase();

//         // Ensure the username is unique
//         let user = await mongoose.model('User').findOne({ username });
//         let counter = 1;
//         while (user) {
//             username = `${username}${counter}`;
//             user = await mongoose.model('User').findOne({ username });
//             counter++;
//         }

//         this.username = username;
//     }
//     next();
// });

