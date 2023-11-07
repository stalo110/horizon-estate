import mongoose from "mongoose";

export const DATABASE = async () => {
  try {
    const connect = await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.d8bojru.mongodb.net/horizon`
    );
    console.log(
      `database has been connected successfully to ${JSON.stringify(
        connect.connection.host
      )}`
    );
  } catch (error) {
    console.log(error)
    console.error(`Mongodb connection error ${JSON.stringify(error)}`);
    process.exit(1);
  }
};


  
