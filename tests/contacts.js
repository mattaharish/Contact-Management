const request = require('supertest');
const app = require('../app');

const mock = require('./mock')

const contactTests = () => {
  test('It should create a contact', (done) => {
    request(app)
      .post('/api/v1/contacts')
      .send(mock.contactData)
      .set('Accept', 'application/json')
      .set('Authorization', mock.token)
      .expect(201)
      .then(res => {
        console.log(res.statusCode)
        done()
      })
  })

  test('It should get all contacts', (done) => {
    request(app)
      .get('/api/v1/contacts')
      .set('Authorization', mock.token)
      .expect(200)
      .then(res => {
        console.log('__________________+++++', res.body.data[res.body.data.length - 1].id)
        mock.testContactId = res.body.data[res.body.data.length - 1].id
        console.log(res.body)
        done()
      })
  })

  test('It should get contact by id', (done) => {
    request(app)
      .get(`/api/v1/contacts/${mock.testContactId}`)
      .set('Authorization', mock.token)
      .expect(200)
      .then(res => {
        console.log(res.body)
        done()
      })
  })

  test('It should update contact', (done) => {
    request(app)
      .patch(`/api/v1/contacts/${mock.testContactId}`)
      .send(mock.updatedData)
      .set('Accept', 'application/json')
      .set('Authorization', mock.token)
      .expect(200)
      .then(res => {
        console.log(res.body)
        done()
      })
  })

  test('It should delete contact by id', (done) => {
    request(app)
      .delete(`/api/v1/contacts/${mock.testContactId}`)
      .set('Authorization', mock.token)
      .expect(200)
      .then(res => {
        console.log(res.body)
        done()
      })
  })
}

module.exports = {
  contactTests
}