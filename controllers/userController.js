const bcrypt=require("bcryptjs")
const jwt=require('jsonwebtoken')
var Users= require('../models/users');


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
      console.log(user,'userrrrrrrrrrrrrrrrrrrr')
       // const newUser=({username,password:hashedPassword,id:'4'})
        //users.push(newUser)
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
    return res.json( user)
      }
      catch(e){
        console.error(e.message)
        return  res.status(500),res.json({ errorMessage: 'Server Side Error!' })
      }
}
exports.login_get=(req,res,next)=>{

    try{
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

exports.signin_delete=(req,res,next)=>{
  try{
    let newArray=users.filter(user=>user.id!==req.query.id)
    res.json(newArray)
  }
  catch(e){
    console.error(e.message)
    return res.json({errorMessage:'Server Side Error!'})
  }
}


