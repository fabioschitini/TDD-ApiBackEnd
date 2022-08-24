var express = require('express');
var router = express.Router();
const jwt=require('jsonwebtoken')
const bcrypt=require("bcryptjs")

const allGames = [
  { id: '1', title: 'Elden Ring' }, 
  { id: '2', title: 'Dark Souls' }, 
  { id: '3', title: 'Blodborne' }
];
const users=[
  {id:'1',username:'user1',password:'senha'},
  {id:'2',username:'user2',password:'senha'},
  {id:'3',username:'user3',password:'senha'}
]
/* GET home page. */
router.get('/games', function(req, res, next) {
    res.json( allGames)
});

router.get('/games/id', function(req, res, next) {
  let selectedGame=allGames.filter(game=>game.id===req.query.id)[0]
  res.json( selectedGame)
});

router.post('/games',authenticateToken, function(req, res, next) {
  if(req.headers.token){
    return res.status(401),res.json({user:false})
  }
const title=req.body.title
const id=req.body.id
const newGame=({title,id})
allGames.push(newGame)
  res.json( allGames)
});

router.put('/game',authenticateToken,(req,res,next)=>{
  let uptadedGame={
    title:req.body.title,
    id:req.query.id
  }
 let allGamesNew= allGames.map(game=>{
    if(game.id==req.query.id){
    return uptadedGame}
    return game})

  res.json(allGamesNew)
})

router.delete('/games',authenticateToken,(req,res,next)=>{
 let newArray=allGames.filter(game=>game.id!==req.query.id)
  res.json(newArray)
})

router.get('/login',authenticateToken, function(req, res, next) {
  if(req.headers.token){
    return res.status(401),res.json({user:false})
  }
  res.json({user:true})
});
router.post('/signin', function(req, res, next) {

  const username=req.body.username
  bcrypt.hash(req.body.password,10,(err,hashedPassword)=>{
    const newUser=({username,password:hashedPassword,id:'4'})
    users.push(newUser)
    res.json( users)
  })
  
  });

router.post('/login',(req,res,next)=>{
  try{
    const username=req.body.username
    const password=req.body.password
      let userExist=false;
      let passwordMatchs=false;
      console.log(users)
  users.map(user=>{
    if(user.username===req.body.username){ 
        userExist=true
    }
    if(userExist){
       bcrypt.compare(password, user.password, (err, ress) => {
        if(ress){
          let expire=3600  
          const accessToken=jwt.sign({user:{username,password}},'secreteKey',{expiresIn:`${expire}s`})
          req.header.token=accessToken
          return res.json( users ); }

          else{
            return  res.status(500),res.json({ errorMessage: 'Password doesnt match!' })
          }
      })  
    }
  })
  console.log(userExist)
  if(!userExist){
     return  res.status(500),res.json({ errorMessage: 'Username doesnt exist!' })
  }
  }
  catch(e){
    console.error(e.message)
    return  res.status(500),res.json({ errorMessage: 'Server Side Error!' })
  }
})

router.post('/logout', function(req, res, next) {
req.header.token=undefined
res.json('Succes!')
  });

function authenticateToken(req,res,next){
   let token;
token=req.header.token
//next()
if(!token) {return res.status(401),res.json({user:undefined})}
jwt.verify(token,'secreteKey',(err,user)=>{
  if(err) return res.status(401),res.json({user:undefined})
  req.user=user
  next()
})
}

module.exports = router;
