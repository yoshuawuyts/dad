/**
 * Module dependencies
 */

var debug = require('debug')('dad:transaction');
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

exports.add = function(record, cb) {
  assert(record instanceof Object || '[object Array]' == Object.prototype.toString.call(record),
    'Store.add: argument should be an object, or an array of Objects'
  );
  assert(cb instanceof Function || cb == undefined, 'Callback should be a function');

  // add a single record to the store
  if ('[object Array]' != Object.prototype.toString.call(record)) {
    assert(this._store[record.cid] == undefined, 'store.add cannot overwrite records');

    // assign a cid if applicable
    record = record.cid ? record : assignCid.call(this, record);

    // save data to store
    var transaction = {
      action: 'add',
      data: record
    };
    debug('Added a record to \'' + this._name + '\'', record);
    this._store[record.cid] = record;
    this._transactions.push(transaction);
    this.emit('change', record);
    return this;
  }

  // add an array of records to the store
  record.forEach(function(recordZero) {
    assert(undefined == this._store[record.cid], 'store.add cannot overwrite records');

    // assign a cid if applicable
    recordZero = recordZero.cid ? recordZero : assignCid.call(this, recordZero);

    // save data to store
    this._store[recordZero.cid] = recordZero;
  }.bind(this));

  var transaction = {
    action: 'add',
    data: record
  };
  debug('Added records to \'' + this._name + '\'', record);
  this._transactions.push(transaction);
  this.emit('change', record);
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
  assert(this._store[cid], 'Could not find object with cid: ' + cid);
  debug('Got a record from \'' + this._name + '\'', this._store[cid]);
	return this._store[cid];
};

/**
 * Update a record.
 *
 * @param {Object} record
 * @api public
 */

exports.update = function(record) {
  assert(null != record.cid, 'Provide an object with a cid as an argument');
  assert(null != this._store[record.cid], 'The cid \'' + record.cid + '\' could not be found');
  debug('Updated a record in \'' + this._name + '\'', record);

  var transaction = {
    action: 'update',
    data: record
  };
  this._transactions.push(transaction);
  this._store[record.cid] = record;
  this.emit('change', record);
}

/**
 * Remove a record at 'cid'.
 *
 * @param {Number} cid
 * @api public
 */

exports.remove = function(cid) {
  assert('number' == typeof cid, 'Provide a cid as an argument');
  assert(undefined != this._store[cid], 'The cid \'' + cid + '\' could not be found');
  debug('Removed a record from \'' + this._name + '\'', this._store[cid]);

  var transaction = {
    action: 'remove',
    data: this._store[cid]
  };
  this._transactions.push(transaction);
  delete this._store[cid];
  this.emit('change', cid);
}

/**
  * Assign a `cid` to a record
  *
  * @param {Object} record
  * @return {Object}
  * @api private
  */

function assignCid(record) {
  record.cid = this._cidCount;
  this._cidCount++;
  return record;
}
