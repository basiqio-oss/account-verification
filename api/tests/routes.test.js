const request = require('supertest')
const app = require('../app')

describe('Ping endpoint', () => {
  it('Should return pong', async () => {
    const res = await request(app)
      .get('/api/ping')
    expect(res.statusCode).toEqual(200)
    expect(res.text).toEqual('pong')
  })
})