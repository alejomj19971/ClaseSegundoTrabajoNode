const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    platenumber: String,
    brand: String,
    state: String,
    prodStock: Number
})




module.exports = mongoose.model('Car', carSchema)