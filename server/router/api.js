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

router.get('/home', (req,res) => {
    let events = [
      {
        "_id": "1",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ]
    res.json({events})
  })  

module.exports = router;
