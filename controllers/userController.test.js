const request=require('supertest')
const app=require('../app') 

const users=[
    {id:'1',username:'user1',password:'senha'},
    {id:'2',username:'user2',password:'senha'},
    {id:'3',username:'user3',password:'senha'}
  ]

/* it('POST /sigin,add the info on the users array',async()=>{
    const response=await request(app)
    .post('/signin')
    .send({
        username:'user4',
        password:'senha'
    })
    .expect("Content-Type",/json/)
    .expect(200)
 expect(response.body).toEqual( 
    expect.objectContaining({
        username:'user4'
    })
)
})  */

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

it('POST /login,if the username isnt on the users array, then return apropiate error message',async()=>{
    const response=await request(app)
    .post('/login')
    .send({
        username:'us',
        password:'senha'
    })
    .expect("Content-Type",/json/)
    .expect(401)
 expect(response.body).toEqual({errorMessage:"Username doesnt exist!"})
})
it('POST /login,if the password doenst match the username, then return apropiate error message',async()=>{
    const response=await request(app)
    .post('/login')
    .send({
        username:'user1',
        password:'senhass'
    })
    .expect("Content-Type",/json/)
    .expect(401)
 expect(response.body).toEqual({errorMessage:"Password doesnt match!"})
})


it('GET /login, retunr the user info',async()=>{
    const response=await request(app)
    .get('/login')
    .expect("Content-Type",/json/)
    .expect(200)
 expect(response.body).toEqual({user:true})
})

it('POST /logout,destroying the token and loggin out',async()=>{
    const response=await request(app)
    .post('/logout')
    .expect("Content-Type",/json/)
    .expect(200)
 expect(response.body).toEqual('Succes!')
 
})

it('GET /login,does not return the user info if you do  not have token',async()=>{
    const response=await request(app)
    .get('/login')
    .set({token:true})
    .expect("Content-Type",/json/)
    .expect(401)
 expect(response.body).toEqual({user:undefined})
  
})  


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
/*

it('DELETE /sigin,Delete the user',async()=>{
    const response=await request(app)
    .delete('/signin')
    .query({ id: '4' })
    .expect("Content-Type",/json/)
    .expect(200)
    expect(response.body).not.toEqual( expect.arrayContaining([
        expect.objectContaining({
            username:'user4',
            id:'4'
        })
    ]))
})  */