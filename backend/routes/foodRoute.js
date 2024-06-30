import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";


const foodRouter = express.Router();  // Using this router we can create various methods like GET,POST etc

// Image storage engine(Multer)

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb) =>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})                                            // Middleware to store image in uploads folder


foodRouter.post("/add", upload.single("image"), addFood);                           // Adding upload image middleware to post route

foodRouter.get("/list", listFood);                                                  // Lists all the food in the database under this route (function created under foodController)

foodRouter.post("/remove", removeFood);                                             // Route to remove food from db



export default foodRouter;