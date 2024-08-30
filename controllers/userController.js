const User = require('../models/userModel')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

const getUser = async (req, res) => {
    const { page = 1, limit = 12 } = req.body

    try {
        const skipNumber = (page - 1) * limit
        const users = await User.findOne().skip(skipNumber).limit(limit)
        const countUser = await User.countDocuments()

        res.json({
            status: true,
            users,
            countUser,
            totalPage: Math.ceil(countUser / limit)
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({
            name,
            email,
            password: hashPassword
        })
        await user.save()

        res.status(201).json({
            message: 'user create success.',
            user
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

const loginUser = async (req, res) => {
    const {email,password} = req.body

    try {
        const user = await User.findOne({
            email
        })

        if (!user) {
            return res.status(401).json({
                message: 'Credential invalid'
            })
        }

        const compare = await bcrypt.compare(password, user.password)
        
        if (!compare) {
            return res.status(401).json({
                message: 'Credential invalid'
            })
        }

        const token = jwt.sign({
            name: user.name,
            email: user.email
        }, jwtSecret)
        

        res.status(200).json({
            message: 'Login successful',
            token: token
        })
    } catch (err) {
        console.error(err);
        
        res.status(500).json({
            message: 'interal error'
        })
    }
}

module.exports = {
    getUser,
    createUser,
    loginUser
}