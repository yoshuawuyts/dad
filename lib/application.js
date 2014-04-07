/**
 * Module dependencies
 */

var debug = require('debug')('dad:application');
var Emitter = require('events').EventEmitter;
// var inspector = require('schemaInspector');
var assert = require('assert');
var http = require('http');

/**
 * Model prototype
 */

var mod = Model.prototype;

/**
 * Expose Model
 */

exports = module.exports = Model;

/**
 * Initialize a new Model
 *
 * @api public
 */

function Model () {
  this.attributes = {};
}

/**
 * Inherit prototype from Emitter
 */

Application.prototype.__proto__ = Emitter.prototype;

/**
 * Add objects
 */

mod.add = function(attributes) {};

/**
 * Delete objects
 */

mod.delete = function() {};

/**
 * Return amount of attributes
 */

mod.length = function() {};

/**
 * Sync to REST api
 */

mod.sync = function() {};

/**
 * Sync through websockets
 */

mod.socketSync = function() {};

/**
 * Sync to localstore
 */

mod.localSync = function() {};

/**
 * Validate input
 */

mod.validate = function () {};