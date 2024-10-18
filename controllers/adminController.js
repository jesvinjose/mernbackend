const jwt = require("jsonwebtoken"); // Make sure jwt is imported
const Admin = require("../models/adminModel");

const verifyAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the admin by email
    const admin = await Admin.findOne({ email: email });

    // If no admin is found with the provided email
    if (!admin) {
      console.log("Admin is not valid");
      return res.status(401).json({ message: "Admin is not valid" });
    }

    // Check if the password matches
    if (admin.password === password) {
      // Generate JWT token
      const token = jwt.sign(
        {
          _id: admin._id,
          email: admin.email,
        },
        process.env.admintoken_secretKey,
        {
          expiresIn: "1h",
        }
      );

      // Return successful response
      return res.status(200).json({
        message: "Valid Admin",
        token: token,
        email: admin.email,
        adminId: admin._id,
      });
    } else {
      // If the password is incorrect
      console.log("Wrong Password");
      return res.status(401).json({ message: "Wrong password" });
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error during login:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { verifyAdminLogin };
