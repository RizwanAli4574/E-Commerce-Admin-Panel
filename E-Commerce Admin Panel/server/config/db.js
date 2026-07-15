import mongoose from 'mongoose';

const connectDB = async () => {
  const primaryUri = process.env.MONGO_URI;
  const localFallbackUri = 'mongodb://127.0.0.1:27017/ecommerce';

  // If primary URI is already the local one or not provided, connect directly
  if (!primaryUri || primaryUri.includes('localhost') || primaryUri.includes('127.0.0.1')) {
    try {
      const conn = await mongoose.connect(primaryUri || localFallbackUri);
      console.log(`MongoDB Connected (Local): ${conn.connection.host}`);
      return;
    } catch (error) {
      console.log(`Error connecting to local MongoDB: ${error.message}`);
      process.exit(1);
    }
  }

  // Otherwise, primaryUri is likely Atlas. Try connecting with a timeout.
  try {
    console.log('Attempting to connect to primary MongoDB (Atlas)...');
    const conn = await mongoose.connect(primaryUri, {
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
    });
    console.log(`MongoDB Connected (Atlas): ${conn.connection.host}`);
  } catch (error) {
    console.log(`Warning: Failed to connect to Atlas MongoDB (${error.message}).`);
    console.log('Falling back to local MongoDB...');
    try {
      const conn = await mongoose.connect(localFallbackUri);
      console.log(`MongoDB Connected (Local Fallback): ${conn.connection.host}`);
    } catch (fallbackError) {
      console.log(`Error: Failed to connect to both Atlas and local MongoDB. Local Error: ${fallbackError.message}`);
      process.exit(1);
    }
  }
};

export default connectDB;