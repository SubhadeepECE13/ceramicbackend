import mongoose from "mongoose";
const produtcmodel=mongoose.Schema({
    image:{
        type:String
    },
    name:{
        type:String
    },
    description:{
        type:String
    },
    typeofproduct:{
        type:String
    }

})
const Qualityproduct=mongoose.model('Qualityproduct', produtcmodel);
export default Qualityproduct;