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
const { trusted } = require('mongoose');

//Definir Switch

let message=""
let error=false


const encontrarUsuario=async(usernameForm)=>{
    await User.findOne({username:usernameForm})
    .then(user=>{

        if(user!=null){
            error=false
            return true
           
        }
        else{
            message="Usuario No encontrado"
            error= true
            return false
        }
    })
}

const encontrarCarro=async(plateNumberForm)=>{

    await Car.findOne({platenumber:plateNumberForm,state:"Disponible"})
     .then(car=>{
          if(car!=null){

            if(car.state=="Disponible"){
                error= false
                return true
            }else{
                message="Automovil no disponible"
                error= true
                return false
            }

        }else{
            message="Automovil no encontrado"
            error=true
            return  false
        }
    })
    
}


/*const cambiarEstadoAuto=async(platenumber)=>{
    await Car.findOne({platenumber:platenumber})
    .then(car=>{
        car.updateOne({_id :car._id},{
            platenumber:car.platenumber,
            brand:car.brand,
            state:"No disponible"
        })

      
    })
}*/



routeproduct.get('/', async(req, res) => {
    const rents= await Rent.find();
    res.render('rent',{message:message,error:error,rents:rents})
})

routeproduct.post('/', async(req,res)=>{
    const renta = await Rent.findOne({rentnumber:req.body.rentnumber})
    const usuario = await User.findOne({username:req.body.username})
    const auto = await Car.findOne({platenumber:req.body.platenumber})

        if(renta!=null){
            message="Este numero de renta ya existe"
            error=trusted
            res.redirect('/rent')
        }


        if(renta==null){
            if(usuario!=null && auto!=null && auto.state=="Disponible"){
                const newRent =new Rent(req.body);
                newRent.save();
                message="Vehiculo rentado exitosamente"
                error=false
                res.redirect('/rent')
            }else{

                if(usuario==null){
                    message="Usuario no Encontrado"
                    error=true
                    res.redirect('/rent')
                }
                
                if(auto==null){
                    message="Vehiculo no Encontrado"
                    error=true
                    res.redirect('/rent')

                }

                if(auto.state!="Disponible"){
                message="Vehiculo no disponible"
                error=true
                res.redirect('/rent')
                }
            }

        }
     
        
        //res.render('product',{message:message,error:error})
    })
    
    



module.exports = routeproduct