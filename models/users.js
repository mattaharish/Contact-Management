'use strict'

const { userSafeQuery } = require('./index')
const { insertQuery } = require('../helpers/dbhelper')

module.exports = {
  'createUser': async (userDetails) => {
    const [insertString, values] = insertQuery(userDetails)
    const query = 'INSERT INTO `users`' + insertString;
    console.log(query)
    try {
      console.debug('Executing ', query)
      await userSafeQuery(query, values)
    } catch (ex) {
      console.error(ex)
      throw ex
    }
  },

  'login': async (email) => {
    const query = 'select * from `users` where `email` = ?';
    try {
      console.debug('Executing ', query)
      const user = await userSafeQuery(query, email)
      return user
    } catch (ex) {
      console.error(ex)
      throw ex
    }
  },
}
