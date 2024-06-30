import foodModel from "../models/foodModel.js";

import fs from 'fs';

// add food item {store product data on db} (CREATE)  Added through form

const addFood = async (req,res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await food.save();
        res.json({
            success:true,
            message:"Food Added"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error Occured"
        })
    }
}

// All food list (which are present in the database) (READ)

const listFood = async (req,res) =>{
    try {
        const foods = await foodModel.find({});
        res.json({
            success:true,
            data:foods
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        })
    }
}


// Remove food item from database (DELETE)

const removeFood = async (req,res) =>{
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, ()=>{});                                         // Find the food  to be deleted with the help of id and delete its image from uploads folder 

        await foodModel.findByIdAndDelete(req.body.id);                                      // Delete the food from database according to the id

        res.json({
            success:true,
            message:"Food Item Removed"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        })
    }
}


export {addFood, listFood, removeFood};