function ItemArray(container, maker) {
	TemplateItem.call(this);
	this.container = container;
	this.maker = maker;
	this.containers = [];
	this.contents = [];
	this.button = document.createElement('button');
	this.button.innerText = '+';
	this.container.appendChild(this.button);
	this.button.addEventListener('click', ev => {
		const rm = document.createElement('button');
		const cont = document.createElement('span');
		const icont = document.createElement('span');
		
		this.container.insertBefore(cont, this.button);
		cont.appendChild(rm);
		cont.appendChild(document.createTextNode('\xa0'));
		cont.appendChild(icont);
		cont.appendChild(document.createElement('br'));
		
		rm.innerText = '\xd7';
		const made = maker(icont);
		made.registerCb(this.propagate.bind(this));
		this.containers.push(cont);
		this.contents.push(made);
		rm.addEventListener('click', ev => {
			const loc = this.contents.indexOf(made);
			this.container.removeChild(cont);
			this.containers.splice(loc, 1);
			this.contents.splice(loc, 1);
			this.propagate();
		});
	});
}
ItemArray.prototype = Object.create(TemplateItem.prototype);
ItemArray.prototype.constructor = ItemArray;

ItemArray.prototype.get = function() {
	return this.contents;
}
