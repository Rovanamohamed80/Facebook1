import express from 'express'
import sequelize from './database/dbConnection.js'
import {bootstrap } from "./modules/bootstrap.js"
import cors from "cors"
const app = express()
const port = process.env.PORT || 3000

sequelize.sync({alter:false})

app.use(express.json())
app.use(cors())
bootstrap(app)




app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))