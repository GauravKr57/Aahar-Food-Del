import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import 'dotenv/config';


const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET);                                                               // We have taken users id and generated 1 hashed token using jwt
}


//Login User

const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try {
        //Check if user exists in the database with entered email ID
        const user = await userModel.findOne({email});
        if(!user) {
            return res.json({
                success:false,
                message:"User doesn't exists.Try Sign Up"
            })
        }

        //If email matches compare entered password with hashed password in database
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({
                success:false,
                message:"Invalid login credentials"
            })
        }

        //generate token hence succesful login
        const token = createToken(user._id);
        res.json({success:true,token});

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        })
    }
}

//Register User

const registerUser = async (req,res) => {
    const {name,password,email} = req.body;
    try {
        // Checking if user already exists in db(unique email id)
        const exists = await userModel.findOne({email});
        if(exists) {
            return res.json({
                success:false,
                message:"User already exists"
            })
        }

        // Validating email format and strong password (length>6)
        if(validator.isEmail(email) === false) {
            return res.json({
                success:false,
                message:"Please enter a valid email"
            })
        }

        if(password.length < 6){
            return res.json({
                success:false,
                message:"Please enter a strong password"
            })
        }

        //hash the password before registration
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //Create new user using name, email and password in database
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save();                                                              // Save new user in the database

        //Take user id and generate 1 token from it hence succesful registration
        const token = createToken(user._id);
        res.json({success:true,token});

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        })
    }
}


export {loginUser,registerUser};