// backend/user/index.js
const express = require('express');
const userRouter = require("./user");
const accountRouter = require("./account");
const TRouter=require("./Tchat")
const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);
router.use("/chat",TRouter)

module.exports = router;