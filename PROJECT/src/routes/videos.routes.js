import { Router } from "express"
import { getVideos } from "../controllers/videos.Controller.js"

const router = Router()

router.route('/').get(getVideos)

export default router
