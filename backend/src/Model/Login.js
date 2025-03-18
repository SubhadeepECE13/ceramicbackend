import mongoose from "mongoose";

// Define the schema for login
const loginSchema = mongoose.Schema({
    Email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    Password: {
        type: String,
        required: true
    }
});


const Login = mongoose.model('Login', loginSchema);

export default Login;
