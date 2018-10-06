function ClassSetters(dom, name, fields) {
	TemplateItem.call(this);
	this.name = name;
	this.dom = dom;
	this.fields = fields;
	dom.addEventListener('change', ev => {
		this.propagate();
	});
	fields.registerCb(this.propagate.bind(this));
}
ClassSetters.prototype = Object.create(TemplateItem.prototype);
ClassSetters.prototype.constructor = ClassSetters;

ClassSetters.prototype.toString = function() {
	const items = this.fields.get();
	if(!items.length) return '';
	return items.map(item => {
		const f = item.get();
		if(!f) return '';
		return `\
public ${this.dom.checked ? this.name.get() : 'void'} set${titleCase(f[1])}(${f[0]} ${f[1]}) {
	this.${f[1]} = ${f[1]};
${this.dom.checked ? '\treturn this;\n' : ''}}
`;
	}).join('');
}

function ClassGetters(fields) {
	TemplateItem.call(this);
	this.fields = fields;
	fields.registerCb(this.propagate.bind(this));
}
ClassGetters.prototype = Object.create(TemplateItem.prototype);
ClassGetters.prototype.constructor = ClassGetters;

ClassGetters.prototype.toString = function() {
	const items = this.fields.get();
	if(!items.length) return '';
	return items.map(item => {
		const f = item.get();
		if(!f) return '';
		return `\
public ${f[0]} get${titleCase(f[1])}() {
	return ${f[1]};
}`;
	}).join('');
}

function ClassToString(fields) {
	TemplateItem.call(this);
	this.fields = fields;
	fields.registerCb(this.propagate.bind(this));
}
ClassToString.prototype = Object.create(TemplateItem.prototype);
ClassToString.prototype.constructor = ClassToString;

ClassToString.prototype.toString = function() {
	const items = this.fields.get();
	const contents = items.map(item => {
		const f = item.get();
		if(!f) return '';
		return `\n\t\t+ ", ${f[1]} = " + ${f[1]}`;
	}).join('');
	return `public String toString() {
	return this.getClass().getName()${contents};
}`;
}
