import { postModel } from "../../database/models/post.model.js"
import { userModel } from "../../database/models/user.model.js"
import { commentModel } from "../../database/models/comment.model.js"
const getPosts = async(req,res)=>{
    let posts = await  postModel.findAll()
       res.json({message:"success",allposts:posts})
   }
   const getspecificPosts = async(req,res)=>{
    const {id} = req.params
    let post = await  postModel.findOne({
        include:{
            model:userModel,
            model:commentModel
        },where: { id} 
    });
       if (post) {
        return res.status(200).json({ message: "successfully",post});
      }else{
      return res.status(404).json({ message: "Post is not found" });}
   }

   const getspecificPostWithAuthor = async(req,res)=>{
    const {id} = req.params
    let post = await  postModel.findOne({
        include:{
            model:userModel,
        },where: { id} 
    });
       if (post) {
        return res.status(200).json({ message: "successfully",post});
      }else{
      return res.status(404).json({ message: "Post is not found" });}
   }
  
   const addpost = async(req,res)=>{
    const { title,content,userId} =req.body;
    const user = await userModel.findOne({
      where:{
         id:userId,login:true
      }
    })
    if(!user){
     return res.status(409).json({ message: "user is not logged in or created" });
    }
    const post = await postModel.create({title,content,userId})
    return res.status(201).json({message: "post created successfully",post})
   }   


const updatePost = async (req, res) => {
    const{id}=req.params;
    const {title, content, userId } = req.body; 
      const [created] = await postModel.update(
        { title, content },
        { where: { id, userId } },
        { returning: true } 
      );
      if (created) {
        return res.status(200).json({ message: "Post updated successfully", post: created });
        
      }
      return res.status(404).json({ message: "Post not found" });
    } ;
 
   
const deletePost = async (req,res)=>{
    const{id}=req.params;
    const {userId } = req.body; 
      const created = await postModel.destroy(
        { where: { id, userId } },
        { returning: false }  
      );
      if (created) {
        return res.status(200).json({ message: "Post deleted successfully"});
        
      }
      return res.status(404).json({ message: "Post not found" });
    } ;

export { 
    getPosts,addpost,updatePost,deletePost,getspecificPosts,getspecificPostWithAuthor
}