/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var should = require('should');
var store = require ('../..');

/**
 * Test
 */

describe('dad()', function () {
  it('should initialize empty objects', function () {
    var books = store('books');

    books.store.should.be.empty;
    books.model.should.be.empty;
  });

  it('should initialize with a \'name\'', function () {
    var books = store('books');

    books.name.should.eql('books');

    var something = store();
    something.name.should.eql('');
  });

  it('should initialize with an event system', function () {
    var books = store('books');

    books.on.should.exist;
    books.emit.should.exist;
  });
});