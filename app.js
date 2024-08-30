const express = require('express')
const mongoose = require("mongoose")
const app = express()
const PORT = 3000

const userRouter = require('./routers/userRouter')
const parcelRouter = require('./routers/parcelRouter')
const authMiddleware = require('./middlewares/authMiddleware')

app.use(express.json())
app.use('/users', userRouter)
app.use('/parcels', authMiddleware, parcelRouter)

app.listen(PORT, async () => {
    try {
        await mongoose.connect('mongodb://rootuser:passworduser@127.0.0.1:27017/express-test?authSource=admin')
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
    console.log(`start on port ${PORT}`)
})