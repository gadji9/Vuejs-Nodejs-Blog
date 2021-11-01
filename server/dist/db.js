"use strict";
const mg = require('mongoose');
mg.connect('mongodb+srv://gadjimurad:gm357753@cluster0.huhpc.mongodb.net/newsportal?retryWrites=true&w=majority');
module.exports = mg;
