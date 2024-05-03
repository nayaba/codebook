const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Welcome to auth')
})

router.get('/signup', (req, res) => {
    res.render('auth/signup.ejs')
})

module.exports = router