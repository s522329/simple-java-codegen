
function ClassImports(container, tstring) {
	ClassFields.call(this, container);
	this.tostring = tostring; // to check if the toString uses Arrays
	this.tostring.registerCb(this.propagate.bind(this));
}
ClassImports.prototype = Object.create(ClassFields.prototype);
ClassImports.prototype.constructor = ClassImports;

ClassImports.prototype.tstring = 'import {};'
ClassImports.prototype.validators = [
	t => t && !/\s/.test(t),
];
ClassImports.prototype.labels = ['package'];
ClassImports.prototype.sizes = ['12em'];

ClassImports.prototype.toString = function() {
	const inputs = Array.from(this.items.get());
	if(this.tostring.hasarray)
		inputs.push({get() {return ['java.util.Arrays']}});
	if(!inputs.length) return '';
	return inputs.map(input => {
		const fields = input.get();
		if(fields === null) return '';
		return `import ${fields[0]};
`;
	}).join('');
}
