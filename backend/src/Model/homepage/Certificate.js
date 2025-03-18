import mongoose from 'mongoose'
const certificateModel=mongoose.Schema({
    image:{
        type:String
    },

    title:{
        type:String
    },
    
    description:{
        type:String
    }
})

const certificatemodel=mongoose.model('certificatemodel', certificateModel);
export default certificatemodel;