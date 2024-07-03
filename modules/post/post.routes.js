import { Router } from "express"
import {getPosts,addpost,updatePost,deletePost, getspecificPosts,getspecificPostWithAuthor} from "./post.controller.js"
const postRouter = Router()
postRouter.get('/getpost',getPosts)
postRouter.post('/addpost',addpost)
postRouter.put('/updatepost/:id',updatePost)
postRouter.delete('/deletepost/:id',deletePost) 
postRouter.get('/:id',getspecificPosts) 
postRouter.get('/getpostwithautor/:id',getspecificPostWithAuthor) 

  
export default postRouter