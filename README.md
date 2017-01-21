# ng-ucldr
Dropdown minimalistic customizable calendar relying on nothing but AngularJS (and Vanilla)

Install
==============

`npm install ng-ucldr` or just grab a `.js` file from `dist`. It's really not big at all!

Usage
==============
HTML
-----
````
...
<script src="/path/to/angular.js"></script>
<script src="/path/to/ucldr.js"></script>
...
<ng-ucldr
  bind-to="dateVariable"
  default="{day: 12, month: 2, year: 2010}"
  months="J F M A M J J A S O N D"
  weekdays="M T W T F S S"
  year-range="2000 2020"
  week-start="1"
></ng-ucldr>
````
Everything but `bind-to` is optional (see `src/ng-ucldr.js` for enforced defaults). Keep in mind that the month format for `default` follows JavaScript's convention (i.e. 0-11).  

`dateVariable` yields a date in the same format as `default`.

CSS
-----
````
.ucldr {
  /* The component container */
}
.ucldr__label {
  /* The div containing the clickable date text */
}
.ucldr__table {
  /* The table containing the calendar */
}
.ucldr__month {
  /* The select containing the months */
}
.ucldr__year {
  /* The select containing the years */
}
.ucldr button {
  /* The previous/next buttons */
}
.ucldr tbody th {
  /* The day headers */
}
.ucldr__day {
  /* All of the day frames (including empty ones) */
}
.ucldr__day--past {
  /* Days in the past */
}
.ucldr__day--today {
  /* Today */
}
.ucldr__day--future {
  /* Future */
}
.ucldr__day--selected {
  /* Selected date */
}
````
