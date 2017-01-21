angular.module('ngUcldr', [])
.directive('ngUcldr', [
  '$window',
  function($window) {
    return {
      restrict: 'E',
      scope: {
        // Binds the selected date to this variable
        // {day, month, year}
        bindTo: '=',
        // Initializes the input to this value
        // {day, month, year}
        default: '=',
        // Month labels
        // (default: 'Jan Feb Mar Apr May June Jul Aug Sep Oct Nov Dec')
        monthLabels: '@',
        // Weekday labels
        // (default: 'Sun Mon Tue Wed Thu Fri Sat')
        weekdayLabels: '@',
        // Year range
        // (default: '1950 2050')
        yearRange: '@',
        // Week start (0 is Sunday, 1 is Monday, ...)
        // (default: 0)
        weekStart: '@'
      },
      templateUrl: './src/template.html',
      link: function(scope, elt) {
        elt.bind('click', function($event) {
          $event.stopPropagation();
        });
        angular.element($window).on('click', function() {
          scope.isVisible = false;
          scope.$apply();
        });
      },
      controller: [
        '$scope',
        function($scope) {
          $scope.dayItems = [[],[],[],[],[],[]];
          var now = new Date();
          $scope.now = {
            day: now.getDate(),
            month: now.getMonth(),
            year: now.getFullYear()
          };
          if (!$scope.default) $scope.default = $scope.now;
          $scope.instance = {
            day: +$scope.default.day,
            month: +$scope.default.month,
            year: +$scope.default.year
          };
          $scope.bindTo = $scope.instance;

          $scope.monthLabels = ($scope.monthLabels || 'Jan Feb Mar Apr May June Jul Aug Sep Oct Nov Dec')
            .split(' ');
          $scope.weekdayLabels = ($scope.weekdayLabels || 'Sun Mon Tue Wed Thu Fri Sat')
            .split(' ');

          $scope.yearRange = ($scope.yearRange || '1950 2050')
            .split(' ')
            .map(Number);
          $scope.yearLabels = [];
          if ($scope.yearRange[0] < $scope.yearRange[1]) for (
            var year = $scope.yearRange[0];
            year <= $scope.yearRange[1];
            year++
          ) $scope.yearLabels.push(year);

          $scope.getNumberOfDays = function getNumberOfDays() {
            return (new Date(
              $scope.instance.year,
              $scope.instance.month + 1,
              0
            )).getDate();
          };
          $scope.getMonthStartWeekdayOffset = function getMonthStartWeekdayOffset() {
            return (7 + (new Date(
              $scope.instance.year,
              $scope.instance.month,
              1
            )).getDay() - ($scope.weekStart || 0)) % 7;
          };
          $scope.incrementMonth = function incrementMonth() {
            $scope.instance.month = ($scope.instance.month + 1) % 12;
            if (!$scope.instance.month) $scope.instance.year++;
          };
          $scope.decrementMonth = function decrementMonth() {
            if (!$scope.instance.month) $scope.instance.year--;
            $scope.instance.month = (11 + $scope.instance.month) % 12;
          };
          $scope.getDayItemClass = function getDayItemClass(dayItem) {
            if (!dayItem) return '';
            if (dayItem == $scope.instance.day) return 'selected';
            if ($scope.instance.year > $scope.now.year) return 'future';
            if ($scope.instance.year < $scope.now.year) return 'past';
            if ($scope.instance.month > $scope.now.month) return 'future';
            if ($scope.instance.month < $scope.now.month) return 'past';
            if (dayItem > $scope.now.day) return 'future';
            if (dayItem < $scope.now.day) return 'past';
            return 'today';
          };
          $scope.selectDay = function selectDay(day) {
            if (!day) return;
            $scope.isVisible = false;
            $scope.instance.day = +day;
          }
        }
      ]
    };
  }
])
.filter('getDayItems', function() {
  return function(dayItems, nbDays, weekdayOffset) {
    var day = 1;
    for (var weekday = 0; weekday < weekdayOffset; weekday++) {
      dayItems[0][weekday] = '';
    }
    for (var weekday = weekdayOffset; weekday < 7; weekday++) {
      dayItems[0][weekday] = day++;
    }
    for (var week = 1; week < 6; week++) {
      for (var weekday = 0; weekday < 7; weekday++) {
        dayItems[week][weekday] = day <= nbDays ? day++ : '';
      }
    }
    return dayItems;
  };
});
