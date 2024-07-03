import { postModel } from "../../database/models/post.model.js"
import { userModel } from "../../database/models/user.model.js"
import { commentModel } from "../../database/models/comment.model.js"

const addComment = async(req,res)=>{
    const { content,userId,postId} =req.body;
    const user = await userModel.findOne({
      where:{
         id:userId,login:true
      }
    })
    if(!user){
     return res.status(409).json({ message: "user is not logged in or created" });
    }
    const comment = await commentModel.create({content,userId,postId})
    return res.status(201).json({message: "post created successfully",comment})
   }   

   const getComment = async(req,res)=>{
    let comments = await  commentModel.findAll()
       res.json({message:"success",comments})
   }
  
   const updateComment = async (req, res) => {
    const{id}=req.params;
    const {content, userId} = req.body; 
      const [created] = await commentModel.update(
        { content },
        { where: { id, userId } },
        { returning: true } 
      );
      if (created) {
        return res.status(200).json({ message: "Post updated successfully", comment: created });    
      }
      return res.status(404).json({ message: "Post not found" });
    } ;

    const deleteComment = async (req, res) => {
        const{id}=req.params;
        const {userId} = req.body; 
          const created = await commentModel.destroy(
            { where: { id, userId } },
            { returning: true } 
          );
          if (created) {
            return res.status(200).json({ message: "comment deleted successfully"});    
          }
          return res.status(404).json({ message: "comment is not found" });
        } ;
      

export { 
    addComment,getComment,updateComment,deleteComment
}