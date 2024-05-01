// backend/routes/account.js
const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
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
    
    return res.json("unthourized",e)
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
    
    await onTransactionMSG.create({
        senderId:senderId,
        recieverId:to,
        amount:amount
    });

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});


router.post('/getTchat', authMiddleware,async(req,res)=>{

       
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
module.exports = router;