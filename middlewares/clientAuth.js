import jwt from "jsonwebtoken";
import env from "../config/dotenv.js";

export const requireAuth = (req,res,next)=>{
    const token = req.cookies.token;

    if(!token) {
        return res.redirect("/login");
    }

    try {
        const decoded = jwt.verify(token,env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        console.log("Token Invalid:", error.message);
        return res.redirect("/login");
    }
}