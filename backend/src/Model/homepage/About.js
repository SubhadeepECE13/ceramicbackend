import mongoose from "mongoose";
const aboutmodel=mongoose.Schema({
    header:{
        type:String
    },
    content:{
        type:String
    },
    
    image:{
        type:String
    }
})

const aboutusinhomepage=mongoose.model('aboutusinhomepage',aboutmodel);
export default  aboutusinhomepage;