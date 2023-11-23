import { mongoose } from 'mongoose';


const connectDB = async (company_id) => {
    try {
      let dbName = "tenant";
      if(company_id > 0){
        dbName = `tenant_${company_id}`
      }
      const conn = await mongoose.connect(`${process.env.DB_URI}/${dbName}`);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      console.log(error.message);
      process.exit(1);
    }
  }

export default connectDB;

// imrancse94
// xA*9Aa_dP9U$kp@