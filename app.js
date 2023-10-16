const express = require('express')
require('dotenv').config()
const configDb = require('./dataBase/configDB')
//Viene de  Routes
const easyRentCar = require('./routes/routes')
const easyRentCar_Cars = require('./routes/car')
const easyRentCar_Rent = require('./routes/rent')
const app = express()
//PORT
const port = process.env.PORT || 4500
//set
app.set('view engine', 'pug')
app.set('views', 'views')

//middleware

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//definelaraiz
app.use('/', easyRentCar)
app.use('/car',easyRentCar_Cars)
app.use('/rent',easyRentCar_Rent)

app.listen(port, ()=>{
    console.log('listening on port', port);
})