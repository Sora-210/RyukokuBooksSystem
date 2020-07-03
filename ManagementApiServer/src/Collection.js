const express = require('express')
const uuid = require('uuid')
require('date-utils')

const collectionsRouter = express.Router()
const DB = require('../models/index')
/*
################################
Collection処理
GET /
GET /:uuid
GET /isbn/:idbn
POST /
PATCH /:uuid/rental
PATCH /:uuid/return
DELETE /:uuid

：メモ：
post / 製作途中　エラー未処理
patch /:uuid/rental 製作途中　エラー未処理
patch /:uuid/return 製作途中　エラー未処理
################################
*/



function CustomError(name,message) {
    this.name = name
    this.message = message
}

const GetToday = () => {
    let DateNow = new Date();
    return DateNow.toFormat('YYYY-MM-DD')
}

const CheckCollection = (object) => {
    let ReturnObject = {}

    let DateNow = new Date();
    ReturnObject.registrationData = DateNow.toFormat('YYYY-MM-DD')
    ReturnObject.uuid = uuid.v4()
    ReturnObject.rentalStatus = true

    if (object.isbn === undefined || object.isbn === "") {
        return false
    }
    ReturnObject.isbn = object.isbn
    
    if (object.ncd === undefined || object.ncd === "") {
        return false
    }
    ReturnObject.ncd = object.ncd

    if (object.note !== undefined || object.note !== "") {
        ReturnObject.note = object.note
    }

    return ReturnObject
}

const CheckRental = (object,collectionUuid) => {
    let ReturnObject = {}

    let DateNow = new Date();
    ReturnObject.year = DateNow.toFormat('YYYY')
    ReturnObject.start_day = DateNow.toFormat('YYYY-MM-DD')

    ReturnObject.uuid = collectionUuid

    if (object.grade === undefined || object.grade === "") {
        return false
    }
    ReturnObject.grade = object.grade

    if (object.class === undefined || object.class === "") {
        return false
    }
    ReturnObject.class = object.class

    if (object.number === undefined || object.number === "") {
        console.log(5)
        return false
    }
    ReturnObject.number = object.number
    // if (object.name !== undefined || object.name !== "") {
    //     return false
    // }
    ReturnObject.name = object.name
    console.debug(ReturnObject)
    return ReturnObject
}

// [GET] /collections/
collectionsRouter.get('/', async(req, res) => {
    console.debug(1)
    try {
        const DBres = await DB.Collection.findAll({})
            .then((DBres) => {
                return DBres
            })
            .catch((err) => {
                throw new CustomError('Unknown', err)
            })
        if (DBres.length !== 0) {
            return res.status(200).json(DBres)
        } else {
            throw new CustomError('Nothing', DBres)
        }
    } catch(e) {
        console.debug("Error:" + e.name)
        console.debug(e)
        switch(e.name){
            case 'Nothing':
                return res.status(404).json()
            case 'Unknown':
                return res.status(500).json(e.message)
        }
    }
})

// app.get('/collections', (req, res) => {
//     db.Collection.findAll({})
//         .then((data) => {
//             if (data.length === 0) {
//                 res.json({
//                     status: "error",
//                     message: "Noting Collectoin",
//                 })
//             } else {
//                 res.json({
//                     status: "success",
//                     message: "Getting Collection",
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


// [GET] /collections/:uuid
collectionsRouter.get('/:uuid', async(req, res) => {
    console.debug(2)
    try {
        const DBres = await DB.Collection.findAll({
            where:{
                uuid: req.params.uuid
            }
        })
            .then((DBres) => {
                console.debug(21)
                return DBres
            })
            .catch((err) => {
                console.debug(22)
                throw new CustomError('Unknown', err)
            })
        if (DBres.length !== 0) {
            return res.status(200).json(DBres)
        } else {
            throw new CustomError('Nothing', DBres)
        }
    } catch(e) {
        console.debug("Error:" + e.name)
        console.debug(e)
        switch(e.name){
            case 'Nothing':
                return res.status(404).json()
            case 'Unknown':
                return res.status(500).json(e.message)
        }
    }
})

