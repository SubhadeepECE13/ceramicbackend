import User from "../Model/Register.js";

export const findUserById =async (id) => {
   try{
    const user=await User.findById(id);
    return user;
   }
   catch(error)
   {
    throw error;
   }
};



export const finduserbyemail = async (email) => {
    try {
        console.log('Finding user with email:', email);

        // Check if the email is valid
        if (!email) {
            throw new Error('Email is required');
        }

        const user = await User.findOne({Email:email });

        if (!user) {
            console.log('No user found with the given email');
            return null;  // You can return null or handle it according to your logic
        }
        console.log('user',user)

        return user;
    } catch (error) {
        console.error('Error occurred while finding user:', error);
        throw error;  // Rethrow the error or handle it based on your logic
    }
};

