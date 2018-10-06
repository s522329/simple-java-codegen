function ClassFields(container, lastisbig) {
	TemplateItem.call(this);
	this.items = new ItemArray(container, element =>
		new TextInputs(element, this.tstring, this.validators,
			this.labels, this.sizes, lastisbig));
	this.items.registerCb(this.propagate.bind(this));
}
ClassFields.prototype = Object.create(TemplateItem.prototype);
ClassFields.prototype.constructor = ClassFields;

ClassFields.prototype.tstring = '{} {} = {};';
ClassFields.prototype.validators = [
	t => t && !/\s/.test(t),
	n => n && !/^[A-Z-]|\s/.test(n),
	() => true
];
ClassFields.prototype.labels = ['type', 'name', 'initializer'];
ClassFields.prototype.sizes = ['4em', '8em', '12em'];

ClassFields.prototype.toString = function() {
	const inputs = this.items.get();
	if(!inputs.length) return '';
	return inputs.map(input => {
		const fields = input.get();
		if(fields === null) return '';
		return `private ${fields[0]} ${fields[1]}\
${fields[2] ? ' = ' + fields[2] : ''};\n`;
	}).join('');
}
