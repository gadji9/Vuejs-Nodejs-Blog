"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const tokenMiddleware = function (res, req, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.req.headers);
            const userData = jwt.verify(req.req.headers.authorization, 'password');
            const user = yield User.findOne({ where: { email: userData.email, password: userData.password } });
            if (user) {
                req.req.body.userId = user.id;
                next();
            }
            else {
                req.status(401).send({ msg: 'Non Authorizited' });
            }
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.default = tokenMiddleware;
