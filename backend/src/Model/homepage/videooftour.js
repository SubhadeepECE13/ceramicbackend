import mongoose from "mongoose";
const videotour=mongoose.Schema({
    video:{
        type:String,

    }
})
const VideoTourmodel=mongoose.model('VideoTourmodel',videotour);
export default VideoTourmodel;