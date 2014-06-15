/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var should = require('should');
var store = require ('../..');

/**
 * Test
 */

describe('.baseUrl()', function () {
  it('should catch errors', function () {
    var books = store('books');

    books.baseUrl.bind(books, 123).should.throw('Url should be a string');
  });
  it('should save an url', function () {
    var books = store('books');

    books.baseUrl('api.mysite.dev');
    books.url.should.eql('api.mysite.dev');
  });
});