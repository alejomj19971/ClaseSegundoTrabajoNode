const { config } = require('dotenv');
const mongoose = require('mongoose');


const db= 'dbRentCar';



mongoose.connect(`mongodb://127.0.0.1:27017/${db}`)
  .then(db => console.log('Conectado a la base de datos dbRentCar'))
  .catch(err => console.log(err))

 