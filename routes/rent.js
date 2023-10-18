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
           
        }else{
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
    await Rent.findOne({rentnumber:req.body.rentnumber})
    .then((rent)=>{

        if(rent==null){
            
            const usuarioencontrado=encontrarUsuario(req.body.username);
            const automovilChequeado=encontrarCarro(req.body.platenumber);

            if(usuarioencontrado==false||automovilChequeado==false){
                error=true
                res.redirect('303','/rent')
                
            }else{
                //cambiarEstadoAuto(req.body.platenumber)
                const newRent =new Rent(req.body);
                newRent.save();
                message="Vehiculo rentado exitosamente"
                error=false
                res.redirect('303','/rent')
               
                
            }
        }
        else{
            message="Rent code already exist, try again"
            error=true
            
        }
        res.redirect('/rent')
        //res.render('product',{message:message,error:error})
    })
    .catch((err)=>{
        console.log(err);
    })
    
})


module.exports = routeproduct