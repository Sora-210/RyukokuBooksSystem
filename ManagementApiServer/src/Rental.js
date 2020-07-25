const express = require('express')
require('date-utils')

const rentalRouter = express.Router()
const { CheckAuth } = require('./func/Auth.js')
const DB = require('../models/index')
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
        const DBres = await DB.Rental.findAll()
        if (DBres.length === 0) {
            throw new CustomError('Nothing')
        }
        return res.status(200).json(DBres)
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