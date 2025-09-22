import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiErrors";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model";


//Middleware created
export const verifyJWT= asyncHandler(async(req,resizeBy,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorizations")?.replace("Bearer","")
    
        if (!token) {
            throw new ApiError(401, "Unauthorized request")    
        }
    
       const decodedToken= jwt.verify(token, process.env.ACCESS_TOCKEN_SECRET)
    
       const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
       if (!user) {
        throw new ApiError(401,"Invalid Access Token")  
       }
    
       req.user=user;
       next()
    } catch (error) {
        throw new ApiError(404, error?.message || "Invalid access token")
    }
})