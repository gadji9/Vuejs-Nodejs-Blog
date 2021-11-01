"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.News = exports.Users = void 0;
const mongoose_1 = require("mongoose");
const mg = require('../db.ts');
const usersScheme = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    newsIds: [
        { type: mongoose_1.Schema.Types.ObjectId, ref: 'News' }
    ]
});
const newsScheme = new mongoose_1.Schema({
    text: {
        type: String,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Users'
    }
});
const Users = mg.model('Users', usersScheme);
exports.Users = Users;
const News = mg.model('News', newsScheme);
exports.News = News;
