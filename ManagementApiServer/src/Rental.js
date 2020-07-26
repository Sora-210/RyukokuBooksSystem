const express = require('express')
require('date-utils')

const rentalRouter = express.Router()
const { CheckAuth } = require('./func/Auth.js')
const DB = require('../models/index')
const sequelize = require('sequelize')
const  DBOP = sequelize.Op
/*
################################
Rental処理
[AUTH] GET /
[AUTH] GET /:id
################################
*/

function CustomError(name,message) {
    this.name = name
    this.message = message
}
//#######################################################
//以下認証が必要
rentalRouter.use(CheckAuth)

// (AUTH)[GET] /
rentalRouter.get('/', async(req, res) => {
    try {
        const options = {where:{}}
        
        // uuid関連処理
        if (req.query.uuid !== undefined && req.query.uuid !== "") {
            options.where.uuid = req.query.uuid
        }
        // ステータス関連処理
        if (req.query.status !== undefined && req.query.status !== "") {
            if (req.query.status === "true") {
                options.where.return_day = null
            } else {
                options.where.return_day = { [DBOP.ne]: null}
            }
            
        }
        const Count = await DB.Rental.count(options)

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
        const DBres = await DB.Rental.findAll(options)
        if (DBres.length === 0) {
            throw new CustomError('Nothing')
        }
        return res.status(200).json({count:Count,Rentals:DBres})
    } catch(e) {
        switch(e.name) {
            case 'Nothing':
                return res.status(404).json()
        }
        return res.status(500).json()
    }
})

// (AUTH)[GET] /:rentalId
rentalRouter.get('/:rentalId', async(req, res) => {
    try {
        const DBres = await DB.Rental.findAll({where:{id:req.params.rentalId}})
        if (DBres.length === 0) {
            throw new CustomError('Nothing')
        }
        return res.status(200).json(DBres[0])
    } catch(e) {
        switch(e.name) {
            case 'Nothing':
                return res.status(404).json()
        }
        return res.status(500).json()
    }
})

module.exports = {
    rentalRouter
}