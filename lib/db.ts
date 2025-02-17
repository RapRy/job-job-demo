import mongoose, { Connection } from "mongoose";

let cacheConnection: Connection | null = null;

export async function connectToMongoDB() {
  if (cacheConnection) {
    console.log("Using cached db connection");
    return cacheConnection;
  }
  try {
    const cnx = await mongoose.connect(process.env.MONGODB_URI as string);

    cacheConnection = cnx.connection;

    console.log("New mongodb connection established");

    return cacheConnection;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
