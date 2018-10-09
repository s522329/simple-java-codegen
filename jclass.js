function JClass(template, output, map) {
	this.template = template;
	this.output = output;
	this.map = map;
	for(let i in map)
		map[i].registerCb(this.update.bind(this));
}

JClass.prototype.update = function() {
	let res = this.template, okay = true;
	for(let i in this.map) {
		res = res.replace(new RegExp(`(\\n[ \t]*)?\\$${i}`, 'm'), (match, indent) => {
			let value = this.map[i].toString();
			if(value === null) {
				okay = false;
				return;
			}
			indent = indent || '';
			return indent + this.map[i].toString().replace(/\n/g, `${indent}`)
		});
		if(!okay) return;
	}
	this.output.value = res.trim()
		.replace(/\{(\n\t*)+$/mg, '{')
		.replace(/^(\t*\n)+\}/mg, '}')
		.replace(/\{\s+\}/g, '{}')
		.replace(/(\n\t*)\1+$/mg, '$1');
}
