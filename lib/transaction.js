var assert = require('assert');

/**
 * Save a record or an array of records to the store.
 *
 * TODO: implement reference counting as shown in: 
 * https://developers.soundcloud.com/blog/building-the-next-soundcloud/
 *
 * @params {Object | Object[]} record
 * @api public
 */

exports.add = function(record) {
  assert('object' == typeof record || '[object Array]' == Object.prototype.toString.call(record), 
    'Store.add: argument should be an object, or an array of Objects'
  );
    
  // update store with a single record
  if ('[object Array]' != Object.prototype.toString.call(record)) {
    assert(this.store[record.cid] == undefined, 'store.add cannot overwrite records');

    // assign a cid if applicable
    record = record.cid ? record : assignCid.call(this, record);

    // save data to store
    this.store[record.cid] = record;

    return this;
  }

  // update store with an array of records
  record.forEach(function(recordZero) {
    assert(this.store[record.cid] == undefined, 'store.add cannot overwrite records');

    // assign a cid if applicable
    recordZero = recordZero.cid ? recordZero : assignCid.call(this, recordZero);

    // save data to store
    this.store[recordZero.cid] = recordZero;
  }.bind(this));

  return this;
};

/**
 * Get a record from the store at `cid`.
 *
 * @param {Number} cid
 * @return {Object}
 * @api public
 */

exports.get = function(arg) {
	return arg;
};


/**
* Assign a `cid` to a record
*
* @param {Object} record
* @return {Object}
* @api private
*/

function assignCid(record) {
record.cid = this.cidCount;
this.cidCount++;
return record;
};