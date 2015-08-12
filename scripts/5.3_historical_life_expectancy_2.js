'use strict';
(function() {
    var ancestry = JSON.parse(ANCESTRY_FILE);
    
    function lifeSpan(person) {
        return person.died - person.born;
    }

    function average(array) {
        function plus(a, b) {
            return a + b;
        }

        return array.reduce(plus) / array.length;
    }

    function groupByCentury(array, getCentury) {
    	var _group_by_century = {};

        ancestry.forEach(function(person) {
            var century = getCentury(person);

            if(!_group_by_century.hasOwnProperty(eval(century))) {
                Object.defineProperty(_group_by_century, eval(century), {
                    value: [],
                    writable: true,
                    configurable: true,
                    enumerable: true
                });
            }

            Array.prototype.push.call(_group_by_century[eval(century)], person);
        });

        return _group_by_century;
    }

    var _group_by_century = groupByCentury(ancestry, function(person) {
    	return Math.ceil(person.died / 100);
    });

    for (var prop in _group_by_century) {
    	if (_group_by_century.hasOwnProperty(prop)) {
    		console.log(prop + ': ' + average(_group_by_century[prop].map(lifeSpan)));
    	}
    }
})();