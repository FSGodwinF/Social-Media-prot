const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


//REGISTER NEW USER
router.post("/register", async (req, res)=>{
    
    try{
        //masking the user's password in the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //creating new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        // saving new user and response
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);

    }
});

//LOGIN A REGISTERED USER
router.post("/login", async (req, res)=>{
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send("email or password is incorrect");

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) return res.status(400).send("Password is incorrect");

        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
    
});

module.exports = router