const express = require("express");
const wardenApp = express.Router();
const User = require("../models/userModel");
const expressAsyncHandler=require("express-async-handler")
const requireAuth = require("../middleware/clerkAuth");
wardenApp.post("/warden", 
  expressAsyncHandler(async (req, res) => {
  const newUser=req.body;
  //find the user by email id
  const userInDb=await User.findOne({email:newUser.email})
  //if user or author existed
  if(userInDb!==null)
  {
    //check with role
    if(newUser.role===userInDb.role)
     {
      res.status(200).send({message:newUser.role,payload:userInDb})
     }
     else{
      res.status(200).send({message:"Invalid role"})
     }
  }
  else
  {
    let newUser=new User(newUser);
    let newUserOrAuthorDoc=await newUser.save();
    res.status(201).send({message:newUserOrAuthorDoc.role,payload:newUserOrAuthorDoc})
  }

}));


module.exports = wardenApp;