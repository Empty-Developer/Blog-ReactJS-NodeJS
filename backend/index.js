import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { validationResult } from 'express-validator'
import { registerValidation } from './validations/auth.js'

mongoose
    .connect('mongodb+srv://emptypageworking_db_user:f0lSrhC2uu7TsKYb@cluster0.n2nmvvm.mongodb.net/?appName=Cluster0')
    .then(() => {console.log('DB OK')})
    .catch((err)=> console.log('DB Error', err))

const app = express()

app.use(express.json())

app.post('/auth/register', registerValidation, (req, res) => {
    const errors =validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }

    res.json({
        success: true,
    })
})

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server OK')
})


// nodemon, node, js, express, jsonwebtoken JWT, mongoose, express-validator