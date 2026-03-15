import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import fs from 'fs'
import  { UserController, PostController } from './controllers/index.js'
import { registerValidation, loginValidation, postCreateValidation } from './validations/validations.js'
import {checkAuth, handleValidationErrors} from './utils/index.js'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {console.log('DB OK')})
    .catch((err)=> console.log('DB Error', err))

const app = express()

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads')
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.replace(/\s+/g, '_')
        cb(null, Date.now() + '_' + name)
    }
})

const upload = multer({ storage })

app.use(express.json())
app.use(cors())
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.get('/auth/me', checkAuth, UserController.getMe)
app.post('/auth/register',  registerValidation, handleValidationErrors, UserController.register)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})
app.use('/uploads', express.static('uploads'))

app.get('/tags', PostController.getLastTags)
app.get('/posts/tags', PostController.getLastTags)

app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update)

app.listen(4000, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server OK')
})


// nodemon, node, js, express, jsonwebtoken JWT, mongoose, express-validator, bcrypt, multer, cors