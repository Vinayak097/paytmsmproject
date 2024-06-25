// backend/routes/user.js
const express = require('express');

const router = express.Router();
const zod = require("zod");

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { User, Account } = require('../db');
const  { authMiddleware } = require("../middleware");


const signupBody = zod.object({
    email: zod.string().email().nonempty({message:"fill it"}),
	firstName: zod.string().nonempty({message:"fill it "}),
	lastName: zod.string(),
	password: zod.string().min(6)})


router.get("/" ,(req,res)=>{
    
    res.send("api/v1/ active")
})
router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    
    console.log(success)
    if (!success) {
        return res.status(411).json({
            message: " Incorrect inputs"
        })
    }
    try {
        console.log("checkking user")
        const existingUser = await User.findOne({ email: req.body.email });
        console.log("user find pass")
        console.log("exitsing user",existingUser)
        if (existingUser) {
            return res.status(411).json({
                            message: "Email already exist go to signin"
                        
            })
           
        } 
            // Create a new user if the email is not already registered
        const newUser = await User.create({
                email: req.body.email,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            });
        console.log("pass",newUser)
    const userId = newUser._id;
    delete newUser.password;
    console.log("signup" ,userId)
    
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    return res.json({
        message: "User created successfully",
        token: token,
        user:{
            userId:newUser._id,
            firstName:newUser.firstName,
            email:newUser.email,
            lastName:newUser.lastName, 
        }
    })
            // Handle successful user creation
        
    } catch (error) {
        
        return res.status(500).json({error:error.message})
    
    
    }


    
})


const signinBody = zod.object({
    email: zod.string().email(),
	password: zod.string()
})
router.post("/signin", async (req, res) => {
    console.log('signin');
    const payload = signinBody.safeParse(req.body);
    
    if (payload.success === false) {
        return res.status(400).json({
            message: "Incorrect inputs",
            errors: payload.error
        });
    }

    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Validate password (you should use bcrypt for secure password comparison)
        const passwordValid = user.password === req.body.password;

        if (!passwordValid) {
            return res.status(401).json({ message: "Incorrect email/password combination" });
        }

        // If user and password are valid, generate JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);

        return res.status(200).json({data:{
            token: token,
            user: {
                userId: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        }});
    } catch (error) {
        console.error("Error during signin:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/update", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }
    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })
})
router.get("/bulk", async (req, res) => {
    const filter=req.query.filter;
    const userd=await User.find({_id:req.userId});
    const firstName=userd.firstName;
    console.log("usrs filter",filter )
    try {
        const users = await User.find({email: { $regex: filter, $options: 'i' },firstName:{$ne:firstName}}).select("-password"); // Find all users without any filtering
       
        res.json({
            users: users.map(user => ({
                email: user.email,
                firstName: user.firstName,  
                lastName: user.lastName,
                _id: user._id
            }))
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



module.exports = router;