// backend/index.js
const express = require('express');
const cors = require("cors");
const rootRouter = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());
console.log(" working ")
app.get('/' ,(req,res)=>{
    console.log( "in ner ")
    res.send("res send ");
})
app.use("/api/v1", rootRouter);

app.listen(3000);