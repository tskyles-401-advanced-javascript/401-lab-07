'use strict';

const logger = require('../lib/middleware/logger');

describe('logger middleware', () => {
  let consoleSpy;
  let req = {};
  let res = {};
  let next = jest.fn();

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });
  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should log output', () => {
    logger(req, res, next);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('properly moves to next', () => {
    logger(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});