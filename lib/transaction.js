/**
 * Module dependencies
 */

var debug = require('debug')('dad:transaction');
var assert = require('assert');

/**
 * Get a record from the store.
 *
 * @return {Object[]}
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
 * @param {Object} newRecord
 * @param {Object} oldRecord
 * @api public
 */

exports.update = function(newRecord, oldRecord) {

  assert('object' == typeof newRecord, 'Record should be an object');

	var i;
	var used = false;
	while((i = this._store.indexOf(oldRecord)) != -1) {
		this._store[i] = newRecord;
		used = true;
	}

	if (used){
  	debug('Updated a record in \'' + this._name + '\'', oldRecord, newRecord);
  	this._push('update', newRecord, oldRecord);
  	this.emit('change', newRecord, oldRecord);
	} else {
		debug('Did not update record: ', oldRecord, newRecord);
	}
}

/**
 * Remove a record.
 *
 * @param {Object} record
 * @api public
 */

exports.remove = function(record) {

  assert('object' == typeof record, 'Record should be an object');

  var i;
	var used = false;
  while((i = this._store.indexOf(record)) != -1) {
		this._store.splice(i, 1);
		used = true;
	}

	if (used){
	  debug('Removed a record from \'' + this._name + '\'', record);
	  this._push('remove', record);
	  this.emit('change', record);
	} else {
		debug('Did not remove record: ', record);
	}
}
