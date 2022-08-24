var express = require('express');
var router = express.Router();
const jwt=require('jsonwebtoken')

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
console.log('whattttttttttttttttttttttt')
 let newArray=allGames.filter(game=>game.id!==req.query.id)

  res.json(newArray)
})

router.get('/login',authenticateToken, function(req, res, next) {
  if(req.headers.token){
    return res.status(401),res.json({user:false})
  }
  res.json({user:true})
});

router.post('/login',(req,res,next)=>{
  try{
    const username=req.body.username
    const password=req.body.password
      let userExist=false;
      let passwordMatchs=false;
    users.map(user=>{
    if(user.username===req.body.username){
    userExist=true
    if(user.password===req.body.password){
      passwordMatchs=true}}})
    if(!userExist)
        return  res.status(500),res.json({ errorMessage: 'Username doesnt exist!' })
    else if(!passwordMatchs)
      return  res.status(500),res.json({ errorMessage: 'Password doesnt match!' })
    else{
      let expire=3600  
      const accessToken=jwt.sign({user:{username,password}},'secreteKey',{expiresIn:`${expire}s`})
      req.header.token=accessToken
      return res.json({ users });
    }
  }
  catch(e){
    console.error(e.message)
    return  res.status(500),res.json({ errorMessage: 'Server Side Error!' })
  }

})

router.post('/signin', function(req, res, next) {

const username=req.body.username
const password=req.body.password
const newUser=({username,password})
users.push(newUser)
  res.json( users)
});

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
