! function() {
	"use strict";
	angular.module('chatApp')
		.factory('Socket', ['socketFactory', function (socketFactory) {
			return socketFactory();
		}]);
}()