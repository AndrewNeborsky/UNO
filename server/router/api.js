const config = require('../configs/db')

const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'))
router.use('/profile', require('./profile'))
router.use('/company', require('./company'))

const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connect(config.url, { useNewUrlParser: true }, err => {
    if (err) {
        console.error('error:' + err)
    } else {
        console.log('connected to db')
    }
})

module.exports = router;
