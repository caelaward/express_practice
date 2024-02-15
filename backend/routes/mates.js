import express from 'express';
// has double dot since have to get out of the friends file and access the database.js
import {getFriends,getfriend,addFriend,deleteFriend, updateFriend} from '../models/database.js'
import controller from '../controller/mates.js'
// picked up as web app ... 
const router = express.Router()

router
    .route('/') 
        .get(controller.getMany)
        .post(controller.addData)
        
        router
        .route('/:id')
        .get(controller.getSpecific)
        
        .patch(controller.updateData)

router
    .route('/:name')    
        .delete(controller.deleteData)

// common js = modules.exports = router

export default router
