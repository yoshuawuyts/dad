/**
 * Module dependencies
 */

var debug = require('debug')('dad:persistance');
var parallel = require('foyer');
var assert = require('assert');

/**
 * Set the base url.
 *
 * @param {String} url
 * @return {Object}
 * @api public
 */

exports.baseUrl = function(url) {
  assert('string' == typeof url, 'Url should be a string');
  this.url = url;
  return this;
};

/**
 * Register a sync adapter.
 *
 *   store.adapter(Function);
 *
 * @param {Function} adapter
 * @return {Object}
 * @api public
 */

exports.adapter = function(adapter) {
  assert('function' == typeof adapter, 'Adapter should be a function');
  this.adapters.push(adapter);
  return this;
}

/**
 * Persist transactions to the adapters.
 * Emits a 'succes' or 'failure' event with an object attached.
 *
 *   store.persist()
 *
 * @return {Object}
 * @api public
 */

exports.persist = function() {
  debug('Persisting transactions: ' + this.transactions);

  parallel(this.adapters, callback.bind(this));

  function callback(err) {
    if (err.length) {
      this.emit('failure', err);
    }
    else {
      this.emit('success', this.transactions);
      this.transactions = [];
    }
  }

  return this;
};

/**
 * Fetch records from the adapters.
 * Methods: Read
 *
 * @return {Object[]}
 * @api public
 */

exports.fetch = function() {
  
};