
const {onTransactionMSG}=require('../db')
const express=require('express')

const route=express.Router()

route.post('/Tstore',(req,res)=>{
    const {userId,recieverId,amount}=req.body;

    try{const cat=new onTransactionMSG({
        userId,
        recieverId,
        amount
    })
    cat.save();
    console.log(cat)
    
    return res.status(200).json({message:"added chat"})
    }catch(e){
        return     res.status(500).json({e:e})
    }
     
}) 

module.exports=route;