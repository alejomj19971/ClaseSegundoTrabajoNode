const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    codProduct: String,
    prodName: String,
    prodPrice: Number,
    prodStock: Number,
    created: {
        type:Date,
        default:Date.now
    }
})




module.exports = mongoose.model('Product', productSchema)

//se sugiere un archivo por cada esquema