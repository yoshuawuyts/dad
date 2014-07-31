/**
 * Import test statements for CI test coverage.
 * See: https://github.com/gotwarlost/istanbul/issues/197
 */

require('./application/allAccountedFor');
require('./application/application');
require('./application/schema');
require('./application/validate');

require('./transactions/add');
require('./transactions/get');
require('./transactions/remove');
require('./transactions/update');

require('./persistance/baseUrl');
require('./persistance/adapter');
require('./persistance/pull');
require('./persistance/push');