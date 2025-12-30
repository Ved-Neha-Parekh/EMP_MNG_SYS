import jwt from "jsonwebtoken";
import env from "../config/dotenv.js";

export const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "User not authenticated...", success: false });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);

    req.user = decoded;

    return next();
  } catch (error) {
    console.log("Error in authenticate function:",error);
    return res.status(401).json({
      message: "Invalid Token",
      success: false,
    });
  }
};

export const authorizedRoles = (...allowedUsers) => {
  return (req,res,next) => {
    if (!allowedUsers.includes(req.user.role)) {
      return res.status(403).json({message:`Role: ${req.user.role} is not allowed this resource...`,success:false})
    }

    return next();
  }
}