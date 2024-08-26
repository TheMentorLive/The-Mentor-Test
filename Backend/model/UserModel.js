const mongoose = require('mongoose');

// Define the UserSchema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    lastName: {
        type: String,
    },
    username: {
        type: String,
        // unique: true,
    },
    email: {
        type: String,
        // required: true,
        // unique: true,
    },
    mobile: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        // required: true,
    },
    otp: { type: String },

    otpExpires: Date,

    isVerified: {
        type: Boolean,
        default: false
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
    },
}, { timestamps: true });

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

module.exports = mongoose.model('User', UserSchema);
