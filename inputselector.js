function InputSelector(container, items) {
	TemplateItem.call(this);
	this.container = container;
	this.items = items;
	this.items.registerCb(this.update.bind(this));
	this.icache = [];
	this.values = {};
	this.update();
}
InputSelector.prototype = Object.create(TemplateItem.prototype);
InputSelector.prototype.constructor = InputSelector;

InputSelector.prototype.update = function() {
	const items = this.items.get().map(i => i.get())
		.filter(i => i !== null);
	if(JSON.stringify(items) !== JSON.stringify(this.icache)) {
		this.container.innerText = ''; // clear container
		for(let i=0; i<items.length; i++) {
			const label = document.createElement('label');
			const checkbox = document.createElement('input');
			
			this.values[items[i]] = this.values[items[i]] || false;
			checkbox.type = 'checkbox';
			checkbox.checked = this.values[items[i]];
			label.appendChild(checkbox);
			label.appendChild(document.createTextNode(items[i][1]));
			
			checkbox.addEventListener('change', ev => {
				this.values[items[i]] = checkbox.checked;
				this.propagate();
			});
			this.container.appendChild(label);
		}
		this.icache = items;
	}
	this.propagate();
};
InputSelector.prototype.get = function() {
	return this.icache.filter(val => this.values[val]);
};
