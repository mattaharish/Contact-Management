'use strict'

const { userSafeQuery } = require('./index')
const { updateQuery, insertQuery } = require('../helpers/dbhelper')

const getContacts = async (offset, limit, search) => {
  let query = "select * from `contacts_book` "
  if(search != '') {
    query = query + "where first_name like ? || last_name like ? || email like ? "
  }
  query = query +  "limit ? offset ?"

  try {
    console.debug('Executing ', query)
    search = "%" +search + "%"
    const contacts = await userSafeQuery(query, [search, search, search, limit, offset])
    console.debug('Execution result ', contacts)
    return contacts
  } catch (ex) {
    console.error(ex)
    throw ex
  }
}

const createContact = async (contactDetails) => {
  const [insertString, values] = insertQuery(contactDetails)
  const query = 'INSERT INTO `contacts_book` ' + insertString
  try {
    console.debug('Executing ', query)
    await userSafeQuery(query, values)
  } catch (ex) {
    console.error(ex)
    throw ex
  }
}

const getContact = async (contactId) => {
  const query = 'SELECT * FROM `contacts_book` WHERE `id` = ?'
  try {
    console.debug('Executing ', query)
    const contact = await userSafeQuery(query, contactId)
    console.debug('Execution result ', contact)
    return contact
  } catch (ex) {
    console.error(ex)
    throw ex
  }
}

const updateContact = async (contactId, contactDetails) => {
  const [updateString, values] = updateQuery(contactDetails)
  values.push(contactId)
  const query = 'UPDATE `contacts_book` ' + updateString + ' WHERE `id` = ?'
  try {
    console.debug('Executing ', query)
    await userSafeQuery(query, values)
  } catch (ex) {
    console.error(ex)
    throw ex
  }
}

const deleteContact = async (contactId) => {
  const query = 'DELETE from `contacts_book` WHERE `id` = ?'
  try {
    console.debug('Executing ', query)
    await userSafeQuery(query, [contactId])
  } catch (ex) {
    console.error(ex)
    throw ex
  }
}

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact
}
