import mongoose from "mongoose";
const HistoryModel=mongoose.Schema({
    date:{
        type:String
    },
    description:{
        type:String
    }
})

const History=mongoose.model('History',HistoryModel);
export default History;