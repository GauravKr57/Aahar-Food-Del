import userModel from "../models/userModel.js"

//  create 3 functions addToCart, removeFromCart, fetch user's Data for users cart

const addToCart = async (req,res) => {
    try {
        // finding user data with the help of user id which was decoded by authMiddleware and thereby finding cart data related to that user
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        
        // If cart data has no item entry add an item else inc the count
        if(!cartData[req.body.itemId])
        {
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }

        //Update cart data of user 
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});

        res.json({
            success:true,
            message:"Added to Cart"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        })
    }
}

const removeFromCart = async (req,res) => {
    try {
        // find the user data obtained by auth middleware after decoding the token
        const userData = await userModel.findById(req.body.userId);
        const cartData = await userData.cartData;

        if(cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, {cartData});

        res.json({
            success:true,
            message:"Removed from cart"
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        })
    }
}

const getCart = async (req,res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        const cartData = await userData.cartData;

        res.json({
            success:true,
            cartData
        })

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        })
    }
}

export {addToCart,removeFromCart,getCart};