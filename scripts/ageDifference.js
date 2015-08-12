'use strict';
(function() {
    var ancestry = JSON.parse(ANCESTRY_FILE);

    var byName = {};

    ancestry.forEach(function(person) {
        byName[person.name] = person;
    });

    function persons(person) {
        return person.mother != null && byName[person.mother] != undefined;
    }

    function ageDifferences(person) {
        return person.born - (byName[person.mother].born);
    }

    function average(array) {
        function plus(a, b) {
            return a + b;
        }

        return array.reduce(plus) / array.length;
    }

    console.log(average(ancestry.filter(persons).map(ageDifferences)));
})();