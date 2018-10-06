
function ClassLambdas(container) {
	ClassFields.call(this, container);
}
ClassLambdas.prototype = Object.create(ClassFields.prototype);
ClassLambdas.prototype.constructor = ClassLambdas;

ClassLambdas.prototype.tstring = '{} {}() {return {};}'
ClassLambdas.prototype.validators = [
	t => t && !/\s/.test(t),
	n => n && !/^[A-Z-]|\s/.test(n),
	i => i
];
ClassLambdas.prototype.labels = ['r-type', 'name', 'r-value'];
ClassLambdas.prototype.sizes = ['4em', '8em', '14em'];

ClassLambdas.prototype.toString = function() {
	const inputs = this.items.get();
	if(!inputs.length) return '';
	return inputs.map(input => {
		const fields = input.get();
		if(fields === null) return '';
		return `public ${fields[0]} ${fields[1]}() {\n\treturn ${fields[2]};\n}\n`;
	}).join('');
}
