function TextInputs(container, template, validators, flavors, sizes, lastisbig) {
	TemplateItem.call(this);
	this.container = container;
	this.inputs = [];
	const strings = template.split('{}');
	this.container.appendChild(document.createTextNode(strings[0]));
	for(let i=1; i<strings.length; i++) {
		const input = document.createElement(i == strings.length - 1 && lastisbig
			? 'textarea' : 'input');
		if(i == strings.length - 1 && lastisbig)
			input.addEventListener('keydown', ev => {
				if(ev.code === 'KeyI' && ev.ctrlKey
						&& !ev.altKey && !ev.shiftKey && !ev.metaKey) {
					input.value = input.value.substr(0, input.selectionStart)
						+ '\t'
						+ input.value.substr(input.selectionEnd);
					ev.preventDefault();
				}
			});
		input.placeholder = (flavors && flavors[i - 1]) || '';
		input.style.width = (sizes && sizes[i - 1]) || '10em';
		this.container.appendChild(input);
		const tinput = new TextInput(input, validators[i - 1]);
		tinput.registerCb(this.propagate.bind(this));
		this.inputs.push(tinput);
		this.container.appendChild(document.createTextNode(strings[i]));
	}
}
TextInputs.prototype = Object.create(TemplateItem.prototype);
TextInputs.prototype.constructor = TextInputs;

TextInputs.prototype.get = function() {
	let ok = true;
	const retval = this.inputs.map(input => {
		const value = input.get();
		if(value == null) ok = false;
		return value;
	});
	return ok ? retval : null;
}
