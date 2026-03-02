import express from 'express'
import mongoose from 'mongoose'

import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'
import { registerValidation, loginValidation, postCreateValidation } from './validations/validations.js'

import checkAuth from './utils/checkAuth.js'

import dotenv from 'dotenv'
dotenv.config()

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {console.log('DB OK')})
    .catch((err)=> console.log('DB Error', err))

const app = express()

app.use(express.json())

app.post('/auth/login', loginValidation, UserController.login)
app.get('/auth/me', checkAuth, UserController.getMe)
app.post('/auth/register', registerValidation, UserController.register)

app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, PostController.update)


app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server OK')
})


// nodemon, node, js, express, jsonwebtoken JWT, mongoose, express-validator, bcrypt