const mongoose = require("mongoose");

const schemaData = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    gender: { type: String, required: true },
    hobbies: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", schemaData);

module.exports = Student;
