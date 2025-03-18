import express from "express";
import { Login, Register } from "../Controllers/User.js";
const userrouter=express.Router();
userrouter.post('/register',Register);
userrouter.post('/login',Login)
export default userrouter;