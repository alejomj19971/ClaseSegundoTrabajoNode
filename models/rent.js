const mongoose = require('mongoose')

const rentSchema = new mongoose.Schema({
    rentNumber: String,
    username: String,
    platenumber: Number,
    rentdate: {
        type:Date,
        default:Date.now
    }
})




module.exports = mongoose.model('Rent', rentSchema)