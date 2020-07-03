const express = require('express')
require('date-utils')

const requestRouter = express.Router()
const DB = require('../models/index')
/*
################################
Request処理
GET /
GET /:id
POST /
DELETE /;id

：メモ：
エラー処理抜けあり
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


// [GET] /
requestRouter.get('/', async(req, res) => {
    try {
        const DBres = await DB.Request.findAll()
        if (DBres.length === 0) {
            throw new CustomError('Nothing')
        }
        res.status(200).json(DBres)
    } catch(e) {
        switch(e.name) {
            case 'Nothing':
                return res.status(404).json()
        }
        return res.status(500).json()
    }
})

// app.get('/requests', (req, res) => {
//     db.Request.findAll()
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


// [GET] /:id
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
                return res.status(404).json()
        }
        return res.status(500).json()
    }
})

// app.get('/requests/:id', (req, res) => {
//     db.Request.findAll(
//         {
//             where: {
//                 id: req.params.id
//             }
//         }
//     )
//         .then((data) => {
//             if (data.length === 0) {
//                 res.json({
//                     status: "error",
//                     message: "Noting Request"
//                 })
//             } else {
//                 res.json({
//                     status: "success",
//                     message: "Getting Request",
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

// app.post('/requests', (req, res) => {
//     if (requestCheck({"genre":req.body.genre,"content":req.body.content})) {
//         db.Request.create(
//             {
//                 "genre": req.body.genre,
//                 "content": req.body.content
//             }
//         )
//             .then((data) => {
//                 res.json({
//                     status: "success",
//                     message: "Send Request",
//                     data: data
//                 })
//             })
//             .catch((err) => {
//                 res.json({
//                     status: "error",
//                     message: "Unknown error",
//                     data: err
//                 })
//             })
//     } else {
//         res.json({
//             status: "error",
//             message: "Incomplete data"
//         })
//     }
// })


// [DELETE] /:id
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
                return res.status(404).json()
        }
        return res.status(500).json()
    }
})
// app.delete('/requests/:id', (req, res) => {
//     db.Request.destroy({
//         where:{
//             id: req.params.id
//         }
//     })
//         .then((data) => {
//             if (data === 0) {
//                 res.json({
//                     status: "error",
//                     message: "Noting Request"
//                 })
//             } else if (data === 1) {
//                 res.json({
//                     status: "success",
//                     message: "Deleted Request",
//                     data: {
//                         id: req.params.id
//                     }
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

module.exports = requestRouter