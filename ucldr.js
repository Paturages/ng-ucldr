'use strict';

angular.module('ngUcldr', []).filter('f1', function() {
	return function(a, n, s) {
		var i, j, d = 1;
		for (i = 0 ; i < s ; i++)
			a[0][i] = "";
		for (i = s ; i < 7 ; i++)
			a[0][i] = d++;
		for (i = 1 ; i < 6 ; i++)
			for (j = 0 ; j < 7 ; j++)
				if (d <= n)
					a[i][j] = d++;
				else
					a[i][j] = "";
		return a;
	};
}).directive('ngUcldr', ['$window',
function(w) {
	return {
		restrict: 'E',
		scope: {
			"f": "=bindTo"
		},
		controller: function($scope) {
			var s = $scope;
			var n = new Date();
			s.s = false;
			s.tg = function(d) {
				if (d && (s.c.y < s.n.y || s.c.m < s.n.m || d <= s.n.d)) {
					s.s = !s.s || !d;
					s.c.d = d;
				}
			}
			s.lm = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			s.ld = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
			s.n = {
				d: n.getDate(),
				m: n.getMonth(),
				y: n.getFullYear()
			};
			s.ly = [];
			for (var i = 0 ; i < 20 ; i++)
				s.ly[i] = s.n.y-i;
			s.gnd = function() {
				return (new Date(s.c.y, +s.c.m+1, 0)).getDate();
			};
			s.gds = function() {
				var res = (new Date(s.c.y, s.c.m, 1)).getDay();
				return (res == 6) ? 0 : res+1;
			};
			s.ts = function() {
				var m = (s.c.m < 9) ? "0"+(+s.c.m+1) : (+s.c.m+1), d = (s.c.d < 10) ? "0"+s.c.d : s.c.d;
				return s.c.y+"-"+m+"-"+d;
			};
			s.dm = function() {
				if (s.c.m) {
					s.c.m--;
				} else {
					s.c.m = 11;
					s.c.y--;
				}
			};
			s.im = function() {
				if ((s.c.y < s.n.y) || (s.c.m < s.n.m)) {
					if (s.c.m == 11) {
						s.c.m = 0;
						s.c.y++;
					} else {
						s.c.m++;
					}
				}
			}
			s.c = {
				d: s.n.d,
				m: s.n.m,
				y: s.n.y
			}
			s.de = function(d) {
				if (d == "")
					return "";
				else if (d == s.c.d)
					return "slct";
				else if (s.c.y > s.n.y)
					return "ftr";
				else if (s.c.y < s.n.y)
					return "pst";
				else if (s.c.m > s.n.m)
					return "ftr";
				else if (s.c.m < s.n.m)
					return "pst";
				else if (d > s.n.d)
					return "ftr";
				else if (d < s.n.d)
					return "pst";
				else
					return "tdy";
			};
			s.t = [[],[],[],[],[],[]];
		},
		template:'<div class="ucldr-text" ng-click="s=!s">{{ts()}}</div><table class="ucldr" ng-if="s"><thead><tr><th><button ng-click="dm()">&lt;</button></th><th colspan=5><select class="ucldr_month" ng-model="c.m"><option ng-repeat="m in lm" value="{{$index}}" ng-selected="c.m==$index" ng-disabled="c.y==n.y&&$index>n.m">{{m}}</option></select><select class="ucldr_year" ng-model="c.y" ng-options="y for y in ly"></select></th><th><button ng-click="im()">&gt;</button></th></tr></thead><tbody><tr><th ng-repeat="d in ld">{{d}}</th></tr><tr ng-repeat="w in t | f1: gnd(): gds()"><td ng-repeat="d in w track by $index" class="{{de(d)}}" ng-click="tg(d)">{{d}}</td></tr></tbody></table>',
		link: function(s, e) {
			s.f = s.c;
			e.bind('click', function(x) {
				x.stopPropagation();
			});
			angular.element(w).on('click', function() {
				s.s = false;
				s.$apply();
			});
		}
	};
}]);