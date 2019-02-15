'use strict'

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const usersRouter = require('express').Router()
const { generate } = require('../helpers/response')
const userModel = require('../models/users')


const createUserRecord = async (req, res) => {
  const { details } = req.body
  if (!details || !Object.keys(details).length) {
    const err = 'Invalid or empty details to add'
    console.error(err)
    return res.status(400).json(generate(err, 'failed', null))
  }
  details.password = bcrypt.hashSync(details.password, 10)
  try {
    await userModel.createUser(details)
    res.sendStatus(201)
  } catch (ex) {
    console.error(ex)
    res.status(404).json(generate(ex, 'failed', null))
  }
}

const userLogin = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    const err = 'Invalid or empty login details'
    console.error(err)
    return res.status(400).json(generate(err, 'failed', null))
  }
  try {
    const user = await userModel.login(email)
    if (!Array.isArray(user) || !user.length) {
      throw 'Incorrect Username'
    }

    const match = bcrypt.compareSync(password, user[0].password)
    if (match) {
      const token = jwt.sign({
        'id': user[0].id
      }, global.config.secret, {
        expiresIn: global.config.tokenExpiry
      })

      const responseObject = { token }
      res.status(200).json(generate(null, 'success', responseObject))
    } else {
      throw 'Incorrect Password';
    }
  } catch (err) {
    console.error(err)
    res.status(404).json(generate(err, 'failed', null))
  }
}

usersRouter.post('/login', userLogin)

// usersRouter.use(authenticate())
usersRouter.post('/', createUserRecord)

module.exports = usersRouter
