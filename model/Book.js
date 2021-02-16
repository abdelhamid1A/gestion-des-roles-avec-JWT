const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const bookSchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    author:{
        type : String,
        reuired : true
    },
    price :{
        type : Number,
        reuired : true
    }
})



const Book = mongoose.model('Book',bookSchema)
module.exports = Book