import express from 'express'
import {config} from 'dotenv'
import cors from 'cors'
import friendsRouter from './routes/mates.js'
import bcrypt from 'bcrypt'
  import {getFriends,getfriend,addFriend,deleteFriend, updateFriend,addUser} from './models/database.js'

config()

const PORT=process.env.PORT

const app=express()

// allow anyone to actually use the data .. 
app.use(cors())

// allows us acknowlege json data
app.use(express.json())

app.use(express.static('views'))
// dont need path of friends in friends.js .. since we writting this app.use(...)
app.use('/friends',friendsRouter)

app.post('/users',(req,res)=>{ 
    console.log(req.body);
    const {username,password} = req.body
    bcrypt.hash(password,10,async(err,hash)=>{
        if (err) throw err
        await addUser(username,hash)
        res.send({
            msg:"you have created an account"

        } )
    })
})



app.listen(PORT,()=>{ 
    console.log(`This is running on http://localhost:${PORT}`);
})


