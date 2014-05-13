# Methods

__Load dad__
````js
var dad = require('dad');
var resource = dad();
````

__Create a new 'resource'__
````js
var Chapters = resource('chapters')
  .attr('title', {type: 'string', required: true})
  .attr('content', {type: 'string'})
  .sync(['localStorage', 'webSockets'])
  .url('/chapters')

var Books = resource('books')
  .attr('title', {type: 'string', required: true})
  .attr('author', {type: 'string', required: true})
  .attr('pages', {type: 'number'})
  .sync(['localStorage', 'webSockets'])
  .children(Chapters)
  .url('/books')
````

__Add an entry to the resource__
TODO: Think about how to store nested objects within the 'collection' metaphor.
````js
var books = new Books;

books
  .title('Dad jokes')
  .author('Yoshua Wuyts')
  .pages(12)
````