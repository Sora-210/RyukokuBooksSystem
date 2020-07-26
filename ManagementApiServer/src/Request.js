const express = require('express')
require('date-utils')

const requestRouter = express.Router()
const DB = require('../models/index')
const { CheckAuth } = require('./func/Auth.js')
/*
################################
Request処理
POST /
[AUTH] GET /
[AUTH] GET /:id
[AUTH] DELETE /;id
################################
*/



function CustomError(name,message) {
    this.name = name
    this.message = message
}

const CheckRequest = (object) => {
    let ReturnObject = {}

    if (object.genre === undefined || object.genre === "") {
        return false
    }
    ReturnObject.genre = object.genre

    if (object.content === undefined || object.content === "") {
        return false
    }
    ReturnObject.content = object.content

    return ReturnObject
}

// [POST] /
requestRouter.post('/', async(req, res) => {
    const requestSend = CheckRequest(req.body)
    if (requestRouter) {
        const T = await DB.sequelize.transaction()
        try {
            const request = await DB.Request.create(requestSend, {transaction:T})
            await T.commit()
            return res.status(201).json(request)
        } catch(e) {
            console.debug("Error")
            console.debug(e)
            await T.rollback()
            return res.status(500).json()
        }
    } else {
        return res.status(400).json()
    }
})

//####################################################################
//以下認証が必要
requestRouter.use(CheckAuth)

//(AUTH)[GET] /
requestRouter.get('/', async(req, res) => {
    try {
        const options = {where:{}}
        // ジャンル関連処理
        if (req.query.genre !== undefined && req.query.genre !== "") {
            if (req.query.genre == 1 || req.query.genre == 2) {
                options.where.genre = req.query.genre
            }
        }
        const Count = await DB.Request.count(options)
        // ソート関連処理
        if (req.query.sortRow !== undefined && req.query.sortRow !== "") {
            if (req.query.sortDirection !== undefined && req.query.sortDirection != 1) {
                options.order = [[req.query.sortRow, "DESC"]]
            } else {
                options.order = [[req.query.sortRow, "ASC"]]
            }
        }
        // ページ関連処理
        if (req.query.page !== undefined && req.query.page !== "") {
            options.limit = 20
            options.offset = (req.query.page - 1) * 20
        }
        // 本データの取得
        const DBres = await DB.Request.findAll(options)
        if (DBres.length === 0) {
            throw new CustomError('Nothing')
        }
        res.status(200).json({count:Count,Requests:DBres})
    } catch(e) {
        switch(e.name) {
            case 'Nothing':
                return res.status(404).json({"name":"NotFound","message":""})
        }
        return res.status(500).json()
    }
})

//(AUTH)[GET] /:id
requestRouter.get('/:requestId', async(req, res) => {
    try {
        const DBres = await DB.Request.findAll({where:{id:req.params.requestId}})
        if (DBres.length === 0) {
            throw new CustomError('Nothing')
        }
        return res.status(200).json(DBres[0])
    } catch(e) {
        switch(e.name) {
            case 'Nothing':
                return res.status(404).json({"name":"NotFound","message":""})
        }
        return res.status(500).json()
    }
})

//(AUTH)[DELETE] /:id
requestRouter.delete('/:requestId', async(req, res) => {
    const T = await DB.sequelize.transaction()
    try {
        const DBres = await DB.Request.destroy({where:{id:req.params.requestId},transaction:T})
        if (DBres === 0) {
            throw new CustomError('Nothing')
        }
        await T.commit()
        return res.status(204).json()
    } catch(e) {
        await T.rollback()
        switch(e.name) {
            case 'Nothing':
                return res.status(404).json({"name":"NotFound","message":""})
        }
        return res.status(500).json()
    }
})

module.exports = {
    requestRouter
}