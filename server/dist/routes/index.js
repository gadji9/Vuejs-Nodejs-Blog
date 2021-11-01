"use strict";
const { RequestHandler, Router } = require('express');
const routerc = Router();
const controller = require('../controllers/index.ts');
const tokenMiddleware = require('../middlware/token.ts');
router.post('/auth', controller.Auth);
router.post('/register', controller.Register);
router.post('/blogCreate', tokenMiddleware, controller.blogCreate);
router.get('/blogGet', tokenMiddleware, controller.blogGet),
    router.post('/blogPatch', tokenMiddleware, controller.blogPatch);
module.exports = routerc;
