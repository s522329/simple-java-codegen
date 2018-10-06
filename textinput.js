function TextInput(element, validator) {
	TemplateItem.call(this);
	this.element = element;
	this.valid = true;
	this.validator = validator;
	this.element.addEventListener('change', this.update.bind(this));
	setTimeout(this.update.bind(this));
}
TextInput.prototype = Object.create(TemplateItem.prototype);
TextInput.prototype.constructor = TextInput;

TextInput.prototype.update = function() {
	this.value = (this.value || '').trim();
	if(this.validator(this.element.value)) {
		this.validate();
		this.propagate();
	}
	else
		this.invalidate('Invalid value!');
};
TextInput.prototype.invalidate = function(reason) {
	this.element.style.borderColor = 'red';
	this.element.setCustomValidity(reason);
	this.valid = false;
};
TextInput.prototype.validate = function() {
	this.element.style.borderColor = '';
	this.element.setCustomValidity('');
	this.valid = true;
};
TextInput.prototype.get = function() {
	return this.valid ? this.element.value : null;
};
