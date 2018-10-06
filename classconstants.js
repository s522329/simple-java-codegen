function ClassConstants(container) {
	ClassFields.call(this, container);
}
ClassConstants.prototype = Object.create(ClassFields.prototype);
ClassConstants.prototype.constructor = ClassConstants;

ClassConstants.prototype.validators = [
	t => t && !/\s/.test(t),
	n => n && !/[a-z]|\s/.test(n),
	i => i
];

ClassConstants.prototype.toString = function() {
	const inputs = this.items.get();
	if(!inputs.length) return '';
	return inputs.map(input => {
		const fields = input.get();
		if(fields === null) return '';
		return `protected static final ${fields[0]} ${fields[1]} = ${fields[2]};\n`;
	}).join('');
}
