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
})();