import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const registermodel = mongoose.Schema({
    UserName: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    }
});



registermodel.pre('save',async function(next){
    if(!this.isModified('Password')) return next();
    try{
        const sal=await bcrypt.genSalt(10);
        this.Password=await bcrypt.hash(this.Password, sal);
        next();
    }
    catch(error)
    {
        next(error);
    }
})
const User = mongoose.model('User', registermodel);

export default User;
