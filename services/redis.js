'use strict'

const redis = require('redis')
const { promisify } = require('util')

const client = redis.createClient()
client.on('error', console.error.bind())

const redisSet = async (key, value, expiry = null) => {
  const set = promisify(client.set).bind(client)
  try {
    console.debug(`setting redis for key ${key} with values ${value}`)
    expiry ? await set(key, value, 'EX', expiry) : await set(key, value)
  } catch (ex) {
    throw ex
  }
}

const redisGet = async (key) => {
  const get = promisify(client.get).bind(client)
  try {
    console.debug(`getting redis value for key ${key}`)
    const value = await get(key)
    console.debug(`redis value for key ${key} is ${value}`)
    return value
  } catch (ex) {
    console.error(ex)
    throw ex
  }
}

const redisDel = async (key) => {
  const del = promisify(client.del).bind(client)
  try {
    console.debug(`Deleting key ${key} from redis`)
    await del(key)
  } catch (ex) {
    console.error(ex)
    throw ex
  }
}

const redisScan = (match) => {
  return new Promise((resolve, reject) => {
    let totalKeys = []
    let cursor = '0'
    function scan() {
      client.scan(cursor, 'MATCH', match, 'COUNT', '100', (err, res) => {
        if (err) {
          console.error(err)
          return reject(err)
        }
        cursor = res[0]
        const keys = res[1]

        if (keys.length > 0) {
          totalKeys = [...totalKeys, ...keys]
        }
        return cursor === '0' ? resolve(totalKeys) : scan()
      })
    }
    scan()
  })
}

module.exports = {
  redisGet,
  redisSet,
  redisDel,
  redisScan
}
