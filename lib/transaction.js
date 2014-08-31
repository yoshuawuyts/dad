/**
 * Module dependencies
 */

var debug = require('debug')('dad:transaction');
var assert = require('assert');

/**
 * Get a record from the store at 'cid'.
 *
 * @param {Number} cid
 * @return {Object}
 * @api public
 */

exports.get = function() {
	return this._store;
};

/**
 * Save a record or an array of records
 * to the store and sync them through
 * _push() after that.
 *
 * Emits a 'change' event.
 *
 * @params {Object | Object[]} record
 * @api public
 */

exports.add = function(record, cb) {

  var recordError = 'Record should be an object or an array of objects';
  var overrideError = 'Store.add cannot overwrite records';
  var cbError = 'Cb should be a function';
  var objType = Object.prototype.toString.call(record);

  assert('object' == typeof record || '[object Array]' == objType, recordError);
  assert('function' == typeof cb || cb == undefined, cbError);

  if ('[object Array]' != objType) this._store.push(record);
  else record.forEach(function(entry) {this._store.push(entry)}.bind(this));

  debug('Added records to \'' + this._name + '\'', record);
  this.emit('change', record);
  this._push('add', record);
};

/**
 * Update a record.
 *
 * @param {Object} record
 * @api public
 */

exports.update = function(record) {
  var cidError = 'The cid \'' + record.cid + '\' could not be found';
  assert(null != record.cid, 'Provide an object with a cid as an argument');
  assert(null != this._store[record.cid], cidError);

  this._store[record.cid] = record;

  debug('Updated a record in \'' + this._name + '\'', record);
  this._push('update', record);
  this.emit('change', record);
}

/**
 * Remove a record from the store.
 *
 * @param {Number} cid
 * @api public
 */

exports.remove = function(record) {
  assert('object' == typeof record, 'Record should be an object');
  var i;
  while((i = this._store.indexOf(record)) != -1) {
		console.log('derp')
    this._store.splice(i, 1);
  }

  debug('Removed a record from \'' + this._name + '\'', record);
  this._push('remove', record);
  this.emit('change', record);
}
