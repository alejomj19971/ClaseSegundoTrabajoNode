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

// Endpoints Login
routeproduct.get('/', async(req, res) => {
   // const prods= await User.find();
    res.render('login',{message:message,error:error})
})

routeproduct.post('/', async(req,res)=>{
    await User.findOne({username:req.body.username,password:req.body.password})
    .then((user)=>{
        if(user==null){
            
            message="Usuario o contraseña incorrectos"
            res.redirect(303,'/')
            error=true
        }
        else{
            
            message="Ingreso Exitoso"
            error=false
            
        }
            res.redirect(303,'/car')
       
       
        //res.render('product',{message:message,error:error})
    })
    .catch((err)=>{
        console.log(err);
    })
    
})

//Endpoints Registrar

routeproduct.get('/registro', async(req, res) => {
    //const prods= await User.find();
    res.render('registro',{message:message,error:error})
})

routeproduct.post('/registro', async(req,res)=>{
    await User.findOne({username:req.body.username})
    .then((user)=>{
        if(user==null){
            const newUser =new User(req.body);
            newUser.save();
            message="Usuario Registrado"
            res.redirect(303,'/')
            error=false
        }
        else{
            message="Este Usuario ya existre pruebe con otro nombre"
            error=true
            
        }
        res.redirect('/registro')
        //res.render('product',{message:message,error:error})
    })
    .catch((err)=>{
        console.log(err);
    })
    
})



module.exports = routeproduct