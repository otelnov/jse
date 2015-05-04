let ngModule = angular.module('jse');

require('./loginCtrl')(ngModule);
require('./registerCtrl')(ngModule);
require('./authFactory')(ngModule);
