const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')

const port = process.env.PORT ? process.env.PORT : '3000'

// IMPORT CONTROLLERS
const authController = require('./controllers/auth')

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})

app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(morgan('dev'))

// ROUTES
app.get('/', async (req, res) => {
    res.render('index.ejs')
})

app.use('/auth', authController)

app.listen(port, () => {
    console.log(`The exress app is ready on port ${port}!`)
})