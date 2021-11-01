import {Users, UserInterface} from '../models/index'
import {RequestHandler} from 'express'
const jwt = require('jsonwebtoken')
const tokenMiddleware:RequestHandler = async function (res,req,next){
    try {
        console.log(req.req.headers)
        const userData = jwt.verify(req.req.headers.authorization, 'password')
        const query = Users.findOne({email:userData.email, password: userData.password})
        const user =await query.exec()
        if(user){
            req.req.body.userId = user._id
            next()
        }
        else{
            req.status(401).send({msg: 'Non Authorizited'})
        }
    } catch (error) {
     console.log(error)   
    }

}

export default tokenMiddleware