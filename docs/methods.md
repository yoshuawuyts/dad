# Methods

### Overview
````js
.attr()         // set model attribute
.add()          // add data to collection
.syncOrder()    // set sync methods
.sync()         // sync data with server
.children()     // set nested model
.toJSON()       // get contents as JSON
.delete()       // delete content at id
.sync()         // synchronize with server
.validate()     // validate contents
.baseUrl()      // set base url
.url()          // set partial url
.prune()        // remove items without references
````

### Initialize
````js
var dad = require('dad');
var resource = dad();
````

### .attr(name, {meta: value})
````js
var books = resource('books')
  .attr('title', {type: 'string', required: true})
  .attr('author', {type: 'string', required: true})
  .attr('pages', {type: 'number'})
````

### .add({attr: value})
````js
books
  .add({title: 'Fatherly jokes', author: 'Yoshua Wuyts', pages: 12})
  .sync();
````

### .syncOrder([methods])
````js
var books = resource('books')
  .sync(['localStorage', 'webSockets']);
````

### .children(function())
````js
var chapters = resource('chapters');

books
  .children(chapters);
````

### .baseUrl('postfix', 'prefix')
````js
books
  .baseUrl('/books', 'api')
// -> 'api.mysite.com/books'
````

### .url()
````js
// get baseUrl
books
  .url()
// -> 'api.mysite.com/books'

// get url of a certain id
books
  .url({id: 5})
// -> 'api.mysite.com/books/5'

// get url of a certain id + method
books
  .url({id: 5})
  .url('edit')
// -> 'api.mysite.com/books/5/edit'
````

### .prune()
````js
books.prune();
// -> {id: []}
````