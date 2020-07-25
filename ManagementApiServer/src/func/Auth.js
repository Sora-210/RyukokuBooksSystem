const express = require('express')
const jwt = require('jsonwebtoken');
const fs = require('fs')
const path = require('path')
const KEY = fs.readFileSync(path.resolve(__dirname, '../../config/api_rsa'))

const CheckAuth = express.Router()

CheckAuth.use(async (req, res, next) => {
    const token = req.headers['token'] || ""
    console.log(req.headers)
    console.log("token:" + token)
    try {
        const decode = jwt.verify(token, KEY, { algorithms: ["HS256"] })
        console.log(decode)
        next()
    } catch (e) {
        res.status(403).json()
    }
})

module.exports = {
    CheckAuth
}