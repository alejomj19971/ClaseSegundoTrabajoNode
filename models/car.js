const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    platenumber: String,
    brand: String,
    state: {
        type:String,
        default:"Disponible"
    
    }
    
})




module.exports = mongoose.model('Car', carSchema)