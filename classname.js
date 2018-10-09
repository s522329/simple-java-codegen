function ClassName(input) {
	TextInput.call(this, input, value =>
		value.length && !/^[a-z0-9-]|\s/.test(value));
}
ClassName.prototype = Object.create(TextInput.prototype);
ClassName.prototype.constructor = ClassName;

ClassName.prototype.toString = function() {
	return this.get() || null;
};
