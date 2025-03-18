import mongoose from "mongoose";
const CoreandPricipleModel=mongoose.Schema({
    image:{
        type:String
    },
    title:{
        type:String
    },
    description:{
       type: String
    }
})
const Coreandprinciple=mongoose.model('Coreandprinciple',CoreandPricipleModel);
export default Coreandprinciple;