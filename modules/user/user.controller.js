import { userModel } from "../../database/models/user.model.js"
import { postModel } from "../../database/models/post.model.js";
import { commentModel } from "../../database/models/comment.model.js"
import bcrypt from "bcrypt"

const addUser = async(req,res)=>{
   const { username,email,password} =req.body;
   let hashedPass = bcrypt.hashSync(password, 8)
   const user = await userModel.findOrCreate({
     where:{
        username,email
     },
     defaults: {
       password: hashedPass
     }
   })
   if(!user[1]){
    return res.status(409).json({ message: "User already exists" });
   }
   
   return res.status(201).json({message: "User created successfully",user:user[0]})
  }
const loginUser = async(req,res)=>{
    const { email,password} =req.body;
    const user = await userModel.findOne({
      where:{
        email
      }
    })
    if(!user){
     return res.status(409).json({ message: "User is not found" });
    }
    const validPass = bcrypt.compareSync(password,user.password)
    if(!validPass){
    return res.status(201).json({message: "invalid password"})}
    const loginUser = await user.update({login:true});
    return res.status(201).json({message: "user login successfully",user:loginUser})
   }

const logoutUser = async (req, res) => {
    const { id } = req.params;
      const user = await userModel.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "User is not found" });
      }
      const loginUser = await user.update(
        { login: false },
        {where: {id}});
      return res.status(200).json({ message: "Logout successful" ,user:loginUser});
    };
  

    const getspecificuserWithspecificPost = async (req, res) => {
      const { userId, postId } = req.params;
        const user = await userModel.findByPk(userId, {
          include: [
            {
              model: postModel,
              where: { id: postId }, // Filter post by ID
              include: {
                model: commentModel, // Include comments within the post
              },
            },
          ],
        });
    
        if (!user) {
          return res.status(404).json({ message: 'User or post not found' });
        }
    
        return res.status(200).json({ user });
    };

  const getusersWithall = async(req,res)=>{
      const {id} = req.params
      let user = await  userModel.findOne({
          include:{
              model:postModel,include:{
                  model:commentModel
              }
          },where: {id} 
      });
         if (user) {
          return res.status(200).json({ message: "successfully",user});
        }else{
        return res.status(404).json({ message: "user is not found" });}
     }
   
export {

    addUser,
    loginUser,
    logoutUser,
    getspecificuserWithspecificPost,
    getusersWithall
}





















// const addUser = async (req, res) => {
//   const { username, email, password } = req.body;
//     const hashedPass = bcrypt.hashSync(password, 8);
//     const [user, created] = await userModel.findOrCreate({
//       where: {
//         username,email
//       },
//       defaults: {
//         password: hashedPass
//       }
//     });
//     if (!created) {
//       return res.status(409).json({ message: "User already exists" });
//     }
//     return res.status(201).json({ message: "User created successfully", user });
// };



//    const logoutUser = async(req,res)=>{
//     const {id} =req.query;
//     const loginUser = await userModel.update(
//       {login:false},
//       {where: {id}}
//     )
//     return res.status(201).json({message: "user logout successfully",user:loginUser})
   
//    }  