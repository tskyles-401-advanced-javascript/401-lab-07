'use strict';

const {server} = require('../lib/server');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('web server', () => {

  it('should respond with a 500 error', () => {
    return mockRequest.get('/bad')
      .then(results => {
        expect(results.status).toBe(500);
      }).catch(console.error);
  });

  it('should respond with 404 on invalid route', () => {
    return mockRequest.get('/wrong')
      .then(results => {
        expect(results.status).toBe(404);
      }).catch(console.error);
  });
  
  describe('product routes', () => {
    it('should respond properly on request to /products', () => {
      return mockRequest.get('/products')
        .then(results => {
          expect(results.status).toBe(200);
        }).catch(console.err);
    });
    it('Should contain database in the request body', async () => {
      return mockRequest.get('/products')
        .then(results => {
          expect(results.body.result[0].products.id).toEqual(1);
        }).catch(console.error);
    });
  
    it('Should post data in the database by sending back an ID of 2', async () => {
      return mockRequest.post('/products')
        .then(result => {
          expect(result.body.id).toEqual(2);
        }).catch(console.error);
    });
  
    it('Should successfully update data in the database', async () => {
      return mockRequest.put('/products/1')
        .then(result => {
          expect(result.body).toEqual({});
        }).catch(console.error);
    });
  
    it('Should successfully delete data from the database', async () => {
      return mockRequest.delete('/products/1')
        .then(result => {
          expect(result.body).toEqual({});
        }).catch(console.error);
    }); 
  });
  describe('category routes', () => {
    it('should respond properly on request to /categories', () => {
      return mockRequest.get('/categories')
        .then(results => {
          expect(results.status).toBe(200);
        }).catch(console.err);
    });
    it('Should contain database in the request body', async () => {
      return mockRequest.get('/categories')
        .then(results => {
          expect(results.body.result[0].categories.id).toEqual(1);
        }).catch(console.error);
    });
  
    it('Should post data in the database by sending back an ID of 2', async () => {
      return mockRequest.post('/categories')
        .then(result => {
          expect(result.body.id).toEqual(2);
        }).catch(console.error);
    });
  
    it('Should successfully update data in the database', async () => {
      return mockRequest.put('/categories/1')
        .then(result => {
          expect(result.body).toEqual({});
        }).catch(console.error);
    });
  
    it('Should successfully delete data from the database', async () => {
      return mockRequest.delete('/categories/1')
        .then(result => {
          expect(result.body).toEqual({});
        }).catch(console.error);
    }); 
  });

});