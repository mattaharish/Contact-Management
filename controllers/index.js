
const app =  require('express')
const indexRouter = app.Router()
const contacts = require('./contacts.controller')
const users = require('./users.controller');

indexRouter.use('/users', users)
indexRouter.use('/contacts', contacts)

module.exports = indexRouter
