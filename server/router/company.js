const express = require('express');
const router = express.Router();

const Company = require('../models/company')

const cloudinary = require('cloudinary').v2
const cloudinaryConfig = require('../configs/cloudinary')
cloudinary.config(cloudinaryConfig)

verifyToken = require('../functions/vetifyTocken')

router.post('/create', verifyToken, (req, res) => {
    let company = new Company(req.body)
    if(req.user.access === 'admin' || req.user._id == company.user_id) {
        company.save((err, company) => {
            if(err){
                console.error('error:' + err)
            } else {  
                res.status(200).send(company)
            }
        })
    } else {
        res.sendStatus(403)
    }
})

router.post('/change', verifyToken, (req, res) => {
    let company = req.body
    if(req.user.access === 'admin' || req.user._id == company.user_id) {
        Company.findByIdAndUpdate(company._id, company, (err, company) => {
            if(err){
                console.error('error:' + err)
            } else {  
                res.status(200).send()
            }
        })
    } else {
        res.sendStatus(403)
    }
})


router.get('/search/:searchString', (req, res) => {
    Company.find({$text: {$search: req.params.searchString}}).exec((err, companies) => {
        res.status(200).send(companies)
    })
})

router.get('/last_update', (req, res) => {
    Company.find().sort({update_date: -1}).limit(10).exec((err, companies) => {
        if(err){
            console.error('error:' + err)
        } else {  
            res.status(200).send(companies)
        }
    })
})

router.post('/delete_user_companies', (req, res) => {
    Company.deleteMany({user_id: req.body.id},(err, result) => {
        if(err){
            console.error('error:' + err)
        } else { 
            res.sendStatus(204)
        }
    })
})

router.post('/delete', (req, res) => {
    Company.findByIdAndDelete(req.body.id,(err, result) => {
        if(err){
            console.error('error:' + err)
        } else {  
            res.sendStatus(204)
        }
    })
})

router.get('/:company_id', (req, res) => {
    Company.findById(req.params.company_id, (err, company) => {
        if (err) {
            console.error('error:' + err)
        } else {
            if(!company) {
                res.status(404).send('Id is not found')
            } else {
                res.status(200).send(company)
            }
        }
    })
})

router.get('/user_companies/:user_id', (req, res) => {
    Company.find({user_id: req.params.user_id}).select('name goal presently expiration_date').exec((err, companies) => {
        if (err) {
            console.error('error:' + err)
        } else {
            res.status(200).send(companies)
        }
    })
})

router.get('/bonuces/:company_id', (req, res) => {
    Company.findById(req.params.company_id, (err, company) => {
        if (err) {
            console.error('error:' + err)
        } else {
            if(!company) {
                res.status(404).send('Id is not found')
            } else {
                res.status(200).send({
                    bonuces: company.bonuces,
                    background: company.images[0]
                })
            }
        }
    })
})

router.post('/set_support', verifyToken, (req, res) => {
    Company.findById(req.body.company_id, (err, company) => {
        if (err) {
            console.error('error:' + err)
        } else {
            company.presently += +req.body.amount
            company.save()
            res.sendStatus(204)
        }
    })
})

router.post('/delete_img', (req, res) => {
    cloudinary.uploader.destroy(req.body.img_id, (res, err) => {
        console.log(res, err)
    })
})

module.exports = router