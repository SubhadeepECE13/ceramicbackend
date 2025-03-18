import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

async function generatetoken(userid) {
    console.log('sec', process.env.SECRET);  // This will log the secret key

    // Pass the payload as an object
    return jwt.sign({ id: userid }, process.env.SECRET, { expiresIn: '144h' });
}

export default generatetoken;
