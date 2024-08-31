const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

// Read all students
router.get("/", async (req, res) => {
  try {
    const data = await Student.find({});
    res.json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create a new student
router.post("/create", async (req, res) => {
  try {
    const data = new Student(req.body);
    await data.save();
    res.send({ success: true, message: "Data saved successfully", data: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update a student
router.put("/update", async (req, res) => {
  try {
    const { _id, ...rest } = req.body;
    const data = await Student.updateOne({ _id }, rest);
    res.send({ success: true, message: "Data updated successfully", data: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete a student
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Student.deleteOne({ _id: id });
    res.send({ success: true, message: "Data deleted successfully", data: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
