import express from "express";
import authMiddleware from "../middleware/auth.js"
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

// api endpoint for placing order
orderRouter.post("/place", authMiddleware, placeOrder);

//api endpoint to verify order
orderRouter.post("/verify",verifyOrder);

//api endpoint to fetch personalised users order in frontend
orderRouter.post("/userorders",authMiddleware,userOrders);

//api endpoint to get all users orders in admin panel
orderRouter.get("/list",listOrders);

//api endpoint to update status on backend(database)
orderRouter.post("/status",updateStatus);


export default orderRouter;