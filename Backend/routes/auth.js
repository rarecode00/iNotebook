const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const JWT_SECRET = 'thisiswebtoken';
const jwt = require('jsonwebtoken');
const { Router } = require('express');

const fetchuser = require('../middleware/fetchuser')


router.post('/createuser' , [
    body('email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 5 })


], async(req , res) =>{
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success ,  errors: errors.array() });
    }

    try{

    let user = await User.findOne({email : req.body.email});
    
    
    if(user){
      return res.status(400).json({success , error : "This email is already exists"})
    }
    
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password.toString() , salt);
    
    user = await User.create({
      name: req.body.name.toString(),
      password: secPass.toString(),
      email: req.body.email.toString(),
    })
    const data = {
       user: user.id
    }

    const authtoken = jwt.sign(data , JWT_SECRET);
    success = true;
    res.json({success ,user})
  } catch(error){
     console.log(error);
     res.status(500).send("Some error occured");
  }
})

// Router 2
router.post('/login' , [
  body('email' , 'Enter the valid email').isEmail(),
  body('password' , 'Password cannot be blank').exists()
], async(req , res) =>{
  const errors = validationResult(req);
  let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

  const {email , password} = req.body;

  try {
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({error: "Please try to login with correct credentials"});
    }
    const passwordCompare = await bcrypt.compare(password.toString() , user.password);
    if(!passwordCompare){
      return res.status(400).json({error: "Please try to login with correct credentials"});
    }
    const data = {
      user: {
        id : user.id
      }
   }
    success = true;
    const authtoken = jwt.sign(data , JWT_SECRET);
    let name = user.name;
    res.json({success , authtoken , name});

  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error occured");
  }

})


//Router3

router.post('/getuser' , fetchuser, async(req , res) =>{
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select('-password')
      res.send(user)
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error occured");
    }
})
  

module.exports = router;