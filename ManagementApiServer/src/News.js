const express = require('express')

const newsRouter = express.Router()
const { CheckAuth } = require('./func/Auth.js')
const DB = require('../models/index')

/*
################################
News処理
GET /
[AUTH] POST /:id
################################
*/
function CustomError(name,message) {
    this.name = name
    this.message = message
}

newsRouter.get('/', async (req,res) => {
    try {
        const options = {}
        if (req.query.limit !== undefined && req.query.limit !== "" && req.query.limit >= 1) {
            options.limit = Number(req.query.limit)
        }
        if (req.query.page !== undefined && req.query.page !== "" && req.query.page >= 1) {
            const limit = (req.query.limit !== undefined && req.query.limit !== "" && req.query.limit >= 1) ? req.query.limit : 0;
            options.offset = limit * (req.query.page - 1)
        }
        const DBResCount = await DB.News.count(options)
        const DBResNews = await DB.News.findAll(options)
        return res.status(200).json({"count":DBResCount,"News":DBResNews})
    } catch(e) {
        console.log(e)
        switch(e.name) {
            case 'Nothing':
                return res.status(404).json()
            default:
                return res.status(500).json()
        }
    }
})

//#######################################################
//以下認証が必要
newsRouter.use(CheckAuth)

newsRouter.post('/', async (req,res) => {
    try {
        if (req.body.content === "") {
            throw new CustomError('NotEnoughData')
        }
        const DBres = await DB.News.create({content:req.body.content})
        res.status(201).json({News:DBres})
    } catch(e) {
        console.log(e)
        switch(e.name) {
            case 'NotEnoughData':
                return res.status(400).json({message:"NotEnoughData"})
            default:
                return res.status(500).json({message:"UndefinedError"})
        }
    }
})

module.exports = {
    newsRouter
}