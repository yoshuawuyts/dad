/**
 * Import test statements for CI test coverage.
 * See: https://github.com/gotwarlost/istanbul/issues/197
 */

require('./application/./application');
require('./application/attr');
require('./application/hasMany');
require('./application/validate');

require('./transactions/add');
require('./transactions/get');
require('./transactions/remove');
require('./transactions/update');

require('./persistance/baseUrl');
require('./persistance/adapter');
require('./persistance/persist');