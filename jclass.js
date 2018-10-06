function JClass(template, output, map) {
	this.template = template;
	this.output = output;
	this.map = map;
	for(let i in map)
		map[i].registerCb(this.update.bind(this));
}

JClass.prototype.update = function() {
	let res = this.template;
	for(let i in this.map)
		res = res.replace(new RegExp(`(\\n[ \t]*)?\\$${i}`, 'm'), (match, indent) => {
			indent = indent || '';
			return indent + this.map[i].toString().replace(/\n/g, `${indent}`)
		});
	this.output.value = res.replace(/\{(\n\t*)+$/mg, '{').replace(/(\n\t*)\1+$/mg, '$1');
}
