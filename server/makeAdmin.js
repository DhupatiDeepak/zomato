import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const makeAdmin = async () => {
  const email = process.argv[2];
  if (!email) {
    console.log('Usage: node makeAdmin.js <email>');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.findOne({ email });

    if (user) {
      user.role = 'admin';
      await user.save();
      console.log(`\nSUCCESS: User ${email} has been promoted to ADMIN.\n`);
    } else {
      console.log(`\nERROR: User with email ${email} not found.\n`);
    }
    await mongoose.disconnect();
    process.exit();
  } catch (error) {
    console.error('Connection error:', error);
    process.exit(1);
  }
};

makeAdmin();