// app.get('/collection/:uuid', (req, res) => {
//     db.Collection.findAll({
//         where: {
//             uuid: req.params.uuid
//         }
//     })
//         .then((data) => {
//             if (data.length === 0) {
//                 res.json({
//                     status: "error",
//                     message: "Noting Collection",
//                 })
//             } else {
//                 res.json({
//                     status: "success",
//                     message: "Getting Collection",
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


// [GET] /collections/isbn/:isbn
collectionsRouter.get('/isbn/:isbn', async(req, res) => {
    console.debug(3)
    try {
        const DBres = await DB.Collection.findAll({
            where:{
                isbn: req.params.isbn
            }
        })
            .then((DBres) => {
                return DBres
            })
            .catch((err) => {
                throw new CustomError('Unknown', err)
            })
        if (DBres.length !== 0) {
            return res.status(200).json(DBres)
        } else {
            throw new CustomError('Nothing', DBres)
        }
    } catch(e) {
        console.debug("Error:" + e.name)
        console.debug(e)
        switch(e.name){
            case 'Nothing':
                return res.status(404).json()
            case 'Unknown':
                return res.status(500).json(e.message)
        }
    }
})

// app.get('/collection/isbn/:isbn', (req, res) => {
//     db.Collection.findAll({
//         where: {
//             isbn: req.params.isbn
//         }
//     })
//         .then((data) => {
//             if (data.length === 0) {
//                 res.json({
//                     status: "error",
//                     message: "Noting Collectoin",
//                 })
//             } else {
//                 res.json({
//                     status: "success",
//                     message: "Getting Collection",
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


// [POST] /collections
collectionsRouter.post('/', async(req, res) => {
    const sendObject = CheckCollection(req.body)
    //必要データの存在チェック
    if (sendObject) {
        const T = await DB.sequelize.transaction()
        try {
            const collection = await DB.Collection.create(sendObject,{transaction:T})
            await T.commit();
            return res.status(201).json(collection)
        } catch(e) {
            console.debug("Error:")
            console.debug(e)
            await T.rollback();
            return res.status(500).json(e)
        }
    } else {
        return res.status(400).json()
    }
})

// app.post('/collections', (req, res) => {
//     let dataObject = CheckCollection(req.body)
//     console.log(dataObject)
//     if (dataObject) {
//         db.Collection.create(dataObject)
//             .then((data) => {
//                 res.json({
//                     status: "success",
//                     message: "Created Collection",
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
//             message: "Incomplete data",
//         })
//     }
// })


// [PATCH] /:uuid/rental
collectionsRouter.patch('/:uuid/rental', async(req, res) => {
    const rentalSend = CheckRental(req.body, req.params.uuid)
    if (!rentalSend) {
        return res.status(400).json()
    }
    let rentalStatus = false
    try {
        const DBres = await DB.Collection.findAll({where:{uuid:req.params.uuid}})
            .then((DBres) => {
                return DBres
            })
        if (DBres.length !== 0) {
            rentalStatus = DBres[0].rentalStatus
        } else {
            throw new CustomError('Nothing', DBres)
        }
    } catch(e) {
        console.debug("Error:1")
        console.log(e)
        return res.status(500).json()
    }
    if (rentalStatus) {
        const T = await DB.sequelize.transaction()
        try {
            const rentalObject = await DB.Rental.create(rentalSend,{transaction:T})
            const updateObject = {rentalStatus:false,rentalId:rentalObject.rentalId}
            const collection = await DB.Collection.update(updateObject,{where:{uuid:req.params.uuid},transaction:T})
            T.commit()
            return res.status(201).json({rentalObject:rentalObject,collection:collection})
        } catch(e) {
            console.debug("Error:2")
            console.debug(e)
            T.rollback()
            return res.status(500).json()
        }
    } else {
        return res.status(507).json()
    }
})
// app.patch('/collections/:uuid/rental', async (req, res) => {
//     console.debug("1:"+req.params.uuid)
//     const rentalStatus = await db.Collection.findAll({where:{uuid:req.params.uuid}})
//         .then((resData) => {
//             if (resData.length === 1) {
//                 return resData[0].rentalStatus
//             } else {
//                 return false
//             }
//         })
//         .catch((err) => {
//             return false
//         })
//     console.debug("2:"+rentalStatus)
//     if (rentalStatus) {
//         const rentalObject = CheckRental(req.body,req.params.uuid)
//         if (rentalObject) {
//             const rentalId = await db.Rental.create(rentalObject)
//                 .then((resData) => {
//                     console.debug("3:"+resData)
//                     return resData.id
//                 })
//                 .catch((err) => {
//                     console.debug("3:"+err)
//                     return false
//                 })
//             console.log("22:" + rentalId)
//             await db.Collection.update({ rentalStatus: false, rentalId: rentalId }, { where: { uuid: req.params.uuid } })
//                 .then((redData) => {
//                     res.send("rentalSuccess")
//                 })
//                 .catch((err) => {
//                     res.send("Error")
//                 })
//         } else {
//             res.send("false2")
//         }
//     } else {
//         res.send("false1")
//     }
// })


