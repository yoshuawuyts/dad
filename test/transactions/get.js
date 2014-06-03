/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var should = require('should');
var store = require ('../..');

/**
 * Test
 */

describe('get', function () {
  it('should exist', function (done) {
    var books = store('books');
    books.get(12).should.eql(12);
    done();
  });
});