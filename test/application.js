/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var should = require('should');
var store = require ('..');

/**
 * Test
 */

describe('dad()', function () {
  it('should initialize empty objects', function (done) {
    var books = store('books');
    books.store.should.be.empty;
    books.model.should.be.empty;
    done();
  });

  it('should initialize a name property', function (done) {
    var books = store('books');
    books.name.should.eql('books');
    done();
  });
});