/**
 * Module dependencies
 */

var debug = require('debug')('dad:application');
var Emitter = require('events').EventEmitter;
var validate = require('customs');
var assert = require('assert');

var transaction = require('./transaction');

/**
 * Expose 'Store'.
 */

exports = module.exports = Store;

/**
 * 'Store' prototype
 */

var store = Store.prototype;

/**
 * Create a new 'Store'.
 *
 * @param {String} name
 * @param {Object} opts
 * @return {Store}
 * @api public
 */


function Store(name, opts) {
  if (!(this instanceof Store)) return new Store(name, opts);
  this.name = name || '';
  this.opts = opts || {};
  this.cidCount = 0;
  this.store = {};
  this.model = {};
  return this;
};

/**
 * Inherit from `Emitter.prototype`.
 */

Store.prototype.__proto__ = Emitter.prototype;

/**
 * Define an attribute on the model.
 *
 * @params {String} attribute
 * @params {Object[]} meta
 * @return {Store}
 * @api public
 */

store.attr = function(attribute, meta) {
  assert('string' == typeof attribute, 'store.attr: attribute should be a string');
  assert('object' == typeof meta || 'undefined' == typeof meta, 'store.attr: meta should be an object');

  this.model[attribute] = meta || {};
  return this;
};

/**
 * Validate a record against the model.
 *
 * @param {Object} record
 * @return {Boolean}
 */

store.validate = function(record) {
  assert('object' == typeof record, 'record should be an object');

  // check if all required properties are included
  var passRequired = Object.getOwnPropertyNames(this.model)
    .every(function(value, index) {
      if (!this.model[value].required) return true;
      if (record[value]) return true;
      return false;
    }.bind(this));

  if (!passRequired) return false;

  // validate types
  return Object.getOwnPropertyNames(record)
    .every(function(value, index) {
      if (undefined == this.model[value]) return false;
      if (undefined == this.model[value].type) return true;
      return validate(this.model[value].type, record[value]);
    }.bind(this));
};

/**
 * Delegates
 */

store.add = transaction.add;
store.get = transaction.get;
store.update = transaction.update;
store.remove = transaction.remove;