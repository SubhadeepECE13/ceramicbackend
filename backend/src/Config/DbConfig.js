import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
async function connect() {
    try{
    mongoose.connect(process.env.Url);
    console.log("Mongodb is connected successfully")
    }
    catch(error)
    {
        console.log(error);
    }
    
}
export default  connect;