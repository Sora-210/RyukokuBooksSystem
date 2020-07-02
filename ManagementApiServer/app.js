const express = require('express')
const uuid = require('node-uuid')
const BodyParser = require('body-parser')
const db = require('./models/index')
require('date-utils')

const app = express()
app.use(BodyParser())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// collection
const CheckCollection = (object) => {
    let ReturnObject = {}
    ReturnObject.rentalStatus = true
    if (object.isbn === undefined || object.isbn === "") {
        return false
    }
    ReturnObject.isbn = object.isbn
    let DateNow = new Date();
    ReturnObject.registrationData = DateNow.toFormat('YYYY-MM-DD')
    ReturnObject.uuid = uuid.v4()
    if (object.ncd === undefined || object.ncd === "") {
        return false
    }
    ReturnObject.ncd = object.ncd
    if (object.note !== undefined || object.note !== "") {
        ReturnObject.note = object.note
    }
    return ReturnObject
}

app.get('/collections', (req, res) => {
    db.Collection.findAll({})
        .then((data) => {
            if (data.length === 0) {
                res.json({
                    status: "error",
                    message: "Noting Collectoin",
                })
            } else {
                res.json({
                    status: "success",
                    message: "Getting Collection",
                    data: data
                })
            }
        })
        .catch((err) => {
            res.json({
                status: "error",
                message: "Unknown error",
                data: err
            })
        })
})
app.get('/collection/isbn/:isbn', (req, res) => {
    db.Collection.findAll({
        where: {
            isbn: req.params.isbn
        }
    })
        .then((data) => {
            if (data.length === 0) {
                res.json({
                    status: "error",
                    message: "Noting Collectoin",
                })
            } else {
                res.json({
                    status: "success",
                    message: "Getting Collection",
                    data: data
                })
            }
        })
        .catch((err) => {
            res.json({
                status: "error",
                message: "Unknown error",
                data: err
            })
        })
})
app.get('/collection/:uuid', (req, res) => {
    db.Collection.findAll({
        where: {
            uuid: req.params.uuid
        }
    })
        .then((data) => {
            if (data.length === 0) {
                res.json({
                    status: "error",
                    message: "Noting Collection",
                })
            } else {
                res.json({
                    status: "success",
                    message: "Getting Collection",
                    data: data
                })
            }
        })
        .catch((err) => {
            res.json({
                status: "error",
                message: "Unknown error",
                data: err
            })
        })
})
app.post('/collections', (req, res) => {
    let dataObject = CheckCollection(req.body)
    console.log(dataObject)
    if (dataObject) {
        db.Collection.create(dataObject)
            .then((data) => {
                res.json({
                    status: "success",
                    message: "Created Collection",
                    data: data
                })
            })
            .catch((err) => {
                res.json({
                    status: "error",
                    message: "Unknown error",
                    data: err
                })
            })
    } else {
        res.json({
            status: "error",
            message: "Incomplete data",
        })
    }
})

const CheckRental = (object,collectionUuid) => {
    console.log(object)
    let ReturnObject = {}
    ReturnObject.uuid = collectionUuid
    if (object.grade === undefined || object.grade === "") {
        return false
    }
    ReturnObject.grade = object.grade
    // if (object.class !== undefined || object.class !== "") {
    //     console.log(4)
    //     return false
    // }
    ReturnObject.class = object.class
    // if (object.number !== undefined || object.number !== "") {
    //     console.log(5)
    //     return false
    // }
    ReturnObject.number = object.number
    // if (object.name !== undefined || object.name !== "") {
    //     return false
    // }
    ReturnObject.name = object.name
    let DateNow = new Date();
    ReturnObject.year = DateNow.toFormat('YYYY')
    ReturnObject.start_day = DateNow.toFormat('YYYY-MM-DD')
    console.debug(ReturnObject)
    return ReturnObject
}
app.patch('/collections/:uuid/rental', async (req, res) => {
    console.debug("1:"+req.params.uuid)
    const rentalStatus = await db.Collection.findAll({where:{uuid:req.params.uuid}})
        .then((resData) => {
            if (resData.length === 1) {
                return resData[0].rentalStatus
            } else {
                return false
            }
        })
        .catch((err) => {
            return false
        })
    console.debug("2:"+rentalStatus)
    if (rentalStatus) {
        const rentalObject = CheckRental(req.body,req.params.uuid)
        if (rentalObject) {
            const rentalId = await db.Rental.create(rentalObject)
                .then((resData) => {
                    console.debug("3:"+resData)
                    return resData.id
                })
                .catch((err) => {
                    console.debug("3:"+err)
                    return false
                })
            console.log("22:" + rentalId)
            await db.Collection.update({ rentalStatus: false, rentalId: rentalId }, { where: { uuid: req.params.uuid } })
                .then((redData) => {
                    res.send("rentalSuccess")
                })
                .catch((err) => {
                    res.send("Error")
                })
        } else {
            res.send("false2")
        }
    } else {
        res.send("false1")
    }
})
app.patch('/collections/:uuid/return', async(req, res) => {
    const rentalStatus = await db.Collection.findAll({ where:{ uuid: req.params.uuid }})
        .then((resData) => {
            if (!resData[0].rentalStatus) {
                console.log("11:" + resData[0].rentalId)

                return resData[0].rentalId
            }
            return false
        })
        .catch((err) => {
            console.log('1:' + err)
            return false
        })
    if (rentalStatus) {
        let DateNow = new Date();
        const updateStates = await db.Collection.update({ rentalStatus: true, rentalId: null }, { where: { uuid: req.params.uuid } })
            .then(() => {
                return true
            })
            .catch(() => {
                return false
            })
        if (updateStates) {
            db.Rental.update({ return_day:DateNow.toFormat('YYYY-MM-DD') }, { where: { id: rentalStatus } })
                .then(() => {
                    res.send("returnSuccess")
                })
                .catch(() => {
                    res.send("false")
                })
        } else {
            res.send("false")
        }
    } else {
        res.send('false')
    }
})

