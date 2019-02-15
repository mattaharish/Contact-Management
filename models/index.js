'use strict'

const mysql = require('mysql')

const createPool = () => {
  const pool = mysql.createPool(global.config)
  global.ConnectionPools = pool
}

const safeQuery = (pool, sql, values = [], options = {}) => {
  return new Promise((resolve, reject) => {
    if (!pool) {
      return reject('Invalid connection pool')
    }

    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err)
      }
      const query = {
        sql,
        values,
        ...options
      }
      connection.query(query, (err, results) => {
        connection.release()
        err ? reject(err) : resolve(results)
      })
    })
  })
}

module.exports = {
  createConnectionPool: () => {
    createPool()
  },
  userSafeQuery: (...args) => (
    safeQuery(global.ConnectionPools, ...args)
  ),
}
