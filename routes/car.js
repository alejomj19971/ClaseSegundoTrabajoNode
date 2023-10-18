// Respaldo
const express = require('express');
const routeproduct = express.Router();
const Product = require('../models/product');
//Modelos
const Car = require('../models/car');
const Rent = require('../models/rent');
const User = require('../models/user');
//
const { render } = require('pug');


let message=""
let error=false

routeproduct.get('/', async(req, res) => {
    const cars= await Car.find();
    res.render('car',{message:message,error:error,cars:cars})
})

routeproduct.post('/', async(req,res)=>{
    await Car.findOne({platenumber:req.body.platenumber})
    .then((car)=>{
        if(car==null){
            const newCar =new Car(req.body);
            newCar.save();
            message="Vehículo guardado con éxito"
            res.redirect(303,'/car')
            error=false
        }
        else{
            message="Ya existe un vehículo con esa placa"
            error=true
            
        }
        res.redirect('/car')
        //res.render('product',{message:message,error:error})
    })
    .catch((err)=>{
        console.log(err);
    })
    
})


module.exports = routeproduct