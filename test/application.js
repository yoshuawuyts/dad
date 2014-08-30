/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var should = require('should');
var store = require ('../');
var books = store('books');

/**
 * Before each.
 */

beforeEach(function() {
  books = store('books');
});


/**
 * Test
 */

describe('dad()', function () {
  it('should initialize empty objects', function () {
    books._store.should.be.empty;
    books._model.should.be.empty;
  });

  it('should initialize with a \'name\'', function () {
    books._name.should.eql('books');

    var something = store();
    something._name.should.eql('');
  });

  it('should initialize with an event system', function () {
    books.on.should.exist;
    books.emit.should.exist;
  });
});