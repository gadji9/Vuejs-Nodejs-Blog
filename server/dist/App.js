"use strict";
const express = require('express');
const app = express();
const path = require('path');
const seq = require('./db.ts');
const router = require('./routes/index.ts');
const cors = require('cors');
const bp = require('body-parser');
app.use(bp.urlencoded({
    extended: true
}));
app.use(bp.json());
app.use(cors());
app.use('/api', router);
app.listen(3000, () => {
    console.log('started');
});
