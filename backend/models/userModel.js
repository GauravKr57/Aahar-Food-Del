import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},                                                               // Cant have duplicate entries for same email
    password: {type:String, required:true},
    cartData: {type:Object, default:{}}                                                                             // Cart of user initialised to empty object, if he adds an item it will get populated
},{minimize:false})

const userModel = mongoose.models.user || mongoose.model("user",userSchema);                                         // If the model is already created that model will be used else create new user model

export default userModel;

