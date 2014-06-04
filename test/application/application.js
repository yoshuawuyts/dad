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
  it('should initialize empty objects', function (done) {
    var books = store('books');
    books.store.should.be.empty;
    books.model.should.be.empty;
    done();
  });

  it('should initialize with a \'name\'', function (done) {
    var books = store('books');
    books.name.should.eql('books');

    var something = store();
    something.name.should.eql('');
    done();
  });
/*
  it('should initialize with an event system', function (done) {
    done();
  });
*/
});