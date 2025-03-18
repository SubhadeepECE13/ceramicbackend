import mongoose from "mongoose";
const managementmodel=mongoose.Schema({
    image:{
        type:String

    },
    name:{
        type:String
    },
    position:{
        type:String
    },
    description:{
        type:String
    }
})
const management=mongoose.model('management',managementmodel);
export default management;