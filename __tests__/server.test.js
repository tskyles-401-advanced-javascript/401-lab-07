'use strict';

const {server} = require('../lib/server');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('web server', () => {

  xit('should respond with a 500 error', () => {
    let consoleSpy;
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    return mockRequest.get('/bad')
      .then(results => {
        expect(results.status).toBe(500);
        expect(consoleSpy).toHaveBeenCalled();
      }).catch(console.error);
  });

  it('should respond with 404 on invalid route', () => {
    return mockRequest.get('/wrong')
      .then(results => {
        expect(results.status).toBe(404);
      }).catch(console.error);
  });

  it('should respond properly on request to /products', () => {
    return mockRequest.get('/products')
      .then(results => {
        expect(results.status).toBe(200);
      }).catch(console.err);
  });
});