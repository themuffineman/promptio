import mongoose from "mongoose";

let isConnected = false

export const conectDB = async () => {
    mongoose.set('strictQuery', true)

    if(isConnected){
        console.log('MongoDB is already connected')
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "sharePrompt",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true
        console.log('MonogDB Connected')
    } catch (error) {
        console.error(error)
    }
}