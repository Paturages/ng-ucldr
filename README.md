# ng-ucldr
Dropdown minimalistic customizable calendar relying on nothing but AngularJS (and Vanilla)

...at least that's the long run plan. Right now, it's just a draft.

Usage
==============
HTML
-----
````
...
<script src="/path/to/angular.min.js"></script>
<script src="/path/to/ucldr.js"></script>
...
<ng-ucldr bind-to="dateVariable" init={d: day, m: month, y: year}></ng-ucldr>
````
Keep in mind that the month format for *init* is JavaScript (i.e. 0-11).

AngularJS
----------
````
...
console.log($scope.dateVariable.d); // Day (1-31)
console.log($scope.dateVariable.m); // Month (0-11)
console.log($scope.dateVariable.y); // Year (yyyy)
...
````

CSS
-----
````
.ucldr-text {
  /* The div containing the clickable date text */
}
.ucldr {
  /* The table containing the calendar */
}
.ucldr_month {
  /* The select containing the months */
}
.ucldr_year {
  /* The select containing the years */
}
.ucldr button {
  /* The previous/next buttons */
}
.ucldr tbody th {
  /* The day headers */
}
.ucldr td {
  /* All of the day frames (including empty ones) */
}
.ucldr .pst {
  /* Days in the past */
}
.ucldr .tdy {
  /* Today */
}
.ucldr .ftr {
  /* Future */
}
.ucldr .slct {
  /* Selected date */
}
````
