import Axios from 'axios';


interface bookDataInterface{
    title?: string
    authors?:string[]
    publisher?: string
    publishedData?: string
    imgUrl?:string
}
const getBook = async (isbn:bigint) => {
    try {
        const getResponse = await Axios.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn)
        const bookData: bookDataInterface = {
            title: getResponse.data.items[0].volumeInfo.title,
            authors: getResponse.data.items[0].volumeInfo.authors,
            publisher: getResponse.data.items[0].volumeInfo.publisher,
            publishedData: getResponse.data.items[0].volumeInfo.publishedData,
            imgUrl: `https://books.google.com/books/content/images/frontcover/${getResponse.data.items[0].id}?fife=w800-h1200`
        };
        return bookData
    } catch (e) {
        
    }
}
export {
    getBook
}