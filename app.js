const express = require('express')
require('dotenv').config()
const configDb = require('./dataBase/configDB')
const product = require('./routes/routes')
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
app.use('/product', product)

app.listen(port, ()=>{
    console.log('listening on port', port);
})