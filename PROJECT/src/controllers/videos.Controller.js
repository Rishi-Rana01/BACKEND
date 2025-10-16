import {Video} from "../models/video.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const getVideos = asyncHandler(async (req, res)=>{
  const videos = await Video.find({isPublished:true}).populate({path:'owner', select:'username avatar'})
  return res.status(200).json(new ApiResponse(200, videos, 'Videos fetched'))
})

export { getVideos }
