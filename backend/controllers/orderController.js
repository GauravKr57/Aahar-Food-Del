import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order from frontend (for placeorder api)

const placeOrder = async (req,res) => {
    
    const frontend_url = "https://aahar-food-del-frontend.onrender.com/";

    try {
        // Creating new order and saving it in database
        const newOrder = new orderModel({
            userId: req.body.userId,                                                        // This can be accesed with the help of authMiddleware
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        
        await newOrder.save();                                                              // Saving the orderData on database

        //Clear users cart after order placed
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});                   

        // Creating payment link with the help of stripe through line items

        //Product charges
        const line_items = req.body.items.map((item) =>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount: item.price*100
            },
            quantity: item.quantity
        }))

        //Push delivery charges
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:30*100
            },
            quantity:1
        })

        //Using the line items, creating a session for payment
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,                                                             // If the payment is suceesful, redirect to succes url else redirect to Cancel url (we have added to parameters to url : success and orderId)
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}` 
        })

        res.json({
            success:true,
            session_url:session.url
        })

    } catch (error) {
        console.log(error.message);
        res.json({
            success:false,
            message:"Error"
        })
    }
}


// Function to verify orders from the site (based on succesful or cancelled payment)

const verifyOrder = async (req,res) => {
    const {orderId,success} = req.body;
    try {
        if(success == "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            res.json({
                success:true,
                message:"Paid"
            })
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({
                success:false,
                message:"Not Paid"
            })
        }
        
    } catch (error) {
        console.log(error.message);
        res.json({
            success:false,
            message:"Error"
        })
    }
}


// Users orders for one user for frontend access

const userOrders = async(req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({
            success:true,
            data:orders
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success:false,
            message:"Error"
        })
    }
}

// Listing All orders of all the users for admin panel orders page

const listOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({});                                                                   // All the orders made iin our frontend
        res.json({
            success:true,
            data:orders
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        })
    }
}

//api for updating order status in database from admin panel

const updateStatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({
            success:true,
            message:"Status Updated"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        })
    }
}


export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus};
