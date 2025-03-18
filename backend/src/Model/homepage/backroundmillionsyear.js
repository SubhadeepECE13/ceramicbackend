import mongoose from "mongoose";
const backroundofyearsectionmodel=mongoose.Schema({
    image:{
        type:String
    }
})

const backroundimageofyear=mongoose.model('backroundimageofyear',backroundofyearsectionmodel);
export default backroundimageofyear;