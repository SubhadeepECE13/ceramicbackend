import mongoose from "mongoose";
const navbarmodel=mongoose.Schema({
    logo:{
        type:String,
        
    }
});
const navbar=mongoose.model('navbar',navbarmodel);
export default navbar;