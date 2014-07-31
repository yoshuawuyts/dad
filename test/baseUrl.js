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

describe('.baseUrl()', function () {
  it('should catch errors', function () {
    books.baseUrl.bind(books, 123).should.throw('Url should be a string');
  });
  
  it('should save an url', function () {
    books.baseUrl('api.mysite.dev');
    books.url.should.eql('api.mysite.dev');
  });
});