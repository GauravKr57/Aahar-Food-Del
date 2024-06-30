import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {type:String, required:true},
    items: {type:Array, required:true},
    amount: {type:Number, required:true},
    address: {type:Object, required:true},
    status: {type:String, default:"Food Processing"},                                                       // Set the default status of order as false as soon as order is made
    date: {type:Date, default:Date.now()},
    payment: {type:Boolean, default:false}                                                                  // Default payment of order as false
})

const orderModel = mongoose.models.order || mongoose.model("order",orderSchema);

export default orderModel;