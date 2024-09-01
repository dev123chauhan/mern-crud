const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Import routes
const studentRoutes = require("./routes/studentRoutes");

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "https://mern-crud-client-kappa.vercel.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow this specific origin
  })
);
app.use(express.json());

const PORT = process.env.PORT || 8080;

// Use student routes
app.use("/api", studentRoutes);

app.options('*', cors());

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.log("Error connecting to MongoDB:", err));
