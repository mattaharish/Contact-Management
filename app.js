'use strict'

const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const indexRouter = require('./controllers')
const { createConnectionPool } = require('./models')

// Initiating config. Don't delete this line
require('./config/config')

const app = express()

// Initialize connection pool
createConnectionPool()

app.use(logger('short'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// set CORS
app.use(cors({ optionsSuccessStatus: 200 }))

// Configure routes
app.get('/ping', (req, res) => res.send('pong'))
app.use('/api/v1', indexRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

module.exports = app