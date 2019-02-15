const request = require('supertest');
const app = require('./../app');

let userData = {
  "details": {
    "email": "harish13@gmail.com",
    "password": "12345",
    "first_name": "harish",
    "last_name": "matta"
  }
}

let loginData = {
  "email": "harish@gmail.com",
  "password": "1234"
}

describe('Testing server started', () => {
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
})

describe('User APIs', () => {
  // test('It should create a user', (done) => {
  //   request(app)
  //     .post('/api/v1/users')
  //     .send(userData)
  //     .set('Accept', 'application/json')
  //     .expect(201)
  //     .then(res => {
  //       console.log(res.statusCode)
  //       done()
  //     })
  // })

  test('It should login', (done) => {
    request(app)
      .post('/api/v1/users/login')
      .send(loginData)
      .set('Accept', 'application/json')
      .expect(200)
      .then(res => {
        console.log(res.body.data.token)
        expect(res.body.data.token).toBeDefined()
        done()
      })
  })
})