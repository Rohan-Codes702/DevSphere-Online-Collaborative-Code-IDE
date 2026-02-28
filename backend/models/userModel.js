const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI || process.env.MONGOURI;

if (!mongoUri) {
  console.warn("Mongo URI is missing. Set MONGO_URI in backend/.env");
} else {
  mongoose
    .connect(mongoUri)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB connection error:", err.message));
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  isBlocked: {
    type: Boolean,
    default: false
  },

  isAdmin: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true  
});

module.exports = mongoose.model("User", userSchema);
