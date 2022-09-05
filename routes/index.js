var express = require('express');
var router = express.Router();
const jwt=require('jsonwebtoken')
const bcrypt=require("bcryptjs")
const userController=require('../controllers/userController')
const gamesController=require('../controllers/gameController')



/* GET home page. */
router.get('/',(req,res,next)=>{
  res.json('Welcome to my TDD API3')
});

router.post('/signin',userController.signin_post);
  
router.post('/login',userController.login_post)

router.get('/games', gamesController.games_get);

router.get('/games/:id', gamesController.games_id_get);

router.post('/games',authenticateToken, gamesController.games_post);

router.put('/game/:id',authenticateToken,gamesController.games_put)

router.delete('/games/:id',authenticateToken,gamesController.games_delete)

router.get('/login',authenticateToken,userController.login_get);

router.post('/logout',userController.logout_post);

router.delete('/signin/:id',authenticateToken,userController.signin_delete)

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
