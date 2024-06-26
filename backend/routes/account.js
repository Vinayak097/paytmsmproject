// backend/routes/account.js
const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account, User } = require('../db');
const { default: mongoose } = require('mongoose');
const {onTransactionMSG}=require('../db')

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    try{
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
}catch(e){
    console.log(e.message)    
    return res.status(500).json({message:"INternal server error"})
}
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    if(req.userId===to){
        return res.status(400).json({message:" self transfer not implemented yet"})
    }
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }
    const senderId = await req.userId;
    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
    // const newMessage = new onTransactionMSG({
    //     senderId,
    //     receiverId:to,
    //     amount:amount,
    // });
    // await newMessage.save()
    
    const save= await onTransactionMSG.create({
        senderId:senderId,
        recieverId:to,
        amount:amount
    });
    console.log("save: ",save)

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});


router.post('/getTchat/to', authMiddleware,async(req,res)=>{

       
    try{ 

        const {recieverId}=req.body;
        if(req.userId===recieverId){
            return res.json("sender and reciever nee to be different ")
        }
        console.log( req.userId,recieverId)
    const chat=await onTransactionMSG.find({
        senderId:req.userId,
        recieverId:recieverId
    })
    res.json({chat:chat})
    return;
}catch(e){
    res.status(500).json("error in /getchat",e)
}
   
})
router.get('/getTchat', authMiddleware,async(req,res)=>{
    
       
    try{ 

        const userId=req.userId;
        const user=await User.findById(userId)
        if(!user){
            return res.status(404).json({message:"user not found "})
        }
       
        const chat = await onTransactionMSG.find({
            senderId: userId
        })
        .populate("senderId", "-password")
        .populate("recieverId", "-password")
        .sort({ createdAt: -1 });
        
   return  res.status(200).json({chat:chat})
   
}catch(e){
    console.log(e)
    return res.status(500).json({message:"error in /getchat"})
}
   
})

router.put('/add/:amount',authMiddleware,async(req,res)=>{
    console.log('enter amount')
    try{
    const userId=req.userId;
    const amount=req.params.amount;
    console.log("pass")
    if(amount>9999){
        return res.status(400).json({message:"enter an amount less than 10k"})
    }
    if(!userId){
        return res.status(403).json({message:"unathorized act "})
    }
    const account=await Account.findOne({userId});

    if(!account){
        return res.status(404).json({message:"account not found"})
    }
    if(account.balance>99999){
        return res.status(411).json({message:"you have enough balance"})
    }
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: amount } })
    return res.status(200).json({message:"amount added successfully"})
}catch(error){
    console.log("error in add amount ",error.message)
    return res.status(500).json({error :"Internal error "})
}
})


module.exports = router;