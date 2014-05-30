# Dad

[![Build Status](https://travis-ci.org/yoshuawuyts/dad.svg)](https://travis-ci.org/yoshuawuyts/dad)
[![Coverage Status](https://coveralls.io/repos/yoshuawuyts/dad/badge.png)](https://coveralls.io/r/yoshuawuyts/dad)

Data micro-framework. Best used with [browserify](https://github.com/substack/node-browserify). WIP

## Installation
````
npm i --save dad
````

### [Documentation](https://github.com/yoshuawuyts/dad/tree/master/docs/methods.md) &nbsp;&nbsp;&nbsp; [Submit Issue](https://github.com/yoshuawuyts/dad/issues)

## Overview
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

## License
[MIT](https://tldrlegal.com/license/mit-license) © [Yoshua Wuyts](yoshuawuyts.com)
