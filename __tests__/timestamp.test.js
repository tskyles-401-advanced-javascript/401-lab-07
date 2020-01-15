'use strict';

const timestamp = require('../lib/middleware/timestamp');

describe('timestamp middleware', () => {
  let req = {};
  let res = {};
  let next = jest.fn();

  it('should log time', () => {
    timestamp(req, res, next);
    expect(req.requestTime).toBeDefined();
  });

  it('properly moves to next', () => {
    timestamp(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});