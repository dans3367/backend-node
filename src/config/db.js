import { mongoose } from 'mongoose';


const connectDB = async () => {
    try {
      const conn = await mongoose.connect(`${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      console.log(error.message);
      process.exit(1);
    }
  }

export default connectDB;