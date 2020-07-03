const express = require('express')
require('date-utils')

const rentalRouter = express.Router()
const DB = require('../models/index')
/*
################################
Rental処理
GET /
GET /:id

：メモ：
エラー処理抜けあり
################################
*/

function CustomError(name,message) {
    this.name = name
    this.message = message
}

// [GET] /
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

// app.get('/rentals', (req,res) => {
//     db.Rental.findAll()
//         .then((data) => {
//             if (data.length === 0) {
//                 res.json({
//                     status: "error",
//                     message: "Noting Request"
//                 })
//             } else {
//                 res.json({
//                     status: "success",
//                     message: "Getting Requests",
//                     data: data
//                 })
//             }
//         })
//         .catch((err) => {
//             res.json({
//                 status: "error",
//                 message: "Unknown error",
//                 data: err
//             })
//         })
// })

// [GET] /:rentalId
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

// app.get('/rentals/:uuid', (req,res) => {

// })
module.exports = rentalRouter