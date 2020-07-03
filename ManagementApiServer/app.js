const express = require('express')
const BodyParser = require('body-parser')

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
const rentalRouter = require('./src/Rental.js')
app.use('/rentals', rentalRouter)

// Requests
const requestRouter = require('./src/Request.js')
app.use('/requests', requestRouter)

app.listen(80, () => {
    console.log("ManagementAPIServer started")
})