app.delete('/collection/:uuid', (req, res) => {
    db.Collection.destroy({
        where: {
            uuid: req.params.uuid
        }
    })
        .then((data) => {
            if (data === 0) {
                res.json({
                    status: "error",
                    message: "Nothing Collection"
                })
            } else if(data === 1) {
                res.json({
                    status: "success",
                    message:"Deleted Collection",
                    data: {
                        uuid:req.params.uuid
                    }
                })
            }
        })
        .catch((err) => {
            res.json({
                status: "error",
                message: "Unknown Error",
                data: err
            })
        })
})

//rental
app.get('/rentals', (req,res) => {
    db.Rental.findAll()
        .then((data) => {
            if (data.length === 0) {
                res.json({
                    status: "error",
                    message: "Noting Request"
                })
            } else {
                res.json({
                    status: "success",
                    message: "Getting Requests",
                    data: data
                })
            }
        })
        .catch((err) => {
            res.json({
                status: "error",
                message: "Unknown error",
                data: err
            })
        })
})
app.get('/rentals/:uuid', (req,res) => {

})

// request
const requestCheck = (data) => {
    if (data.genre === undefined || data.genre === "") {
        return false
    }
    if (data.content === undefined || data.content === "") {
        return false
    }
    return true
}

app.get('/requests', (req, res) => {
    db.Request.findAll()
        .then((data) => {
            if (data.length === 0) {
                res.json({
                    status: "error",
                    message: "Noting Request"
                })
            } else {
                res.json({
                    status: "success",
                    message: "Getting Requests",
                    data: data
                })
            }
        })
        .catch((err) => {
            res.json({
                status: "error",
                message: "Unknown error",
                data: err
            })
        })
})
app.get('/requests/:id', (req, res) => {
    db.Request.findAll(
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then((data) => {
            if (data.length === 0) {
                res.json({
                    status: "error",
                    message: "Noting Request"
                })
            } else {
                res.json({
                    status: "success",
                    message: "Getting Request",
                    data: data
                })
            }
        })
        .catch((err) => {
            res.json({
                status: "error",
                message: "Unknown error",
                data: err
            })
        })
})
app.post('/requests', (req, res) => {
    if (requestCheck({"genre":req.body.genre,"content":req.body.content})) {
        db.Request.create(
            {
                "genre": req.body.genre,
                "content": req.body.content
            }
        )
            .then((data) => {
                res.json({
                    status: "success",
                    message: "Send Request",
                    data: data
                })
            })
            .catch((err) => {
                res.json({
                    status: "error",
                    message: "Unknown error",
                    data: err
                })
            })
    } else {
        res.json({
            status: "error",
            message: "Incomplete data"
        })
    }
})
app.delete('/requests/:id', (req, res) => {
    db.Request.destroy({
        where:{
            id: req.params.id
        }
    })
        .then((data) => {
            if (data === 0) {
                res.json({
                    status: "error",
                    message: "Noting Request"
                })
            } else if (data === 1) {
                res.json({
                    status: "success",
                    message: "Deleted Request",
                    data: {
                        id: req.params.id
                    }
                })
            }
        })
        .catch((err) => {
            res.json({
                status: "error",
                message: "Unknown error",
                data: err
            })
        })
})

app.listen(80, () => {
    console.log("ManagementAPIServer started")
})