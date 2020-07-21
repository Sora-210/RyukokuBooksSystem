const axios = require('axios')

const GetBook = async (isbn) => {
    try {
        const res = await axios.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn)
        const BookData = {
            title: res.data.items[0].volumeInfo.title,
            authors: res.data.items[0].volumeInfo.authors,
            publisher: res.data.items[0].volumeInfo.publisher,
            publishedData: res.data.items[0].volumeInfo.publishedData,
            imgUrl: `https://books.google.com/books/content/images/frontcover/${res.data.items[0].id}?fife=w800-h1200`
        }
        return BookData
    } catch (e) {
        
    }
}

module.exports = {
    GetBook
}