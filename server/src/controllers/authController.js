import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as UserModel from "../models/userModel.js";

export async function register(req, res) {

    try {

        const { name, email, password, role } = req.body;

        const exists = UserModel.getUserByEmail(email);

        if (exists) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        const password_hash = await bcrypt.hash(password, 10);

        const id = UserModel.createUser({
            name,
            email,
            password_hash,
            role
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: { id }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }

}

export async function login(req, res) {

    try {

        const { email, password } = req.body;

        const user = UserModel.getUserByEmail(email);

        if (!user) {

            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });

        }

        const validPassword = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!validPassword) {

            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });

        }

        const token = jwt.sign(

            {
                id: user.id,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "24h"
            }

        );

        res.json({

            success: true,

            token,

            user: {

                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role

            }

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }

}

export function me(req, res) {

    const user = UserModel.getUserById(req.user.id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    delete user.password_hash;

    res.json({
        success: true,
        data: user
    });

}