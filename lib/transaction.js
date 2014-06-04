/**
 * Module dependencies
 */

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
    
  // add a single record to the store
  if ('[object Array]' != Object.prototype.toString.call(record)) {
    assert(this.store[record.cid] == undefined, 'store.add cannot overwrite records');

    // assign a cid if applicable
    record = record.cid ? record : assignCid.call(this, record);

    // save data to store
    this.store[record.cid] = record;

    this.emit('add', record);
    return this;
  }

  // add an array of records to the store
  record.forEach(function(recordZero) {
    assert(undefined == this.store[record.cid], 'store.add cannot overwrite records');

    // assign a cid if applicable
    recordZero = recordZero.cid ? recordZero : assignCid.call(this, recordZero);

    // save data to store
    this.store[recordZero.cid] = recordZero;
  }.bind(this));

  this.emit('add', record);
  return this;
};

/**
 * Get a record from the store at 'cid'.
 *
 * @param {Number} cid
 * @return {Object}
 * @api public
 */

exports.get = function(cid) {
  assert('number' == typeof cid, 'Provide a number as an argument');
  assert(this.store[cid], 'Could not find object with cid: ' + cid);
	return this.store[cid];
};

/**
 * Update a record.
 *
 * @param {Object} record
 * @api public
 */

exports.update = function(record) {
  assert(undefined != record.cid, 'Provide an object with a cid as an argument');
  assert(undefined != this.store[record.cid], 'The cid \'' + record.cid + '\' could not be found');
  this.store[record.cid] = record;
  this.emit('update', record);
};

/**
 * Remove a record at 'cid'.
 *
 * @param {Number} cid
 * @api public
 */ 

exports.remove = function(cid) {
  assert('number' == typeof cid, 'Provide a cid as an argument');
  assert(undefined != this.store[cid], 'The cid \'' + cid + '\' could not be found');
  delete this.store[cid];
  this.emit('remove', cid);
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