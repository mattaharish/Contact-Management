const request = require('supertest');
const app = require('./../app');

let contactData = {
	"details":{
		"first_name":"Harish",
		"last_name":"Matta",
		"email":"haris@gmail.com",
		"mobile":"+1235525",
		"website":"matta.com",
		"company":"lol",
		"landline":"2222"
	}
}

describe('Contact APIs', () => {
  test('It should create a contact', (done) => {
    request(app)
      .post('/api/v1/contacts')
      .send(contactData)
      .set('Accept', 'application/json')
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTUwMjE3MDYyLCJleHAiOjE1NTAzMDM0NjJ9.oTfIqFt5n4boZu-yyY8Il3ykbCWV4MTrwOWAXRDr-OM')
      .expect(201)
      .then(res => {
        console.log(res.statusCode)
        done()
      })
  })

  // test('It should login', (done) => {
  //   request(app)
  //     .post('/api/v1/users/login')
  //     .send(loginData)
  //     .set('Accept', 'application/json')
  //     .expect(200)
  //     .then(res => {
  //       console.log(res.body.data.token)
  //       expect(res.body.data.token).toBeDefined()
  //       done()
  //     })
  // })
})