const bcrypt=require("bcryptjs")
const jwt=require('jsonwebtoken')


  const users=[
    {id:'1',username:'user1',password:'senha'},
    {id:'2',username:'user2',password:'senha'},
    {id:'3',username:'user3',password:'senha'}
  ]

exports.signin_post=(req,res,next)=>{
    try{
        const username=req.body.username
        bcrypt.hash(req.body.password,10,(err,hashedPassword)=>{
          const newUser=({username,password:hashedPassword,id:'4'})
          users.push(newUser)
          res.json( users)
        })
      }
      catch(e){
        console.error(e.message)
        return res.json({errorMessage:'Server Side Error!'})
      }
}

exports.login_post=(req,res,next)=>{
    try{
        const username=req.body.username
        const password=req.body.password
          let userExist=false;
      let user=users.map(user=>{
        if(user.username===req.body.username){ 
            userExist=true
            return user
        }
      }).filter(user=>user!==undefined)[0]
     
      if(userExist){
        console.log(user)
        bcrypt.compare(password, user.password, (err, ress) => {
         if(ress||user.password===req.body.password){
           let expire=3600  
           const accessToken=jwt.sign({user:{username,password}},'secreteKey',{expiresIn:`${expire}s`})
           req.header.token=accessToken
           return res.json( users )
          }
           else{
             return  res.status(401),res.json({ errorMessage: 'Password doesnt match!' })
           }
       })  
     }
     else{
      return  res.status(401),res.json({ errorMessage: 'Username doesnt exist!' })
     }
      }
      catch(e){
        //console.error(e.message)
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


