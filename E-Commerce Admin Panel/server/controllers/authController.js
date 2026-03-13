import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User
export const register = async (req, res) => {
    try{
        const {name, email, password , role } = req.body;

        // Check if user already exists
        const userExists = await User.findOne( {email});
        if (userExists) {
            return res.status(400).json({message: 'User already exists'});
        }

        // Password Hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creat New User
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'user'
        })
        
        // Generate JWT Token
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
        };
}

// Login User
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({message: 'Invalid credentials'})
        }

        // Check Password
        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'})
        }

        // Generate JWT Token
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}