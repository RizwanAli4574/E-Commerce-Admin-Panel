import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

const registerUser = async () => {
  // Connect to the database configured in .env (or fallback to local)
  await connectDB();

  const email = 'admin3@test.com';
  const password = '123456';
  const name = 'Admin User';
  const role = 'admin';

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log(`User with email "${email}" already exists in this database.`);
      // Update password just in case
      const salt = await bcrypt.genSalt(10);
      userExists.password = await bcrypt.hash(password, salt);
      userExists.name = name;
      userExists.role = role;
      await userExists.save();
      console.log('Password/Details updated successfully.');
      process.exit(0);
    }

    // Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create New User
    await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    console.log(`Successfully registered new admin user:`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log(`Role: ${role}`);
  } catch (error) {
    console.error(`Error registering user: ${error.message}`);
  } finally {
    mongoose.connection.close();
  }
};

registerUser();
