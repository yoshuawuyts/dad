# Dad

[![Build Status](https://travis-ci.org/yoshuawuyts/dad.svg)](https://travis-ci.org/yoshuawuyts/dad)
[![Coverage Status](https://coveralls.io/repos/yoshuawuyts/dad/badge.png)](https://coveralls.io/r/yoshuawuyts/dad)

Data micro-framework. WIP

## Installation
````bash
$ npm i --save dad
````

## Progress
### Implemented
````js
dad()           // Create a named store
.attr()         // Define an attribute on the model.
.add()          // Save records to store.
.get()          // Get records from the store.
````
### Pending
````js
.hasMany()      // Define a store as an attribute on the model.
.baseUrl()      // Define the base url for store server persistance.
.url()          // Define the url per action.
.add()          // Save a record or an array of records to the store.
.get()          // Get a record from the store at `cid`.
.update()       // Update a record at `cid`.
.remove()       // Remove a record from the store at `cid`.
.save()         // Persist the record changes to the server over HTTP.
.fetch()        // Fetch records from the server over HTTP.
.validate()     // Validate record compliance with the model.
````
### Under consideration
````js
.sync()         // Synchronize data with the server over HTTP.
.adapters()     // Define synchronization adapters to be called
.prune()        // Remove records with an empty reference count.
.toJSON()       // Get records as JSON.
````

## Example
````js
var store = require('dad');
var books = store('books');

// attributes

books
  .baseUrl('api.mysite.com/books')
  .attr('title', {type: 'string', required: true})
  .attr('author', {type: 'string', required: true})
  .attr(pages, {type: 'number'});

// transactions

books.add({title: 'Ferrets', author: 'Tobi', pages: 12});
books.update({cid: 0, title: 'Lizards', author: 'Tobi', pages: 12});

// persist changes to server

books.save();
books.fetch();
````

## References
- [Issues](https://github.com/yoshuawuyts/dad/issues)
- [Documentation](https://github.com/yoshuawuyts/dad/tree/master/docs/methods.md)

## License
[MIT](https://tldrlegal.com/license/mit-license) © [Yoshua Wuyts](yoshuawuyts.com)
