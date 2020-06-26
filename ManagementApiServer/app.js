const express = require('express')
const uuid = require('node-uuid')
const BodyParser = require('body-parser')
const db = require('./models/index')

const app = express()
app.use(BodyParser())


// collection
const CheckCollection = (object) => {
    let ReturnObject = {}
    if (object.isbn === undefined || object.isbn === "") {
        return false
    }
    ReturnObject.isbn = object.isbn
    if (object.registrationData === undefined || object.registrationData === "") {
        return false
    }
    ReturnObject.registrationData = object.registrationData
    if (object.ncd === undefined || object.ncd === "") {
        return false
    }
    ReturnObject.ncd = object.ncd
    if (object.note !== undefined || object.note !== "") {
        ReturnObject.note = object.note
    }
    return ReturnObject
}

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
app.post('/collection', (req, res) => {
    let dataObject = req.body
    if (CheckCollection(dataObject)) {
        dataObject.uuid = uuid.v4()
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