# Dad
> Data micro-framework. Best used with [browserify](https://github.com/substack/node-browserify). WIP

[![Build Status](https://travis-ci.org/yoshuawuyts/dad.svg)](https://travis-ci.org/yoshuawuyts/dad)
[![Coverage Status](https://coveralls.io/repos/yoshuawuyts/dad/badge.png)](https://coveralls.io/r/yoshuawuyts/dad)
### [Documentation](https://github.com/yoshuawuyts/dad/tree/master/docs/methods.md) &nbsp;&nbsp;&nbsp; [Submit Issue](https://github.com/yoshuawuyts/dad/issues)

## Installation
````
npm i --save dad
````

## Progress
### Implemented
````js
.attr()         // Define an attribute on the model.
.add()          // Save records to store.
.get()          // Get records from the store.
````

### Pending
````js
.hasMany()      // Define another model as an attribute.
.baseUrl()      // set base url
.url()          // set partial url
.remove()       // delete content at id
.update()       // update data at id
.sync()         // sync data with server
.toJSON()       // get contents as JSON
.validate()     // validate contents
.prune()        // remove items without references
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

## License
[MIT](https://tldrlegal.com/license/mit-license) © [Yoshua Wuyts](yoshuawuyts.com)
