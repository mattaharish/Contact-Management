const { userTests } = require('./users')
const { contactTests } = require('./contacts')

describe('User APIs', userTests)
describe('Contact APIs', contactTests)