const express = require('express')
const BodyParser = require('body-parser')
const cors = require('cors')

const AccessLog = require('./src/Log.js').getLogger('access')
AccessLog.level = "info"

const app = express()
app.use(BodyParser.json())
app.use(cors())
app.use(function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    // res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PATCH")
    // res.header("Access-Control-Allow-Headers", "token");
    AccessLog.info(req.ip + " - [" + req.method + "] " + req.originalUrl)
    next();
});

//Collections
const { newsRouter } = require('./src/News.js')
app.use('/news', newsRouter)

//Collections
const { collectionsRouter } = require('./src/Collection.js')
app.use('/collections', collectionsRouter)

//rental
const { rentalRouter } = require('./src/Rental.js')
app.use('/rentals', rentalRouter)

// Requests
const { requestRouter } = require('./src/Request.js')
app.use('/requests', requestRouter)

// Login
const { loginRouter } = require('./src/Login.js')
app.use('/login', loginRouter)

app.listen(80, () => {
    console.log("ManagementAPIServer started")
})