const express = require('express')
const router = express.Router()
const { getUser, createUser, loginUser } = require('../controllers/userController')

router.get('/', getUser)
router.post('/', createUser)
router.post('/login', loginUser)

module.exports = router