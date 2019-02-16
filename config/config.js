'use strict'

const config = {
  "development": {
    "host": "localhost",
    "user": "root",
    "password": "matta",
    "database": "plivoc",
    "secret": "plivo_contact",
    "connectionLimit": 15,
    "tokenExpiry": 86400
  },
  "production": {
    "host": process.env.DATABASE_URL,
    "user": process.env.USER,
    "password": process.env.PASSWORD
  }
}

const { NODE_ENV = 'development' } = process.env

const environmentConfig = config[NODE_ENV]
const defaultConfig = config.development
const finalConfig = Object.assign(defaultConfig, environmentConfig)

console.log(finalConfig)

//setting global config
global.config = finalConfig