const express = require('express');
const router = express.Router();

const User = require('../models/user')

verifyToken = require('../functions/vetifyTocken')

router.post('/change', verifyToken, (req, res) => {
    let user = req.body
    if(req.user.access === 'admin' || req.user._id == user._id) {
        User.findByIdAndUpdate(user._id, user, (err, user) => {
            if(err){
                console.error('error:' + err)
            } else {  
                res.status(200).send(user)
            }
        })
    } else {
        res.sendStatus(403)
    }
})

router.post('/pay_history/add', verifyToken, (req, res) => {
    let pay_history = req.body.pay_history
    User.findById(req.body.user_id, (err, user) => {
        if(err){
            console.error('error:' + err)
        } else {  
            user.pay_history.push(pay_history)
            user.save()
        }
    })
})

router.post('/pay_history/delete', verifyToken, (req, res) => {
    User.findById(req.body.user_id, (err, user) => {
        if(err){
            console.error('error:' + err)
        } else {  
            let pay_history = req.body.pay_history_list
            for (let i = 0; i < pay_history.length; i++) {
                let index = user.pay_history.findIndex(x => x._id == pay_history[i])
                if(~index) {
                    user.pay_history.splice(index, 1)
                }
            }
            user.save()
            res.sendStatus(204)
        }
    })
})

router.get('/get_all', verifyToken, (req, res) => {
    if(req.user.access === 'admin') {
        User.find().select('name email access provider isBlock').exec((err, users) => {
            if(err){
                console.error('error:' + err)
            } else {  
                res.status(200).send(users)
            }
        })
    } else {
        res.sendStatus(403)
    }
})

router.get('/:id', (req, res) => {
    User.findById(req.params.id).select('name email profile_img background about pay_history').exec((err, user) => {
        if (err) {
            console.error('error:' + err)
        } else {
            if(!user) {
                res.status(404).send('Id is not found')
            } else { 
                res.status(200).send(user)
            }
        }
    })
})

router.post('/delete', verifyToken, (req, res) => {
    User.findByIdAndDelete(req.body.id, (err, result) => {
        if(err){
            console.error('error:' + err)
        } else {  
            res.sendStatus(204)
        }
    })
})

router.post('/block', verifyToken, (req, res) => {
    User.findById(req.body.id, (err, user) => {
        if(err){
            console.error('error:' + err)
        } else {  
            user.isBlock = true
            user.save()
            res.stsendStatus(204)
        }
    })
})

router.post('/unlock', verifyToken, (req, res) => {
    User.findById(req.body.id, (err, user) => {
        if(err){
            console.error('error:' + err)
        } else {  
            user.isBlock = false
            user.save()
            res.sendStatus(204)
        }
    })
})

router.post('/toggle_access', verifyToken, (req, res) => {
    User.findById(req.body.id, (err, user) => {
        if(err){
            console.error('error:' + err)
        } else {
            user.access = user.access === 'user'?'admin': 'user'
            user.save()
            res.sendStatus(204)
        }
    })
})

module.exports = router
