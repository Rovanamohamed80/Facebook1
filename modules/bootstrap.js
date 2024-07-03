import userRouter from './user/user.routes.js'
import postRouter from './post/post.routes.js'
import commentRouter from './comment/comment.routes.js'
export const bootstrap=(app)=>{
    app.use('/users',userRouter)
    app.use('/posts',postRouter)
    app.use('/comments',commentRouter)
}