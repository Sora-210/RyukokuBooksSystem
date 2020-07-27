require('date-utils')
const { Router } = require('express')
const { SHA256, enc } = require('crypto-js')
const jwt = require('jsonwebtoken');
const uuid = require('uuid')
const DB = require("../models/index")

const fs = require('fs')
const path = require('path')
const KEY = fs.readFileSync(path.resolve(__dirname, '../config/api_rsa'))

const loginRouter = Router()
/*
################################
Login処理
GET /
POST /
POST /refresh
*/
// 認証トークンの有効時間(秒)
const ExpirationTime = 3600
/*
################################
*/
function generateToken() {
    const hash = SHA256(uuid.v4())
    return hash.toString(enc.Base64)
}

function CustomError(name) {
    this.name = name
}

function GetExpData(expTime) {
    const date = new Date()
    return date.addSeconds(expTime)
}

// [GET] /
loginRouter.get('/', (req, res) => {
    DB.User.create({"name":"sora","password_hash":"pass"})
})

// [POST] /
loginRouter.post('/', async (req, res) => {
    try {
        const UserData = await DB.User.findAll({ where: { name: req.body.name } })
        if (UserData.length === 0) {
            console.log(1)
            throw new CustomError("NoUser")
        }
        if (req.body.password !== UserData[0].password_hash) {
            console.log(2)
            throw new CustomError("NotMatchPassword",)
        }
        console.log(3)
        const option = {
            algorithm: "HS256",
            // expiresIn: ExpirationTime * 100
        }
        const token = jwt.sign({"UserData":UserData}, KEY, option);
        console.log(token)
        res.status(200).json({"token":token})
    } catch (e) {
        switch(e.name) {
            // Userの存在チェックを防ぐために不認可で送る?
            case "NoUser":
                return res.status(401).json({message:"Unauthorized"})
            case "NotMatchPassword":
                return res.status(401).json({message:"Unauthorized"})
        }
        console.log(e)
        return res.status(500).json({message:e})
    }
})

// [POST] /refresh
loginRouter.post('/refresh',(req, res) => {
    
})

module.exports = {
    loginRouter
}