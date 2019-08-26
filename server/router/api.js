const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/user')
const url = 'mongodb://localhost/uno_db';

const jwt = require('jsonwebtoken')

mongoose.connect(url, err => {
    if (err) {
        console.error('error:' + err)
    } else {
        console.log('connected to db')
    }
})

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(401).send('unautorized request')
    } 
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('unautorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
        return res.status(401).send('unautorized request')
    }
    req.userId = payload.subject
    next()
}

router.post('/register', (req, res) => {
    let data = req.body;
    let user = new User(data);
    user.save((err, user) => {
        if(err){
            console.error('error:' + err)
        } else {
            let payload = { subject: user._id}
            let token = jwt.sign(payload, 'secretKey')
            res.status(201).send({token})
        }
    })
})

router.post('/login', (req, res) => {
    let data = req.body;
    User.findOne({username: data.username}, (err, user) => {
        if (err) {
            console.error('error:' + err)
        } else {
            if(!user) {
                res.status(401).send('Username is not found')
            } else {
                if (user.password === data.password) {
                    let payload = { subject: user._id}
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({token})
                } else {
                    res.status(401).send('Wrong password')
                }
            }
        }
    })
})

router.get('/home', verifyToken, (req,res) => {
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
