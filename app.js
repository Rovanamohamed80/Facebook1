import express from 'express'
import sequelize from './database/dbConnection.js'
import {bootstrap } from "./modules/bootstrap.js"
const app = express()
const port = 3000

sequelize.sync({alter:false})

app.use(express.json())

bootstrap(app)




app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))