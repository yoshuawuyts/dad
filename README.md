# Dad

[![Build Status](https://travis-ci.org/yoshuawuyts/dad.svg)](https://travis-ci.org/yoshuawuyts/dad)
[![Coverage Status](https://coveralls.io/repos/yoshuawuyts/dad/badge.png)](https://coveralls.io/r/yoshuawuyts/dad)

Data micro-framework.

## Methods
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
Visit [documentation](https://github.com/yoshuawuyts/dad/blob/master/docs/methods.md).

## Installation
With [node](nodejs.org) installed:

`````
npm i --save dad
````

## License
[MIT](https://tldrlegal.com/license/mit-license) © [Yoshua Wuyts](yoshuawuyts.com)
