import { Router } from "express"
import {addComment,deleteComment,getComment,updateComment} from "./comment.controller.js"
const commentRouter = Router()
commentRouter.post('/addcomment',addComment)
commentRouter.get('/getcomment',getComment)
commentRouter.patch('/:id',updateComment)
commentRouter.delete('/:id',deleteComment)

  
export default commentRouter