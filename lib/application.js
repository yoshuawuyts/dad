/**
 * Module dependencies
 */

var Emitter = require('events').EventEmitter;
var http = require('http');
// var inspector = require('schemaInspector');

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