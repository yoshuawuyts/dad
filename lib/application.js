/**
 * Module dependencies
 */

var debug = require('debug')('dad:application');
var Emitter = require('events').EventEmitter;
var objectJoin = require('object-join');
var validate = require('customs');
var assert = require('assert');

var transaction = require('./transaction');
var persistance = require('./persistance');
//var rest = require('../adapters/rest');

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
  this._name = name || '';
  this._opts = opts || {};
  this._transactions = [];
  this._adapters = [];
  this._cidCount = 0;
  this._store = {};
  this._model = {};
  return this;
};

/**
 * Inherit from `Emitter.prototype`.
 */

Store.prototype.__proto__ = Emitter.prototype;

/**
 *
 */

store.settings = function(opts) {
  assert('object' == typeof opts, 'Opts should be an object');
  this._opts = objectJoin(this._opts, opts);
}

/**
 * Define an attribute on the model.
 *
 * @params {String} attribute
 * @params {Object[]} meta
 * @return {Store}
 * @api public
 */

store.schema = function(schema) {
  assert('object' == typeof schema, 'Schema should be an object');

  this._model = objectJoin(this._model, schema);
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
  assert(this._model[property], 'Property is not defined');

  var type = this._model[property].type;
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

  return Object.getOwnPropertyNames(this._model)
    .every(function(value, index) {
      if (!this._model[value].required) return true;
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
store.push = persistance.push;
store.fetch = persistance.fetch;
