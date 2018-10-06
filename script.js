const dom = new Proxy({}, {
	'get': (obj, name) => obj[name] = document.querySelector('#' + name),
	'set': (obj, name, val) => obj[name] = val
});
const name = new ClassName(dom.name);
const fields = new ClassFields(dom.fields);
const constants = new ClassConstants(dom.consts);
const constructors = new ClassConstructors(dom.cons, name, fields.items);
const setters = new ClassSetters(dom.setter, name, fields.items);
const getters = new ClassGetters(fields.items);
const lambdas = new ClassLambdas(dom.lambdas);
const methods = new ClassMethods(dom.methods);
const tostring = new ClassToString(fields.items);
const jclass = new JClass(template, dom.output, {
	'NAME': name,
	'FIELDS': fields,
	'CONSTANTS': constants,
	'CONSTRUCTORS': constructors,
	'SETTERS': setters,
	'GETTERS': getters,
	'LAMBDAS': lambdas,
	'METHODS': methods,
	'TOSTRING': tostring
});
