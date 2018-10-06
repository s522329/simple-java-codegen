
function ClassImports(container) {
	ClassFields.call(this, container);
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
	const inputs = this.items.get();
	if(!inputs.length) return '';
	return inputs.map(input => {
		const fields = input.get();
		if(fields === null) return '';
		return `import ${fields[0]};\n`;
	}).join('');
}
