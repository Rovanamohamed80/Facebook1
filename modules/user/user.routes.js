import { Router } from "express"
import {addUser , loginUser, logoutUser,getspecificuserWithspecificPost,getusersWithall} from "./user.controller.js"

const userRouter = Router()
userRouter.post('/signUp',addUser)
userRouter.post('/signin',loginUser)
userRouter.patch('/logout/:id',logoutUser)
userRouter.get('/:id',getusersWithall)
userRouter.get('/:userId/posts/:postId',getspecificuserWithspecificPost)



export default userRouter