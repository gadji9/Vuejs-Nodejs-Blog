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
const { Users, News } = require('../models/index.ts');
class Controller {
    constructor() {
    }
    Register(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body) {
                try {
                    const user = yield new Users({
                        email: req.body.email,
                        password: req.body.password
                    });
                    // const token = jwt.sign({
                    //     email: req.body.email,
                    //     password: req.body.password
                    // },'password')
                    // res.send(token)
                }
                catch (error) {
                    if (error instanceof Error) {
                        if (error.name == 'SequelizeUniqueConstraintError') {
                            res.status(409).send({ msg: 'Такой email уже зарегистрирован' });
                        }
                        else {
                            res.send({ msg: error.message });
                        }
                    }
                }
            }
        });
    }
}
module.exports = new Controller();
