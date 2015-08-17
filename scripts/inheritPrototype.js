function inheritPrototype(childObject, parentObject) {
	childObject.prototype = Object.create(parentObject.prototype);
	childObject.prototype.constructor = childObject;
}