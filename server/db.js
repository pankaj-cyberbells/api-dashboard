import mongoose from "mongoose";


const connectionURL = "mongodb+srv://janasomnath173:K3ePi3M3mBfOtl2n@cluster0.6r3pwwc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" 

export const connectToDB = async() => {

  mongoose.connect(connectionURL, {}).then(() => {
    console.log("db connected successfully")
  }).catch((err) => {
    console.log(err)
  })

}