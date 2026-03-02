import { body } from 'express-validator'

export const registerValidation = [
    body('email', 'Invalid email format').isEmail(),
    body('password', 'Password must be at least 5 character long').isLength({min: 5}),
    body('fullName', 'Enter your name').isLength({min: 3}),
    body('avatarURL', 'Invalid avatar link').optional().isURL(),
]

export const loginValidation = [
    body('email', 'Invalid email format').isEmail(),
    body('password', 'Password must be at least 5 character long').isLength({min: 5}),
] 

export const postCreateValidation = [
    body('title', 'Enter the article title').isLength({min: 3}).isString(),
    body('text', 'Enter the article text').isLength({min: 10}).isString(),
    body('tags', 'Invalid tags format').optional().isString(),
    body('imageURL', 'Invalid image link').optional().isString(),
] 