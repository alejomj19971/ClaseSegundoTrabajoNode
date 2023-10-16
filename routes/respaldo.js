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
    const prods= await Product.find();
    res.render('product',{message:message,error:error,products:prods})
})

routeproduct.post('/', async(req,res)=>{
    await Product.findOne({codProduct:req.body.codProduct})
    .then((product)=>{
        if(product==null){
            const prod =new Product(req.body);
            prod.save();
            message="Product Saved Succesfully"
            res.redirect(303,'/product')
            error=false
        }
        else{
            message="Product code already exist, try again"
            error=true
            
        }
        res.redirect('/product')
        //res.render('product',{message:message,error:error})
    })
    .catch((err)=>{
        console.log(err);
    })
    
})


module.exports = routeproduct