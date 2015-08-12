'use strict';
(function() {
    function every(array, f) {
        return array.reduce(function(a, b) {
            return a && f(b);
        }, true);
    }

    function some(array, f) {
        return array.reduce(function(a, b) {
            return a || f(b);
        }, false);
    }

    console.log(every([NaN, NaN, NaN], isNaN));
    console.log(every([NaN, NaN, 4], isNaN));
    console.log(some([NaN, 3, 4], isNaN));
    console.log(some([2, 3, 4], isNaN));
})();