// [PATCH] /:uuid/return
collectionsRouter.patch('/:uuid/return', async(req, res) => {
    let rentalStatus = false
    let rentalId = 0
    try {
        const DBres = await DB.Collection.findAll({where:{uuid:req.params.uuid}})
            .then((DBres) => {
                return DBres
            })
        if (DBres !== 0) {
            rentalStatus = DBres[0].rentalStatus
            rentalId = DBres[0].rentalId
        } else {
            throw new CustomError('Nothing', DBres)
        }
    } catch(e) {
        console.debug("Error:1")
        console.debug(e)
        return res.status(500).json()
    }
    if (!rentalStatus) {
        const T = await DB.sequelize.transaction()
        try {
            const collectionObject = await DB.Collection.update({rentalStatus:true,rentalId:null},{where:{uuid:req.params.uuid},transaction:T})
            const rentalObject = await DB.Rental.update({return_day:GetToday()},{where:{id:rentalId},transaction:T})
            T.commit()
            return res.status(201).json({collection:collectionObject,rental:rentalObject})
        } catch(e) {
            console.debug("Error:2")
            console.debug(e)
            T.rollback()
            return res.status(500).json()
        }
    } else {
        return res.status(507).json()
    }
})

// app.patch('/collections/:uuid/return', async(req, res) => {
//     const rentalStatus = await db.Collection.findAll({ where:{ uuid: req.params.uuid }})
//         .then((resData) => {
//             if (!resData[0].rentalStatus) {
//                 console.log("11:" + resData[0].rentalId)

//                 return resData[0].rentalId
//             }
//             return false
//         })
//         .catch((err) => {
//             console.log('1:' + err)
//             return false
//         })
//     if (rentalStatus) {
//         let DateNow = new Date();
//         const updateStates = await db.Collection.update({ rentalStatus: true, rentalId: null }, { where: { uuid: req.params.uuid } })
//             .then(() => {
//                 return true
//             })
//             .catch(() => {
//                 return false
//             })
//         if (updateStates) {
//             db.Rental.update({ return_day:DateNow.toFormat('YYYY-MM-DD') }, { where: { id: rentalStatus } })
//                 .then(() => {
//                     res.send("returnSuccess")
//                 })
//                 .catch(() => {
//                     res.send("false")
//                 })
//         } else {
//             res.send("false")
//         }
//     } else {
//         res.send('false')
//     }
// })


// [DELETE] /:uuid
collectionsRouter.delete('/:uuid', async(req, res) => {
    const T = await DB.sequelize.transaction()
    try {
        const DBres = await DB.Collection.destroy({where:{uuid:req.params.uuid},transaction:T})
        if (DBres === 0) {
            throw new CustomError('Nothing')
        }
        T.commit()
        return res.status(204).json()
    } catch(e) {
        T.rollback()
        switch(e.name) {
            case 'Nothing':
                return res.status(404).json()
        }
        return res.status(500).json()
    }
})

// app.delete('/collection/:uuid', (req, res) => {
//     db.Collection.destroy({
//         where: {
//             uuid: req.params.uuid
//         }
//     })
//         .then((data) => {
//             if (data === 0) {
//                 res.json({
//                     status: "error",
//                     message: "Nothing Collection"
//                 })
//             } else if(data === 1) {
//                 res.json({
//                     status: "success",
//                     message:"Deleted Collection",
//                     data: {
//                         uuid:req.params.uuid
//                     }
//                 })
//             }
//         })
//         .catch((err) => {
//             res.json({
//                 status: "error",
//                 message: "Unknown Error",
//                 data: err
//             })
//         })
// })

module.exports = collectionsRouter