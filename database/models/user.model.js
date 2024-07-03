import {DataTypes} from "sequelize"
import { postModel } from "./post.model.js"
import sequelize from "../dbConnection.js"
import {commentModel} from "./comment.model.js"
export const userModel = sequelize.define('user',{
    username:{
       type:DataTypes.STRING(100),
       allowNull:false
    },
    email:{
       type:DataTypes.STRING(100),
       allowNull:false,
       unique:true
    },
    password:{
       type:DataTypes.STRING(100),
       allowNull:false
   
    },
    login:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:false
    }
   })

userModel.hasMany(postModel,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
})
postModel.hasMany(commentModel,{
   onDelete:'CASCADE',
    onUpdate:'CASCADE'
})
postModel.belongsTo(userModel)
userModel.hasMany(commentModel,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
})
commentModel.belongsTo(userModel)
commentModel.belongsTo(postModel)