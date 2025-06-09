import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
    default: "",
  },
  identity: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["STUDENT", "TEACHER", "ADMIN"],
    required: true,
    default: "TEACHER",  // Mặc định là Teacher
  },
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;
