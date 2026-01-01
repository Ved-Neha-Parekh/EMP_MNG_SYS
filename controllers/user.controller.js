import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../config/dotenv.js";

export const userController = {
  async registerUser(req, res) {
    try {
      const { email, password } = req.body;

      let existingUser = await User.findOne({ email });

      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Email already registered...", success: false });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        email: email,
        password: hashPassword,
      });

      await newUser.save();

      return res.status(201).json({
        message: "User created successfully...",
        success: true,
        user: {
          email: newUser.email,
        },
      });
    } catch (error) {
      console.log("Error in register function:", error.message);
      return res.status(500).send("Server error during registration...");
    }
  },
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ message: "Invalid email or password...", success: false });
      }

      let isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return res
          .status(400)
          .json({ message: "Invalid email or password...", success: false });
      }

      const payload = {
        id: user.id,
        role: user.role,
      };

      const token = jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        message: "User LoggedIn successfully",
        success: true,
        token: token,
        user: {
          id: user.id,
          name: user.name,
          role: user.role,
        },

      });
    } catch (error) {
      console.log("Error in login function:", error.message);
      return res.status(500).send("Server error during login...");
    }
  },
  async employees(req,res) {
    try {
      let data = await User.find({});
      return res.status(200).json({
        message: "All User Fetched",
        success: true,
        users: data,
        currentUser: req.user,
      });
    } catch (error) {
      console.log("FETCH USER ERROR:", error.message);
      return res.status(401).json({
        message: "Error while fetching user",
        success: false,
        users: [],
      });
    }
  },
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      return res.json({
        message: "User deleted",
        success: true,
        deletedUser: user,
      });
    } catch (error) {
      console.log("DELETE USER ERROR:", error.message);
      return res.json({
        message: "Error while deleting user",
        success: false,
        deletedUser: {},
      });
    }
  },
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      return res.json({
        message: "User updated",
        success: true,
        updatedUser: user,
      });
    } catch (error) {
      console.log("UPDATE USER ERROR:", error.message);
      return res.json({
        message: "Error while updating user",
        success: false,
        updatedUser: {},
      });
    }
  },
  async getSingleUser(req, res) {
    try {
      const { id } = req.params;
      console.log(id);
      let user = await User.findById(id);
      return res.json({
        message: "Single user fetched",
        success: true,
        user: user,
      });
    } catch (error) {
      return res.json({ message: error.message, success: false, user: {} });
    }
  },
};
