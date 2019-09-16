const config = require('../configs/db')
const jwt = require('jsonwebtoken');

module.exports = function verifyToken(req, res, next) {
    let token = req.headers.authorization.split(' ')[1]
    try {
        let payload = jwt.verify(token, config.secretKey)
        req.user = payload
        next()
    } catch(err) {
        return res.status(401).send(err)
    }
}