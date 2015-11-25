! function() {
angular.module('chatApp')
  .directive('scrollToLast',
    [
      '$location', '$anchorScroll',
      function($location, $anchorScroll) {
        return {
          restrict: 'AE',
          scope: {},
          link: function(scope, element, attrs) {
            $location.hash(attrs.scrollToLast);
            $anchorScroll();
          }
        }
      }
    ]
  );
}();