const express = require("express");
const adminApp = express.Router();
const User = require("../models/userModel");
const expressAsyncHandler=require("express-async-handler")
const requireAuth = require("../middleware/clerkAuth");
adminApp.post("/admin", 
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


adminApp.put(
  "/admin/block-unblock/:id",
  requireAuth, // No need to wrap in `{}` or call it inside another function
  expressAsyncHandler(async (req, res) => {
    console.log("Authenticated User:", req.auth);
    
    const id = req.params.id;
    const { blocked } = req.body;

    if (blocked === undefined) {
      return res.status(400).json({ message: "Blocked status is required" });
    }

    try {
      const user = await User.findByIdAndUpdate(
        id,
        { blocked },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: `User ${blocked ? "blocked" : "unblocked"} successfully`,
        payload: user,
      });
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);


adminApp.get('/unauthorized',(req,res)=>{
  res.send({message:"Unauthorized request"})
})

module.exports = adminApp;