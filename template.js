const titleCase = str => str[0].toUpperCase() + str.substr(1);

const template = `\
$IMPORTS

public class $NAME {
	$CONSTANTS
	$FIELDS
	$CONSTRUCTORS
	$SETTERS
	$GETTERS
	$LAMBDAS
	$METHODS
	$TOSTRING
}`;

function TemplateItem() {
	this.element = null;
	this.value = null;
	this.callbacks = [];
}

TemplateItem.prototype.toString = function() {
	return null;
};

TemplateItem.prototype.get = function() {
	return this.value;
}

TemplateItem.prototype.registerCb = function(cb) {
	if(cb instanceof Function)
		this.callbacks.push(cb);
	else throw new Error('cb is not a function!');
};

TemplateItem.prototype.propagate = function() {
	setTimeout(() => {
		this.callbacks.forEach(cb => cb(this));
	});
};
