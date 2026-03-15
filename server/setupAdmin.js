import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const createAndPromoteAdmin = async () => {
    const email = 'deepak@gmail.com';
    const password = 'password123'; // Default password
    const name = 'Admin User';

    try {
        console.log(`Connecting to MongoDB at ${process.env.MONGO_URI}...`);
        await mongoose.connect(process.env.MONGO_URI);
        
        let user = await User.findOne({ email });

        if (user) {
            console.log(`User ${email} already exists. Promoting to admin...`);
            user.role = 'admin';
            await user.save();
        } else {
            console.log(`Creating user ${email}...`);
            user = await User.create({
                name,
                email,
                password,
                role: 'admin'
            });
        }

        console.log(`\nSUCCESS: User ${email} is now an ADMIN.`);
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}\n`);
        
        await mongoose.disconnect();
        process.exit();
    } catch (error) {
        console.error('\nERROR:', error.message);
        process.exit(1);
    }
};

createAndPromoteAdmin();
