const express = require("express");
const connectDB = require("./db"); // Import the database configuration file
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
connectDB();

// Enable pre-flight requests for all routes
app.options("*", cors());

// Parse incoming requests with JSON payloads
app.use(bodyParser.json({ limit: "1000mb" }));

// Parse URL-encoded data with extended mode
app.use(express.urlencoded({ extended: true, limit: "1000mb" }));

// Enable CORS for all routes
app.use(cors({ origin: true, credentials: true }));

const path = require("path");

// Serve static files from the public directory
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

// Middleware setup
app.use(express.json());

const adminRoute = require("./routes/adminRoutes");

const treatmentRoute = require("./routes/treatmentRoutes");
const consultantRoute = require("./routes/consultantRoutes");
const jobRoute = require("./routes/jobRoutes");
const dutyDoctorRoute = require("./routes/dutyDoctorRoutes");
const applicationRoute = require("./routes/applicationRoutes");
const contactMessageRoute = require("./routes/contactMessageRoutes");
const branchRoute = require("./routes/branchRoutes");
const bookingRoute = require("./routes/bookingRoutes");
const topServiceRoute = require("./routes/topServiceRoutes");
const testimonialRoute = require("./routes/testimonialRoutes");
const contactDetailsRoute = require("./routes/contactDetailsRoutes");

app.use("/api/admin", adminRoute);
app.use("/api/treatment", treatmentRoute);
app.use("/api/consultant", consultantRoute);
app.use("/api/job", jobRoute);
app.use("/api/dutydoctor", dutyDoctorRoute);
app.use("/api/application", applicationRoute);
app.use("/api/contactmessage", contactMessageRoute);
app.use("/api/branch", branchRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/topservice", topServiceRoute);
app.use("/api/testimonial", testimonialRoute);
app.use("/api/contactdetails", contactDetailsRoute);

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start the server
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Open in browser: http://localhost:${port}/`);
});
