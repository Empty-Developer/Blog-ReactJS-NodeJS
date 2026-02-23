import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { validationResult } from 'express-validator'

import { registerValidation } from './validations/auth.js'

import UserModel from './models/User.js'

mongoose
    .connect('mongodb+srv://emptypageworking_db_user:f0lSrhC2uu7TsKYb@cluster0.n2nmvvm.mongodb.net/blog?appName=Cluster0')
    .then(() => {console.log('DB OK')})
    .catch((err)=> console.log('DB Error', err))

const app = express()

app.use(express.json())



app.post('/auth/register', registerValidation, async (req, res) => {
    try {
        const errors =validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }

    const password = req.body.password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        passwordHash: hash,
        avatarURL: req.body.avatarURL,
    })

    const user = await doc.save()

    const token = jwt.sign({
        _id: user._id,
    },
    
    'secret123',
    {
        expiresIn: '30d',
    })

    const {passwordHash, ...userData} = user._doc

    res.json({
        ...userData,
        token,
    })
    } catch(err) {
        res.status(500).json({
            message: 'Failed to register'
        })
    }
})

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server OK')
})


// nodemon, node, js, express, jsonwebtoken JWT, mongoose, express-validator, bcrypt