const express = require('express');
const router = express.Router();

const User = require('../models/user')

verifyToken = require('../functions/vetifyTocken')

router.post('/change', verifyToken, (req, res) => {
    let user = req.body
    User.findByIdAndUpdate(user._id, user, (err, company) => {
        if(err){
            console.error('error:' + err)
        } else {  
            res.status(200).send(user)
        }
    })
})

router.get('/:id', (req, res) => {
    User.findById(req.params.id).select('name email profile_img background about').exec((err, user) => {
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

module.exports = router
