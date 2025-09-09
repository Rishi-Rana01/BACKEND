import mongoose from "mongoose";

const UserSchema= new mongoose.Schema({
    
    username: { type: String, required: true, unique:true,lowercase:true },
    email: { type: String, required: true, unique: true,lowercase:true },
    password: { type: String, required: true },
  
},{timeseries:true})


const User = mongoose.model("User", UserSchema)
export default User; 