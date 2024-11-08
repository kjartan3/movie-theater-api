const express = require("express");
const router = express.Router();
const { Musician } = require("../models/index");
const { check, validationResult } = require('express-validator');

let users = [];

router.get('/', async (req, res) => {
    const users = await Musician.findAll({});
    res.json(users);
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const findUser = await Musician.findByPk(id);
        if (!findUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(findUser);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the user' });
    }
})

router.get('/:id/shows', [
    check('id').isInt().withMessage('User ID must be a number')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
})

router.put('/:id/shows/:showId', [
    check('id').isInt().withMessage('User ID must be a number'),
    check('showId').isInt().withMessage('Show ID must be a number'),
],  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
})


// router.post('/', [
//     check('username').isString().notEmpty().withMessage('Username is required'),
//     check('password').isString().notEmpty().withMessage('Password is required')
// ], (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ error: errors.array() });
//     }
//     const { username, password } = req.body;

//     const newUser = {
//         id: users.length + 1,
//         username,
//         password
//     };
//     users.push(newUser);
//     res.status(201).json(newUser);
// })

