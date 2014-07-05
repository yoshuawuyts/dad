/**
 * Module dependencies
 */

var debug = require('debug')('dad:application');
var Emitter = require('events').EventEmitter;
var validate = require('customs');
var assert = require('assert');

var transaction = require('./transaction');
var persistance = require('./persistance');

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
  this.transactions = [];
  this.adapters = [];
  this.cidCount = 0;
  this.url = '';
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
 * Validate a single property against the model.
 *
 * @param {String} property
 * @param {Any} target
 * @return {Boolean}
 * @api public
 */

store.validate = function(property, target) {
  assert('string' == typeof property, 'Property should be a string');
  assert('undefined' != typeof target, 'Target should exist');
  assert(this.model[property], 'Property is not defined');

  var type = this.model[property].type;
  if (undefined == type) return true;
  return validate(type, target);
}

/**
 * Check if all required properties from the model are present in the record.
 *
 * @param {Object} record
 * @return {Boolean}
 * @api public
 */

store.allAccountedFor = function(record) {
  assert('object' == typeof record, 'Record should be an object');

  return Object.getOwnPropertyNames(this.model)
    .every(function(value, index) {
      if (!this.model[value].required) return true;
      if (record[value]) return true;
      return false;
    }.bind(this));
};

/**
 * Delegates
 */

store.add = transaction.add;
store.get = transaction.get;
store.update = transaction.update;
store.remove = transaction.remove;

store.baseUrl = persistance.baseUrl;
store.adapter = persistance.adapter;
store.persist = persistance.persist;