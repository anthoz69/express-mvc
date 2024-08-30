const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../config/jwt')

const authMiddleware = (req, res, next) => {
    const token = req.headers['Authorization']
    if (!token) {
        res.status(401).json({
            message: 'Unauthentication'
        })
    }
    next()
}

module.exports = authMiddleware