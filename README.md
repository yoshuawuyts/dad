# Dad

[![Build Status](https://travis-ci.org/yoshuawuyts/dad.svg)](https://travis-ci.org/yoshuawuyts/dad)
[![Coverage Status](https://coveralls.io/repos/yoshuawuyts/dad/badge.png)](https://coveralls.io/r/yoshuawuyts/dad)

Data micro-framework. Best used with [browserify](https://github.com/substack/node-browserify). WIP

## Installation
````
npm i --save dad
````

### [Documentation](https://github.com/yoshuawuyts/dad/tree/master/docs/methods.md) &nbsp;&nbsp;&nbsp; [Submit Issue](https://github.com/yoshuawuyts/dad/issues)

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

## Overview
````js
/**
 * Create a store.
 */

var store = require('dad');
var books = store('books');

/**
 * Define the model attributes.
 */

books
  .attr('title', {type: 'string', required: true})
  .attr('author', {type: 'string', required: true})
  .attr(pages, {type: 'number'});

/**
 * Define the server endpoints.
 */

books.baseUrl('api.mysite.com/books');

/**
 * Transact data.
 */

books.add({title: 'Ferrets', author: 'Tobi', pages: 12});
books.update({cid: 0, title: 'Lizards', author: 'Tobi', pages: 12});
books.get(0);
// -> {cid: 0, title: 'Lizards', author: 'Tobi', pages: 12}
books.delete(0);

/**
 * Persist records to the server.
 */

books.save();
books.fetch();
````

## License
[MIT](https://tldrlegal.com/license/mit-license) © [Yoshua Wuyts](yoshuawuyts.com)
