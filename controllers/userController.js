const bcrypt=require("bcryptjs")
const jwt=require('jsonwebtoken')
var Users= require('../models/users');
const { post } = require("../routes");


  const users=[
    {id:'1',username:'user1',password:'senha'},
    {id:'2',username:'user2',password:'senha'},
    {id:'3',username:'user3',password:'senha'}
  ]

exports.signin_post=(req,res,next)=>{
    try{
      const username=req.body.username
      bcrypt.hash(req.body.password,10,async (err,hashedPassword)=>{
        let user=new Users({
          username,
          password:hashedPassword
        })
      await user.save()
        res.json( user)
      })
    }
    catch(e){
      console.error(e.message) 
      return res.json({errorMessage:'Server Side Error!'})
    }
}

exports.login_post=async(req,res,next)=>{
   try{
    let user=await Users.findOne({username:req.body.username})
    if(!user)
    return  res.status(401),res.json({ errorMessage: 'Username doesnt exist!' })
   let correctPassword=await bcrypt.compare(req.body.password, user.password)  
   if(!correctPassword)
   return  res.status(401),res.json({ errorMessage: 'Password doesnt match!' })
   let expire=3600  
   const accessToken=jwt.sign({user},'secreteKey',{expiresIn:`${expire}s`})
    req.header.token=accessToken
    return res.json( user)
      }
      catch(e){
        console.error(e.message)
        return  res.status(500),res.json({ errorMessage: 'Server Side Error!' })
      }
}
exports.login_get=async (req,res,next)=>{

    try{  
      const u=await Users.find({})
      console.log(u,'usersssssssssssss')
        res.json({user:true})
      }
      catch(e){
        console.error(e.message)
        return res.json({errorMessage:'Server Side Error!'})
      }
}

exports.logout_post=(req,res,next)=>{
    try{
        req.header.token=undefined
        res.json('Succes!')
      }
      catch(e){
        console.error(e.message)
        return res.json({errorMessage:'Server Side Error!'})
      }
}
 
exports.signin_delete=async (req,res,next)=>{
  try{
    await Users.findByIdAndDelete(req.params.id)
    const users=await Users.find({})
    console.log(users)
    //let newArray=users.filter(user=>user.id!==req.query.id)
    res.json(users)
  }
  catch(e){
    console.error(e.message)
    return res.json({errorMessage:'Server Side Error!'})
  }
}


