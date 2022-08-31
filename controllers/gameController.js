var Games= require('../models/games');


const allGames = [
    { id: '1', title: 'Elden Ring' }, 
    { id: '2', title: 'Dark Souls' }, 
    { id: '3', title: 'Blodborne' }
  ]; 

exports.games_get=async(req,res,next)=>{
    try{
      const allGames=await Games.find()
      //console.log(allGames)
        res.json( allGames)
       }
      catch(e){
       // console.error(e.message)
        return res.json({errorMessage:'Server Side Error!'})
      } 
}

exports.games_id_get=async (req,res,next)=>{
    try{
      let id=req.params.id
        const selectedGame=await Games.findById(id)
        //let selectedGame=allGames.filter(game=>game.id===id)[0]
        res.json( selectedGame)
      }
      catch(e){
        console.error(e.message)
        return res.json({errorMessage:'Server Side Error!'})
      }
}

exports.games_post=async (req,res,next)=>{
    try{
        const title=req.body.title
        let game=new Games({
          title
        })
      await game.save()
        res.json( game)
      }
      catch(e){
        console.error(e.message)
        return res.json({errorMessage:'Server Side Error!'})
      }
}

exports.games_put=async (req,res,next)=>{
    try{
        let uptadedGame=new Games({
          title:req.body.title,
          _id:req.params.id
        })
       const yep=await Games.findByIdAndUpdate(req.params.id,uptadedGame,{})
        const games=await Games.find({})
        res.json(games)
      }
      catch(e){
        console.error(e.message)
        return res.json({errorMessage:'Server Side Error!'})
      }
}

exports.games_delete=async(req,res,next)=>{
    try{
      await Games.findByIdAndDelete(req.params.id)
      const games=await Games.find({})
       // let newArray=allGames.filter(game=>game.id!=req.params.id)
        res.json(games)
      }
      catch(e){
        console.error(e.message)
        return res.json({errorMessage:'Server Side Error!'})
      }
}