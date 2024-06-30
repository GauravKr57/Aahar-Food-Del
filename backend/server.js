import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";


// App Config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection 
connectDB();

// API endpoints
app.use("/api/food", foodRouter);                                // use this endpoint + '/type' (methods in foodRouter.js)
app.use("/images",express.static('uploads'));                // When we add any image in uploads folder we can access it in 'localhost:4000/images/filename' endpoint
app.use("/api/user", userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order", orderRouter);

// Route
app.get("/", (req,res) => {
    res.send("API Working")
})

// run server
app.listen(port, ()=>{
    console.log(`Server started on http://localhost:${port} `)
})



//0.0.0.0/0  (includes your current IP address) ACCESS DATABASE FROM ANY IP ADDRESS