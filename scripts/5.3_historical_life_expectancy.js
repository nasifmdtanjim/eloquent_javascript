'use strict';
(function() {
    var ancestry = JSON.parse(ANCESTRY_FILE);

    var byName = {};

    ancestry.forEach(function(person) {
        byName[person.name] = person;
    });

    function lifeSpan(person) {
        return person.died - person.born;
    }

    function personsInCentury(person) {
        return Math.ceil(person.died / 100);
    }

    function average(array) {
        function plus(a, b) {
            return a + b;
        }

        return array.reduce(plus) / array.length;
    }

    var _group_by_century = {};
    var centuries = [];

    ancestry.forEach(function(person) {
        var century = Math.ceil(person.died / 100);

        if(centuries.indexOf(century) == -1) {
            centuries.push(century);
        }

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

    for (var prop in _group_by_century) {
    	if (_group_by_century.hasOwnProperty(prop)) {
    		console.log(prop + ': ' + average(_group_by_century[prop].map(lifeSpan)));
    	}
    }
})();