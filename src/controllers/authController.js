import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
    const {email, password, name} = req.body;

    try {
        // CEK EMAIL
        const emailExists = await prisma.user.findUnique({
            select: {
              email: true,
              id: true  
            },
            where: {
                email
            }
        });

        if(emailExists) {
            return res.json({
                code: 400,
                message: "Email already exists",
                data: emailExists
            });
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashed,
                name
            }
        });

        res.json({
            code: 200,
            message: "Register success",
            data: user
        });
    } catch (error) {
        console.log(error);
        res.json({
            code: 500,
            message: "Register failed",
            error: error
        });

    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if(!user) {
            return res.json({
                code: 404,
                message: "Login failed",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.json({
                code: 404,
                message: "Login failed",
            });
        }

        const token = jwt.sign({
                id: user.id,
                email: user.email,
                name: user.name
            },
                JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            code: 200,
            message: "Login success",
            data: {
                token: token
            }
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            code: 500,
            message: "Login failed",
            error: error
        });
    }
}