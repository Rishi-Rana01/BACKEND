import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudnary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const generateAccessAndRefereshTokens =async(userId)=>{
  try {
    const user = await User.findById(userId)
    const accessToken=user.generateAccessToken()
    const refreshToken=user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({validateBeforeSave: false})

    return {accessToken, refreshToken}

  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating and access tokens") 
  }
}

const registerUser = asyncHandler( async (req, res)=> {

    const {fullName , email , username, password}=req.body
    console.log("email: ", email);
    

   if (
    [fullName,email,username, password].some((field)=>
    field?.trim()==="" ) // check any of these feil is empty if emty then its true
   ) {
    throw new ApiError(400, "All fields are requidred")
   }

   const existedUser = await User.findOne({
    $or:[{ username },{ email }] // using $or it chek for both - if it is exsist already in db or not 
   })
   if (existedUser) {
    throw new ApiError(409, "User with email or username already registered")
   }

  const coverImageLocalPath = Array.isArray(req.files?.coverImage) && req.files.coverImage.length > 0 ? req.files.coverImage[0].path : undefined;  // ?-means- optional
  const avatarLocalPath = Array.isArray(req.files?.avatar) && req.files.avatar.length > 0 ? req.files.avatar[0].path : undefined;

   if (!avatarLocalPath) {
    throw new ApiError(400,"Avatar File is required")
   }

  const avatar= await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if (!avatar) {
     throw new ApiError(400,"Avatar File is required")
  }

  const user=await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
  })

  const createdUser=await User.findById(user._id).select("-password -refreshToken")
  if (!createdUser) {
    throw new ApiError(500,"Something went wrong  while Registering the user");   
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser,"User Rejistered Successfully")
  )
   
} )

const loginUser = asyncHandler(async(req, res)=>{
  //req body -> data
  //username or email base login
  //find user
  //password check
  //access and referesh token
  //send cookie
  //response 

  const{email, username,password}= req.body

  if(!username || !email){
    throw new ApiError(400, "username or password is required")
  }

  const user =await User.findOne({
    $or: [{username}, {email}]
  })

  if(!user){
    throw new ApiError(404,"User does not exsist")
  }

  const isPasswordValid=await user.isPasswordCorrect(password)

  if(!isPasswordValid){
    throw new ApiError(401,"Invalid user crendentials")
  }

  const {accessToken,refreshToken} = await generateAccessAndRefereshTokens(user._id)

  const loggedInUser=User.findById(user._id).select("-password -refreshToken")

  const options= {
    httpOnly: true,
    secure: true
  }
  return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken", refreshToken,options)
  .json(
    new ApiResponse(200,{user:loggedInUser, accessToken,refreshToken}, "User Logged In Successfully")
  )
})

const logoutUser = asyncHandler(async(req,res)=>{
 await User.findByIdAndUpdate(req.user._id,{
    $set: {
      refreshToken: undefined
    }
  },
  {
    new:true

  }
)

 const options= {
    httpOnly: true,
    secure: true
  }
  return res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options)
  .json(new ApiResponse(200,{},"User logged out"))
  
})


export {registerUser, loginUser,logoutUser };

//GET user details from frontend
//validation- not empty
//user already exsist
//check for images, chek for avatar
//upload them to cloudianry,avatar
//create user object - create entry in db
//remove password and refresh tocken field from response
//check for user creation
//return response, res