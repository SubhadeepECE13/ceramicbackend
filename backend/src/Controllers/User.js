// import { compareSync } from "bcrypt";
import bcrypt from 'bcrypt';

import User from "../Model/Register.js";
import { finduserbyemail, findUserById } from "../Repository/user.js";
import generatetoken from "../utils/TokenGenerete.js";

export const Register = async (req, res) => {
    try {
        const { Email, Password, UserName } = req.body;

         console.log('email',Email, 'password',Password,"user",UserName)
     
        const user = await finduserbyemail(Email);
        if (user) {
            return res.status(409).json({
                message: 'User already exists with the same Email or username',
                success: false
            });
        }

       
        const newUser = await User.create({
            Email: Email,
            Password :Password,
             UserName :UserName
        });
        await newUser.save();


        return res.status(201).json({
            message: 'User registered successfully',
            success: true,
            user: {
                Email: newUser.Email,
                UserName: newUser.UserName
              
            }
        });
    } catch (error) {
     
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};
export const Login=async(req,res)=>{
    try{
        const {Email, Password}=req.body;

        const user=await finduserbyemail(Email);

        console.log('usersfound',user);

        if(!user)
        {
            return res.status(401).json({
                message:'User not found',
                success:false
            })
        }

        // const isvalidpassword=compareSync(Password, user.Password);
        const isvalidpassword = bcrypt.compareSync(Password, user.Password);
        console.log('isvalid',isvalidpassword)

        if(!isvalidpassword)
        {
            return res.status(401).json({
                message:'Invalid Password',
                success:false
            })
        }

        const token=await generatetoken(user._id);
        console.log('toek',token)
        return res.status(201).json({
            message:'Logged in successfully',
            token:token,
            success:true
        })
    }
    catch(error)
    {
        return res.status(501).json({
            message:"Internal server error",
            success:false
        })
    }

}
