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

// Requests
const requestRouter = require('./src/Request.js')
app.use('/requests', requestRouter)

app.listen(80, () => {
    console.log("ManagementAPIServer started")
})