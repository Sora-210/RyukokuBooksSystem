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

//Collections
const collectionsRouter = require('./src/Collection.js')
app.use('/collections', collectionsRouter)

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