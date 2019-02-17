const request = require('supertest');
const app = require('../app');

const mock = require('./mock')

const userTests = () => {
  test('It should respond to ping call', (done) => {
    request(app)
      .get('/ping')
      .then(res => {
        console.log(res.text)
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('pong');
        done()
      })
  })

  test('It should create a user', (done) => {
    request(app)
      .post('/api/v1/users')
      .send(mock.userData)
      .set('Accept', 'application/json')
      .expect(201)
      .then(res => {
        console.log(res.statusCode)
        done()
      })
  })

  test('It should login', (done) => {
    request(app)
      .post('/api/v1/users/login')
      .send(mock.loginData)
      .set('Accept', 'application/json')
      .expect(200)
      .then(res => {
        console.log(res.body.data.token)
        mock.token = res.body.data.token
        expect(res.body.data.token).toBeDefined()
        done()
      })
  })
}

module.exports = {
  userTests
}