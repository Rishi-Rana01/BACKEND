import { Router } from "express";
import { loginUser, registerUser, logoutUser } from "../controllers/user.Controller.js";
import {upload} from "../middlewares/multer.js"

const userRouter = Router()

userRouter.route("/register").post(upload.fields([
    {
        name: "avatar",
        maxCount: "1"
    },
    {
        name:"coverImage",
        maxCount: 1
    }

]), registerUser)

userRouter.route("/login").post(loginUser)

//secured routes

userRouter.route("/logout").post(verifyJWT, logoutUser)

export default userRouter ;