const jwt = require('jsonwebtoken')
import {NextFunction, Response, Request} from 'express'
import {Users, News, UserInterface, NewsInterface} from '../models/index'
import {CallbackError} from 'mongoose'

class Controller {
    async Register(req:Request,res:Response){
        if(req.body){
            try {
                
                const newUser = new Users({
                email: req.body.email,
                password: req.body.password
            })
                newUser.save((callerror:any)=>{
                    if(callerror.errors.email.kind=='unique'){
                        res.send({result: 'error', msg: "Пользователь с таким email уже есть"})
                    }

                })
            } catch (error) {
                // if(error instanceof Error){
                //     console.log(error)
                //     if(error.name=='SequelizeUniqueConstraintError'){
                //         res.status(409).send({msg: 'Такой email уже зарегистрирован'})
                //     }
                //     else{
                //         res.send({msg: error.message})
                //     }
                }
            }
            
        }

    
    async Auth(req:Request, res:Response){
        if(req.body){
            try {
              const query = Users.findOne({email:req.body.email, password: req.body.password})
              const user = await query.exec()
                if(user){
                    const token = jwt.sign({
                        email: user.email,
                        password: user.password
                    },'password')
                    res.send({result: 'success', data: token})
                }
                else{
                    res.send({result: 'error',msg: 'Неправильный email или пароль'})
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    async blogCreate(req:Request,res:Response){
        try {
            if(req.body.text){
                const user = await Users.findOne({_id: req.body.userId})
                if(user){
                    await News.create({text: req.body.text, userId: user._id})
                    res.status(200).send({result: 'success', msg: 'Блог успешно создан'})
                }
              }
        } catch (error) {
            res.status(413).send(error)
        }
       
    }
    async blogGet(req:Request,res:Response){
        const blogs = await News.find().populate({
            path: 'userId',
            select: 'email'
        })
        const reblogs = JSON.parse(JSON.stringify(blogs))
        reblogs.forEach((blog:NewsInterface)=>{
            if(blog.userId._id == req.body.userId.toString().trim()){
                blog.own=true
            }
        })
        res.status(200).send(reblogs.reverse())
    }
    async patchNews(req:Request, res:Response){
        const blog = await News.findOne({_id: req.body.id})
        News.updateOne({_id: req.body.id}, {text: req.body.text}, (err:Error)=>{
            if(err){
                res.send({result: "error", msg: "Неизвестная ошибка"})
            }else{
        res.send({result: "success", msg: "Блог успешно изменен"})

            }
        })
        
    }
    async blogFindById(req: Request, res:Response){
        const blogs = await News.find({_id: req.body.id}).populate({
            path: 'userId',
            select: 'email'
        })
        
        if(blogs){
            const reblogs = JSON.parse(JSON.stringify(blogs))
            reblogs.forEach((blog:NewsInterface)=>{
                if(blog.userId._id == req.body.userId.toString().trim()){
                    blog.own=true
                    console.log(blog)
                }
            })
            res.send({result: "success", msg: "Успешно найден", blog: reblogs})
            console.log('sended ' +  blogs)
        }else{
            res.send({result: "error", msg: "Не найден"})
        }
    }
    async DeleteNews(req: Request, res:Response){
        try{
            const doc = await News.deleteOne({_id: req.body.id})
             res.send({result: "succes", msg: "Новость удалена"})
        }catch(e){
            res.send({result: "error", msg: e})
        }

    }
}

export default new Controller()