import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || '';

if(!MONGODB_URI){
    throw new Error ("Please define the environment variables")
}

type connectionObject = {
    isConnected?: boolean
}

const connection : connectionObject = {

}

async function dbConnect() : Promise<void> {
    if(connection.isConnected){
        console.log("DB is already connecetd")
        return
    }

    try {
        await mongoose.connect(MONGODB_URI)
        connection.isConnected = true
        console.log("DB is connected")
    } catch (error) {
        console.log("Connection went wrong", error)
        process.exit(1)
    }
}

export default dbConnect;