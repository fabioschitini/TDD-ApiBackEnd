const request=require('supertest')
const app=require('../app') 
var Games= require('../models/games');

const allGames = [
    { id: '1', title: 'Blodbornes' }, 
    { id: '2', title: 'Blodbornes' }, 
    { id: '3', title: 'Blodbornes' }
  ];




  it('POST /login,if the correct username and password is put, then return user arrays',async()=>{
    const response=await request(app)
    .post('/login')
    .send({
        username:'user3',
        password:'senha'
    })
    .expect("Content-Type",/json/)
    .expect(200)
 expect(response.body).toEqual( 
    expect.objectContaining({
        username:'user3'
    })
)
})


 it('POST /games,add new game object on the allGames array,then return array with object with all games',async()=>{
    const response=await request(app)
    .post('/games')
    .send({
        title:'Blodborne'
    })
    .expect("Content-Type",/json/)
    .expect(200)
 expect(response.body).toEqual(
        expect.objectContaining({ 
            title:'Blodborne'
        })
 )
}) 


it('GET /games return array with object with all games',async()=>{
    const response=await request(app)
    .get('/games')
    .expect("Content-Type",/json/)
    .expect(200)

 expect(response.body).toEqual(
    expect.arrayContaining([
        expect.objectContaining({
            title:expect.any(String)
        })
    ])
 )
})

it('GET /games/id return game object when give especific id',async()=>{
    const game=await Games.find({title:'Blodborne'})
    gameId=game[0]._id
    const response=await request(app)
    .get(`/games/${gameId}`)
    .expect("Content-Type",/json/)
    .expect(200)
    expect(response.body).toEqual(expect.objectContaining({
        title:'Blodborne'
    }))
})



it('PUT /game, update the details of the game',async()=>{
      const game=await Games.find({title:'Blodborne'})
    gameId=game[0]._id

    const response=await request(app)
    .put(`/game/${gameId}`)
    .send({title:'Blodbornes'})
    .expect("Content-Type",/json/)
    .expect(200)
 expect(response.body).toEqual( expect.arrayContaining([
    expect.objectContaining({
        title:'Blodbornes'
    })
]))
})

it('PUT /game, update the details of the game',async()=>{
    const game=await Games.find({title:'Blodbornes'})
  gameId=game[0]._id

  const response=await request(app)
  .put(`/game/${gameId}`)
  .send({title:'Blodborne'})
  .expect("Content-Type",/json/)
  .expect(200)
expect(response.body).toEqual( expect.arrayContaining([
  expect.objectContaining({
      title:'Blodborne'
  })
]))
})

it('DELETE /game, delete especified game',async()=>{
    const game=await Games.find({title:'Blodborne'})
    gameId=game[0]._id
    const response=await request(app)
    .post(`/games/delete/${gameId}`)
    .expect("Content-Type",/json/)
    .expect(200)
 expect(response.body).not.toEqual( expect.arrayContaining([
    expect.objectContaining({
        title:'Blodborne'
    })
]))
})
it('POST /logout,destroying the token and loggin out',async()=>{
    const response=await request(app)
    .post('/logout')
    .expect("Content-Type",/json/)
    .expect(200)
 expect(response.body).toEqual('Succes!')
 
})

it('POST /games,you cant add games because you do not have the permission to do so',async()=>{
    const response=await request(app)
    .post('/games')
    .set({token:true})
    .send({
        title:'Blodborne',
    })
    .expect("Content-Type",/json/)
    .expect(401)
 expect(response.body).toEqual({user:undefined})
}) 