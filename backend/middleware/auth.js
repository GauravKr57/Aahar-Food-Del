import jwt from "jsonwebtoken";

// THIS MIDDLEWARE WILL CONVERT THE TOKEN TO USER id

const authMiddleware = async (req,res,next) => {
    const {token} = req.headers;

    //if token is empty return Not authorised to access
    if(!token) {
        return res.json({
            success:false,
            message:"Not Authorized! Login again"
        })
    }
    try {
        //decode token to access user id : Converting the token into user's id after recieving request
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        })
    }
}

export default authMiddleware;