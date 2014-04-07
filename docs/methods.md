# Methods

__Load dad__
````js
/**
 * Module dependencies
 */

var dad = require('dad');
````

__dad.createResource()__
````js
/**
 * Create a new resource
 */

var books = dad.createResource({
  model: {
    title: 'string',
    author: 'string',
    pages: 'number',
    children: {
      chapters: 'number'
    }
  },
  sync: ['localStorage', 'webSockets'],
  url: '/books'
});
````

__books.add__
````js
/**
 * Add a new entry to the 'books' resource
 *
 * Validates the input before saving the data, if 
 * any errors occur the callback is executed and
 * the entry is not added.
 */

books.add({
  title: 'Dad Jokes',
  author: 'Yoshua Wuyts',
  pages: 12,
  children: {
    chapters: [29387, 29388, 29389, 29390]
  }
}, function(err) {
  // handle error
});
````