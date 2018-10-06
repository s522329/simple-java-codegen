
function ClassMethods(container) {
	ClassFields.call(this, container, true);
}
ClassMethods.prototype = Object.create(ClassFields.prototype);
ClassMethods.prototype.constructor = ClassMethods;

ClassMethods.prototype.tstring = '{} {}() {{}}';
ClassMethods.prototype.validators = [
	t => t && !/\s/.test(t),
	n => n && !/^[A-Z-]|\s/.test(n),
	i => true
];
ClassMethods.prototype.labels = ['r-type', 'name', 'block'];
ClassMethods.prototype.sizes = ['4em', '8em', '60%'];

ClassMethods.prototype.toString = function() {
	const inputs = this.items.get();
	if(!inputs.length) return '';
	return inputs.map(input => {
		const fields = input.get();
		if(fields === null) return '';
		return `public ${fields[0]} ${fields[1]}() {\n\t${fields[2].replace(/\n/g, '\n\t')}\n}\n`;
	}).join('');
}
