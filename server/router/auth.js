const config = require('../configs/db')

const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bCript = require('bcrypt');

const password = require('passport')
const initPassport = require('../passport/init')
initPassport(password)

const User = require('../models/user')
verifyToken = require('../functions/vetifyTocken')

function generateToken(user) {
    let payload = { 
        _id: user._id,
        name: user.name,
        profile_img: user.profile_img,
        access: user.access
    }
    return jwt.sign(payload, config.secretKey)
}

router.post('/register', (req, res) => {
    User.findOne({email: req.body.email, provider: 'local'}, (err, user) => {
        if (err) {
            console.error('error:' + err)
        } else {
            if(!user) {
                let user = new User(req.body);
                bCript.hash(user.password, 10, (err, hash) => {
                    user.password = hash
                    user.save((err, user) => {
                        if(err){
                            console.error('error:' + err)
                        } else {
                            res.status(201).send({
                                token: generateToken(user)
                            })
                        }
                    })
                })
            } else {
                res.status(401).send('This user already exists')
            }
        }
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
                        res.status(201).send({
                            token: generateToken(user)
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
    User.findById(req.body.id, (err, user) => {
        if (err) {
            console.error('error:' + err)
        } else {
            if(!user) {
                res.status(401).send('User is not found')
            } else {
                res.status(201).send({
                    token: generateToken(user)
                })
            }
        }
    })
})

router.get('/user', verifyToken, (req, res) => {
    let user = req.user
    res.status(200).send(user)
})

router.get('/facebook', password.authenticate('facebook', { scope : ['email'] }))

router.get('/facebook/callback', password.authenticate('facebook'), (req, res) => {
    res.redirect('http://localhost:4200/auth?id=' + req.user._id)
})

router.get('/twitter', password.authenticate('twitter'))

router.get('/twitter/callback', password.authenticate('twitter'), (req, res) => {
    res.redirect('http://localhost:4200/auth?id=' + req.user._id)
})

module.exports = router