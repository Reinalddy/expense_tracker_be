import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        res.json({
            code: 401,
            message: "Who are you?"
        })
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        req.user = decoded;

        next();
        
    } catch (error) {
        console.log(error);
        res.json({
            code: 401,
            message: "Invalid token"
        })
    }

}