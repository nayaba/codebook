const express = require("express")
const router = express.Router()
const User = require("../models/user")
const bcrypt = require('bcrypt')

router.get("/", (req, res) => {
  res.send("Welcome to auth")
})

router.get("/signup", (req, res) => {
  res.render("auth/signup.ejs")
})

router.post("/signup", async (req, res) => {
  let userExists = await User.findOne({ username: req.body.username })
  console.log('userExists: ', userExists)
  if (userExists) {
    return res.send("Username already taken.")
  } else {
    if (req.body.password !== req.body.confirmPassword) {
      return res.send("Password and Confirm Password must match!")
    } else {
      const hashedPassword = bcrypt.hashSync(req.body.password, 10)
      req.body.password = hashedPassword

      let newUser = await User.create(req.body)
      console.log(newUser)
      res.send(`Thanks for signing up ${newUser.username}`)
    }
  }
})

module.exports = router
