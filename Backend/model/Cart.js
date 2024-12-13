const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Reference to the User model
    },
    tests: [{
      test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test", // Reference to the Test model
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      }, 
      examType: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      duration: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically create createdAt and updatedAt fields
  }
);

// Create the Cart model based on the schema
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
