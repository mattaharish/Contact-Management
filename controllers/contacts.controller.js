'use strict'

const contactsRouter = require('express').Router()
const authenticate = require('../middlewares/auth')
const { generate } = require('../helpers/response')
const { getContacts, getContact,
  createContact, updateContact, 
  deleteContact } = require('../models/contacts')

// getContactRecords -- api handler for retrieving all contacts
const getContactRecords = async (req, res) => {
  try {
    let offset = 0
    const { limit = 10, page = 1, search ='' } = req.query
    if(page > 1) {
      offset = page * limit
    }
    let contacts = await getContacts(offset, limit, search)
    res.status(200).json(generate(null, 'success', contacts))
  } catch (ex) {
    console.error(ex)
    res.status(404).json(generate(ex, 'success', null))
  }
}

// createContactRecord -- api handler for creating a contact
const createContactRecord = async (req, res) => {
  try {
    const { details } = req.body
    if (!details || !Object.keys(details).length) {
      throw 'Invalid or empty details to add'
    }
    await createContact(details)
    res.sendStatus(201)
  } catch (ex) {
    console.error(ex)
    res.status(404).json(generate(ex, 'failed', null))
  }
}

// getContactRecord -- api handler for retrieving a single contact
const getContactRecord = async (req, res) => {
  try {
    const { contactId } = req.params
    if (!contactId) {
      throw 'Invalid or empty ContactID'
    }
    const contact = await getContact(contactId)
    if (contact.length) {
      res.status(200).json(generate(null, 'success', contact[0]))
    } else {
      throw 'Record not found'
    }
  } catch (ex) {
    console.error(ex)
    res.status(404).json(generate(ex, 'failed', null))
  }
}

const updateContactRecord = async (req, res) => {
  try {
    const { contactId } = req.params
    if (!contactId) {
      throw 'Invalid or empty ContactId'
    }
    const { details } = req.body
    if (!details || !Object.keys(details).length) {
      throw 'Invalid or empty details to add'
    }
    await updateContact(contactId, details)
    res.sendStatus(200)
  } catch (ex) {
    console.error(ex)
    res.status(404).json(generate(ex, 'failed', null))
  }
}

const deleteContactRecord = async (req, res) => {
  try {
    const { contactId } = req.params
    if (!contactId) {
      throw 'Invalid or empty ContactId'
    }

    await deleteContact(contactId)
    res.sendStatus(200)
  } catch (ex) {
    console.error(ex)
    res.status(404).json(generate(ex, 'failed', null))
  }
}

// Authentiacting the requests
contactsRouter.use(authenticate())

contactsRouter.get('/', getContactRecords)
contactsRouter.get('/:contactId', getContactRecord)
contactsRouter.post('/', createContactRecord)
contactsRouter.patch('/:contactId', updateContactRecord)
contactsRouter.delete('/:contactId', deleteContactRecord)

module.exports = contactsRouter
