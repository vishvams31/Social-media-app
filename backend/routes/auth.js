// const router = require("express").Router();
const express = require('express')
const authController = require('../controller/authController.js')
// const User = require("../models/User")
// const bcrypt = require("bcrypt")
const authRouter = express.Router();
//REGISTER

authRouter.post("/register",authController.register)
authRouter.post("/login",authController.login)


module.exports = authRouter