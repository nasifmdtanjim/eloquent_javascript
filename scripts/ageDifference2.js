'use strict';
(function() {
    var ancestry = JSON.parse(ANCESTRY_FILE);

    var byName = {};

    ancestry.forEach(function(person) {
        byName[person.name] = person;
    });

    var persons = ancestry.filter(function(person) {
        return person.mother != null && byName[person.mother] != undefined;
    });

    var ageDifferences = persons.map(function(person) {
        return person.born - (byName[person.mother]).born;
    });

    var average = ageDifferences.reduce(function(a, b) {
        return a + b;
    }) / ageDifferences.length;

    console.log(average);
})();