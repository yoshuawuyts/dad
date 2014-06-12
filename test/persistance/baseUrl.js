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
  it('should catch errors', function (done) {
    var books = store('books');

    books.baseUrl.bind(books, 123).should.throw('url should be a string');

    done();
  });
  it('should save an url', function (done) {
    var books = store('books');

    books.baseUrl('api.mysite.dev');
    books.url.should.eql('api.mysite.dev');

    done();
  });
});