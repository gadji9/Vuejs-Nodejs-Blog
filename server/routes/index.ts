import {RequestHandler, Router} from 'express'
const routerc = Router()
import controller from '../controllers/index'
import tokenMiddleware from '../middlware/token'

routerc.post('/auth', controller.Auth)
routerc.post('/register', controller.Register)
routerc.post('/createNews',tokenMiddleware, controller.blogCreate)
routerc.get('/getNews',tokenMiddleware, controller.blogGet)
routerc.post('/find',tokenMiddleware, controller.blogFindById)
routerc.post('/deleteNews',tokenMiddleware, controller.DeleteNews)
routerc.post('/patchNews',tokenMiddleware, controller.patchNews)

export default routerc