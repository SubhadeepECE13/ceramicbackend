import mongoose from 'mongoose'
const heromodel=mongoose.Schema({
    video:{
        type:String
    },
    content2:{
        type:String
    },
    content1:{
        type:String
    }
})
const Heromodel=mongoose.model('Heromodel',heromodel);
export default Heromodel;