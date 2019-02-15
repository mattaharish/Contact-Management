'use strict'

const config = require('./config.json')
const { NODE_ENV = 'development' } = process.env

const environmentConfig = config[NODE_ENV]
const defaultConfig = config.development
const finalConfig = Object.assign(defaultConfig, environmentConfig)

//setting global config
global.config = finalConfig
