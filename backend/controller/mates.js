import {getFriends,getfriend,addFriend,deleteFriend, updateFriend,addUser} from '../models/database.js'
export default {
    getMany: async(req,res)=>{
        res.send(await getFriends())
        },
    addData: async(req,res)=>{
        // desturcting with [] works with the postion 
        // creating two variables and assigning data to it 
        const {name,age}=req.body
        const post = await addFriend(name,age)
        // takes in mulitple data types and sends data 
        res.send(await getFriends())
        // const name = req.body.name ... this way is long and repetitive 
        // const age = req.body.age

        },
     getSpecific:async(req,res)=>{
         res.send(await getfriend(+req.params.id))
         },
    updateData: async(req,res)=>{
        // get the data before we make changes to the data
        const [friend] = await getfriend(+req.params.id)
        // needs to be let so can be changed 
        let {name,age}=req.body
        // ternary opporator .. if name/age is is true then display everything before the [?] if false then display everything after 
        name ? name=name: {name}=friend
        age ? age=age: {age}=friend
        await updateFriend(name,age,+req.params.id)
        //setting to json data and sending 
        res.json(await getFriends())
         },
    deleteData: async(req,res)=>{
        res.send(await deleteFriend(req.params.name))
        }


}