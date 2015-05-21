'use strict';

angular.module('ngUcldr', []).filter('ucldr_f_days', function() {
	return function(input, nb_days, day_start) {
		var i, j, d = 1;
		for (i = 0 ; i < day_start ; i++) {
			input[0][i] = "";
		}
		for (i = day_start ; i < 7 ; i++) {
			input[0][i] = d++;
		}
		for (i = 1 ; i < 6 ; i++) {
			for (j = 0 ; j < 7 ; j++) {
				if (d <= nb_days) {
					input[i][j] = d++;
				} else {
					input[i][j] = "";
				}
			}
		}
		return input;
	};
}).filter('ucldr_f_month', function() {
	return function(input, c_year, n_month, n_year) {
		var tmp = input.slice();
		if (c_year == n_year) {
			for (var i = n_month+1 ; i < 12 ; i++) {
				tmp.pop();
			}
		}
		return tmp;
	};
}).directive('ngUcldr', function() {
	return {
		restrict: 'E',
		scope: {
			"field": "=ucldrModel"
		},
		controller: function($scope) {
			var now = new Date();
			$scope.months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			$scope.days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
			$scope.now = {
				day: now.getDate(),
				month: now.getMonth(),
				year: now.getFullYear()
			};
			$scope.years = [];
			for (var i = 0 ; i < 20 ; i++) {
				$scope.years[i] = $scope.now.year-i;
			}
			$scope.c = {
				day: $scope.now.day,
				month: $scope.now.month,
				year: $scope.now.year,
				getNbDays: function() {
					return (new Date(this.year, parseInt(this.month)+1, 0)).getDate();
				},
				getDayStart: function() {
					var res = (new Date(this.year, this.month, 1)).getDay();
					return (res == 6) ? 0 : res+1;
				},
				toString: function() {
					return this.year+"-"+(parseInt(this.month)+1)+"-"+this.day;
				},
				decrMonth: function() {
					if (this.month == 0) {
						this.month = 11;
						this.year--;
					} else {
						this.month--;
					}
				},
				incrMonth: function() {
					if ((this.year < $scope.now.year) || (this.month < $scope.now.month)) {
						if (this.month == 11) {
							this.month = 0;
							this.year++;
						} else {
							this.month++;
						}
					}
				}
			}
			$scope.dateEval = function(day) {
				if (day == "") {
					return "";
				} if ($scope.c.year > $scope.now.year) {
				return "ucldr_future";
				} else if ($scope.c.year < $scope.now.year) {
					return "ucldr_past";
				} else if ($scope.c.month > $scope.now.month) {
					return "ucldr_future";
				} else if ($scope.c.month < $scope.now.month) {
					return "ucldr_past";
				} else if (day == $scope.c.day) {
					return "ucldr_selected";
				} else if (day > $scope.now.day) {
					return "ucldr_future";
				} else if (day < $scope.now.day) {
					return "ucldr_past";
				} else {
					return "ucldr_today";
				}
			};
			$scope.tab = [[],[],[],[],[],[]];
		},
		template:'<div class="ucldr-text">{{c.toString()}}</div><table class="ucldr"><thead><tr><th><button ng-click="c.decrMonth()">&lt;</button></th><th colspan=5><select class="ucldr_month" ng-model="c.month"><option ng-repeat="m in months | ucldr_f_month: c.year: now.month: now.year" value="{{$index}}" ng-selected="{{now.month == $index}}">{{m}}</option></select><select class="ucldr_year" ng-model="c.year" ng-options="y for y in years"></select></th><th><button ng-click="c.incrMonth()">&gt;</button></th></tr></thead><tbody><tr><th ng-repeat="day in days">{{day}}</th></tr><tr ng-repeat="week in tab | ucldr_f_days: c.getNbDays(): c.getDayStart()"><td ng-repeat="day in week track by $index" class="{{dateEval(day)}}" ng-click="c.day = day">{{day}}</td></tr></tbody></table>',
		link: function(scope, elt, attrs) {
			elt[0].childNodes[1].hidden = true;
			elt[0].childNodes[0].onclick = function() {
				elt[0].childNodes[1].hidden = !elt[0].childNodes[1].hidden;
			};
			scope.field = {
				day: scope.c.day,
				month: scope.c.month,
				year: scope.c.year,
				toString: scope.c.toString
			};
		}
	};
});