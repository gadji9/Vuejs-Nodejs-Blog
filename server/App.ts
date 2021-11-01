import express from 'express'
const app = express()
const path = require('path')
const seq = require('./db.ts')
import router from './routes/index'
import cors from 'cors'
import bp from 'body-parser'


app.use(bp.urlencoded({
    extended: true
  }))
app.use(bp.json())
app.use(cors())
app.use('/api', router)


app.listen(3000,()=>{
    console.log('started')
})