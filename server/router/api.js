const config = require('../configs/db')

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/user');
mongoose.set('useCreateIndex', true);

const jwt = require('jsonwebtoken');
const bCript = require('bcrypt')

const password = require('passport')
const initPassport = require('../passport/init')
initPassport(password)


mongoose.connect(config.url, { useNewUrlParser: true }, err => {
    if (err) {
        console.error('error:' + err)
    } else {
        console.log('connected to db')
    }
})

function verifyToken(req, res, next) {
    let token = req.headers.authorization.split(' ')[1]
    try {
        let payload = jwt.verify(token, config.secretKey)
        req.user_id = payload.sub
        next()
    } catch(err) {
        return res.status(401).send('unautorized')
    }
}

function generateToken(user) {
    let payload = { sub: user._id}
    return jwt.sign(payload, config.secretKey)
}

router.post('/register', (req, res) => {
    let user = new User(req.body);
    bCript.hash(user.password, 10, (err, hash) => {
        user.password = hash
        user.save((err, user) => {
            if(err){
                console.error('error:' + err)
            } else {
                res.status(201).json({
                    token: generateToken(user),
                    id: user._id
                })
            }
        })
    })
})

router.post('/login', (req, res) => {
    let data = req.body;
    User.findOne({email: data.email, provider: 'local'}, (err, user) => {
        if (err) {
            console.error('error:' + err)
        } else {
            if(!user) {
                res.status(401).send('Email is not found')
            } else {
                bCript.compare(data.password, user.password, (err, same) => {
                    if (same === true) {
                        res.status(201).json({
                            token: generateToken(user),
                            id: user._id
                        })
                    } else {
                        res.status(401).send('Wrong password')
                    }
                })
            }
        }
    })
})

router.post('/socialLogin', (req, res) => {
    let id = req.body.id
    User.findOne({_id: id}, (err, user) => {
        if (err) {
            console.error('error:' + err)
        } else {
            if(!user) {
                res.status(401).send('Username is not found')
            } else {
                res.status(201).json({
                    token: generateToken(user),
                    id: id
                })
            }
        }
    })
}) 

router.get('/login/facebook', password.authenticate('facebook', { scope : ['email'] }))

router.get('/login/facebook/callback', password.authenticate('facebook'), (req, res) => {
    res.redirect('http://localhost:4200/auth?id=' + req.user._id)
})

router.get('/login/twitter', password.authenticate('twitter'))

router.get('/login/twitter/callback', password.authenticate('twitter'), (req, res) => {
    res.redirect('http://localhost:4200/auth?id=' + req.user._id)
})

router.post('/profile', (req, res) => {
    User.findOne({_id: req.body.id}, (err, user) => {
        if (err) {
            console.error('error:' + err)
        } else {
            if(!user) {
                res.status(401).send('Id is not found')
            } else { 
                res.status(201).json({
                    name: user.name,
                    email: user.email
                })
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
