const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const Book = require("./models").Book;

app.use(BodyParser.json())

const CheckData = (object) => {
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

const CreateUpdateDataObject = (object) => {
    let BookData = {}
    if (object.isbn !== undefined || object.isbn !== "") {
        BookData.isbn = object.isbn
    }
    if (object.title !== undefined || object.title !== "") {
        BookData.title = object.title
    }
    if (object.price !== undefined || object.price !== "") {
        BookData.price = object.price
    }
    if (object.publisher !== undefined || object.publisher !== "") {
        BookData.publisher = object.publisher
    }
    if (object.auther !== undefined || object.auther !== "") {
        BookData.auther = object.auther
    }
    return BookData
}

app.get('/book',(req, res) => {
    Book.findAll()
        .then((data) => {
            res.json({"status":"success","detail":data})
        })
        .catch((err) => {
            res.json({"status":"error","detail":err})
        })
})

app.get('/book/:id', (req, res) => {
    Book.findAll({where:{id:req.params.id}})
        .then((data) => {
            res.json({"status":"success","detail":data})
        })
        .catch((err) => {
            res.json({"status":"error","detail":err})
        })
})

app.post('/book',(req, res) => {
        console.log(req.body)
        if (!CheckData(req.body)) {
            res.json({ 'status': 'error',"detail":"MissingRequiredData" })
        } else {
            Book.create(req.body)
                .then((data) => {
                    res.send({"status":"success","detail": data})
                })
                .catch((err) => {
                    res.send({"status":"error","detail":err})
                })
        }
})

app.put('/book/:id', (req, res) => {
    let BookDataObject = CreateUpdateDataObject(req.body)
    Book.update(BookDataObject, {where: { id: req.params.id }})
        .then((data) => {
            if (data == 0) {
                res.json({"status":"warning","detail":{"response":"Noting Data","id":req.params.id}})
            } else {
                res.json({"status":"success","detail":BookDataObject})
            }
        })
        .catch((err) => {
            res.json({"status":"error","detail":err})
        })
    // res.send("test")
})

app.delete('/book/:id', (req, res) => {
    Book.destroy({ where: { id: req.params.id } })
        .then((data) => {
            if (data == 1) {
                res.json({
                    "status": "success",
                    "detail": {
                        "response":"Deleted",
                        "id":req.params.id
                    }})
            } else {
                res.json({
                    "ststus": "warning",
                    "detail": {
                        "response": "NotingData",
                        "id":req.params.id
                    }
                })
            }
        }).catch((err) => {
            res.json({"status":"error","detail":err})
        })
})

// ###############################################
app.listen(80, () => {
    console.log("BookApiServer started!")
})
