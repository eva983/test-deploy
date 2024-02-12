const express = require('express')
const {signupUser, loginUser }= require('../controllers/userController')
const { model } = require('mongoose')
const router = express.Router()

//log in route 
router.post('/login',(loginUser))
//sign up route
router.post('/signup',(signupUser))


// // GET all Users
// router.get('/', getUsers)

// //GET a single User
// router.get('/:id', getUser)

// // POST a new User
// router.post('/', createUser)

// // DELETE a User
// router.delete('/:id', deleteUser)

// // UPDATE a User
// router.patch('/:id', updateUser)


module.exports=router