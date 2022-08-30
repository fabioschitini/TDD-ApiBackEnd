var Games= require('../models/games');


const allGames = [
    { id: '1', title: 'Elden Ring' }, 
    { id: '2', title: 'Dark Souls' }, 
    { id: '3', title: 'Blodborne' }
  ]; 

exports.games_get=async(req,res,next)=>{
    try{
      const allGames=await Games.find({})
        res.json( allGames)
       }
      catch(e){
        console.error(e.message)
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
        const id=req.body.id
        let game=new Games({
          title,
          id
        })
      await game.save()
  /*       let game=new Games({
          title:req.body.title
        }) */
      /*   let newGames=await game.save()
        console.log(newGames) */
       // const newGame=({title,id})
        //allGames.push(newGame)
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
          id:req.params.id
        })
       const result=await Games.findByIdAndUpdate(req.params.id,uptadedGame,{})
  /*      let allGamesNew= allGames.map(game=>{
          if(game.id==req.params.id){
          return uptadedGame}
          return game}) */
        res.json(result)
      }
      catch(e){
        console.error(e.message)
        return res.json({errorMessage:'Server Side Error!'})
      }
}

exports.games_delete=(req,res,next)=>{
    try{
      await Games.findByIdAndDelete(req.body.params)
      const games=await Games.find({})
       // let newArray=allGames.filter(game=>game.id!=req.params.id)
        res.json(games)
      }
      catch(e){
        console.error(e.message)
        return res.json({errorMessage:'Server Side Error!'})
      }
}