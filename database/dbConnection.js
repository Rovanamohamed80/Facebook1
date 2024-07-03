
import {Sequelize,DataTypes} from "sequelize"
const sequelize = new Sequelize('mysql://uy4a9edn2l2u2uv2:9G4a4PaBZITIGV9Jq0zU@bdqwkr1oepekd9bawgk2-mysql.services.clever-cloud.com:3306/bdqwkr1oepekd9bawgk2')
sequelize.authenticate().then(()=>{
    console.log('Connection has been established successfully.');

}).catch((err)=>{
    console.error('Unable to connect to the database:', error);

})

export default sequelize
