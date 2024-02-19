import express from 'express'
import {config} from 'dotenv'
import cors from 'cors'
import friendsRouter from './routes/mates.js'
import bcrypt from 'bcrypt'
import {getFriends,getfriend,addFriend,deleteFriend, updateFriend,addUser,checkUser} from './models/database.js'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
config()

const PORT=process.env.PORT

const app=express()

// allow anyone to actually use the data .. 
app.use(cors({
    // origin will be website localhost for frontend
    origin:'http://localhost:8080',
    credentials:true
}))

// allows us acknowlege json data
app.use(express.json())

app.use(express.static('views'))
// dont need path of friends in friends.js .. since we writting this app.use(...)
// app.use('/friends',authenicate,friendsRouter)

app.use (cookieParser())



// app.post('/login',(req,res)=>{
//     // const{username}=req.body
//     // const token = jwt.sign({username:username},process.env.SECRET_KEY,{expiresIn:'1h'})
//     // res.cookie('jwt',token)
//     res.json({
//         // token:token
//         msg:"you have logged in "
//     })
// })

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

// params (req,res,next) tells its middleware
const auth =async(req,res,next)=>{
    // getting username and passsword from user
    const {password,username}= req.body
    const hashedPassword=await checkUser(username)
    bcrypt.compare(password,hashedPassword,(err,result)=>{
        if (err) throw err
        if(result===true){
            const {username} = req.body
            const token = jwt.sign({username:username}, //json web token do no authenticate but they allow the user access as long as they hav a token
            process.env.SECRET_KEY,{expiresIn:'1h'}) //secret key is in the .env file
            // true only backend can access
            // res.cookie('jwt',token,{httpOnly:false})   
            res.send({
                // key name,value of the key
                token:token,
                msg:"you have logged in"
            }) 
           next()
        }else{
            res.send({msg:'The username or password is incorrect'})
        }
    })
}
// using post because sending data.. cant use get 
app.post('/login',auth,(req,res)=>{
//     res.send({
//         msg:"you have logged in"
//     })
 })
const authenicate = (req,res,next) =>{
    let {cookie}= req.headers
    let tokenInHeader=cookie && cookie.split('=')[1]
    if (tokenInHeader===null)res.sendStatus(401)
    jwt.verify(tokenInHeader,process.env.SECRET_KEY,
    (err,user)=>{
        if(err) return res.sendStatus(403)
        req.user=user
        next()
    } )
    // console.log(tokenInHeader);
}

app.use('/friends',authenicate,friendsRouter)
 
// jwt.verify(token,'my_secret_key',(err,user)=>{
//     // if no acess
//     if(err)return res.sendStatus(403)
//     // access
//     req.user=usernext()
// })

//deletes the cookie
// app.delete('/logout',(req,res)=>{
//     res.clearCookie('jwt')
//     res.send({
//         msg:'Your have logged out'
//     })
// })

app.listen(PORT,()=>{ 
    console.log(`This is running on http://localhost:${PORT}`);
})


