const request=require('supertest')
const app=require('../app') 

const allGames = [
    { id: '1', title: 'Elden Ring' }, 
    { id: '2', title: 'Dark Souls' }, 
    { id: '3', title: 'Blodborne' }
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
 expect(response.body).toEqual( expect.arrayContaining([
    expect.objectContaining({
        username:'user3'
    })
]))
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
    const response=await request(app)
    .get('/games/1')
    .query({ id: '1' })
    .expect("Content-Type",/json/)
    .expect(200)
    expect(response.body).toEqual({ id: '1', title: 'Elden Ring' })
 
})

it('POST /games,add new game object on the allGames array,then return array with object with all games',async()=>{
    const response=await request(app)
    .post('/games')
    .send({
        title:'Divinity',
        id:4
    })
    .expect("Content-Type",/json/)
    .expect(200)
 expect(response.body).toEqual(
    expect.arrayContaining([
        expect.objectContaining({
            title:'Divinity'
        })
    ])
 )
})

it('PUT /game, update the details of the game',async()=>{
    const response=await request(app)
    .put('/game/4')
    .send({
        title:'Divinity',
        id:'4'
    })
    .expect("Content-Type",/json/)
    .expect(200)
 expect(response.body).toEqual( expect.arrayContaining([
    expect.objectContaining({
        title:'Divinity',
        id:'4'
    })
]))
})

it('DELETE /game, delete especified game',async()=>{
    const response=await request(app)
    .delete('/games/4')
    .expect("Content-Type",/json/)
    .expect(200)
 expect(response.body).not.toEqual( expect.arrayContaining([
    expect.objectContaining({
        title:'Divinity',
        id:4
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
        title:'Divinity',
        id:4
    })
    .expect("Content-Type",/json/)
    .expect(401)
 expect(response.body).toEqual({user:undefined})
})