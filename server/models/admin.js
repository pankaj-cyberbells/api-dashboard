import mongoose from "mongoose";
import { Schema } from "mongoose";

const adminSchema= new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true,select:false},
},{
  timestamps: true
},{
  versionKey:false
})

const Admin= mongoose.model("Admin",adminSchema);
export default Admin