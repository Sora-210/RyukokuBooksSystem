const express = require('express')
const BodyParser = require('body-parser')
const db = require('./models/index')

const app = express()
app.use(BodyParser())

const CheckBookData = (object) => {
    if (object.title === undefined || object.title === "") {
        return false
    }
    if (object.price === undefined || object.price === "") {
        return false
    }
    if (object.publisher === undefined || object.publisher === "") {
        return false
    }
    if (object.auther === undefined || object.auther === "") {
        return false
    }
    return true
}
const CollectionData = (object) => {
    if (object.DataStoreFrom === undefined || object.DataStoreFrom === "") {
        return false
    }
    if (object.DataStoreFrom !== 0 && object.DataStoreFrom !== 1) {
        return false
    }
    if (object.DataStoreFrom === 1 && CheckBookData(object.BookData) === false) {
        return false
    }
    if (object.fromId === undefined || object.fromId === "") {
        return false
    }
    if (object.NCD === undefined || object.NCD === "") {
        return false
    }
    return true
}

app.get('/collection/:uuid', (req, res) => {
    db.Collection.findAll()
        .then((data) => {
            console.log(data)
        })
        .catch((err) => {
            console.log(err)
        })
    res.send("test")
})
app.post('/collection', (req, res) => {
    console.log(req.body)
    if (CollectionData(req.body)) {
        res.send("true")
    } else {
        res.json({"status":"error","detail":{"response":"NotingData"}})
    }
})
app.delete('/collection/:uuid', (req, res) => {
    console.log(req.body)
    res.send("test")
})


app.listen(80, () => {
    console.log("ManagementAPIServer started")
})