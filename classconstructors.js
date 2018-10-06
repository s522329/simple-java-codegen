function ClassConstructors(container, name, fields) {
	TemplateItem.call(this);
	this.fields = fields;
	this.container = container;
	this.items = new ItemArray(container, element =>
		new InputSelector(element, fields));
	this.items.registerCb(this.propagate.bind(this));
}
ClassConstructors.prototype = Object.create(TemplateItem.prototype);
ClassConstructors.prototype.constructor = ClassConstructors;

ClassConstructors.prototype.toString = function() {
	const cons = this.items.get();
	if(!cons.length) return '';
	return cons.map(constr => {
		const fields = constr.get();
		if(!fields) return '';
		const args = fields.map(f => `${f[0]} ${f[1]}`).join(', ');
		const content = fields.map(f => `\n\tset${titleCase(f[1])}(${f[1]});`).join('\n');
		return `public ${name.get()}(${args}) {${content}\n}\n`;
	}).join('');
}
