// import dependencies 
import mysql from 'mysql2'
import { config } from 'dotenv'
config()
// declare database mysql info
// pool remembers and stores connection made .. taking in obj
const  pool=mysql.createPool({
    // link it will be hosted with
    host:process.env.HOST,
    user:process.env.USER,
    // password of database
    password:process.env.PASSWORD,
    // name of database want to work with
    database:process.env.DATABASE

}).promise()
 
// everything needs to go into function 
const getFriends = async()=>{
    // query will be declared to this variable .. query is what we want to send to get data
    // by putting [] around results gets first results from array using destructuring 
    const [result] = await pool.query(`
    SELECT *
    FROM mates`)
    return result
}
// console.log(await getFriends());

const getfriend = async(id)=>{
    // prepared statement 
    // first param is the query itself
    const [result] = await pool.query(`
    SELECT * 
    FROM mates
    WHERE id = ?`,[id])
    return result
}
// console.log(await getfriend(3));

// function to add new friend 
const addFriend= async(name,age)=>{
    // async function .. thats why need to add await 
    const [friend]= await pool.query(`
    INSERT INTO mates(name,age) VALUES (?,?)`,[name,age])
    // shows only one specific person added
    return getfriend(friend.insertId)
}

const deleteFriend=async(name)=>{
    const [friend] = await pool.query(`
    DELETE FROM MATES
    WHERE name = ?`,[name])
    return getFriends(friend)
}

const updateFriend=async(name,age,id)=>{
    const [friend]=await pool.query(`
    UPDATE mates
    SET name=?, age=? 
    WHERE id=?`,[name,age,id])
    return friend

}

const addUser = async(username,password)=>{
     await pool.query(`
    INSERT INTO users (username,password)
     VALUES(?,?)`,[username,password])
}

const checkUser = async(username)=>{
    const [[{password}]]= await pool.query(`
    SELECT password From users WHERE username =?`,[username])
        return password
    } 

// console.log(await checkUser('warren'));
// console.log(await deleteFriend('laze'));

export {getFriends,getfriend,addFriend,deleteFriend,updateFriend,addUser,checkUser}