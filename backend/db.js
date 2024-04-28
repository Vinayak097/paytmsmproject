// backend/db.js
const mongoose = require('mongoose');
const { string } = require('zod');


mongoose.connect("mongodb+srv://newuser:simple@cluster0.nezzouv.mongodb.net/ptm-sm2")
     
           
 


// Create a Schema for Users
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});
const Transactions=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true

    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true

    },
    amount:{
        type:Number,
        required:true
    }

},{ timestamps: true })


const onTransactionMSG=mongoose.model('TransactionsMSG',Transactions);
const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
	User,
    Account,
    onTransactionMSG
};