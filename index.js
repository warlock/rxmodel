function Model (data) {
	this.events = {};
	if (Array.isArray(data)) this.data = data;
	else this.data = [];
};

Model.prototype.push = function (data) {
	this.data.push(data);
	this.emit('push', data);
};

Model.prototype.struct = function (data) {
	var data = Object.keys(this.data[0]);
	this.emit('struct', data);
	return data;
};

Model.prototype.set = function (data) {
	this.data.push(data);
	this.emit('set', data);
};

Model.prototype.get = function (id) {
	this.emit('get', this.data[id]);
	return this.data[id];
};

Model.prototype.pop = function () {
	var data = this.data.pop();
	this.emit('pop', data);
	return data
};

Model.prototype.shift = function () {
	var data = this.data.shift()
	this.emit('shift', data);
	return data;
};

Model.prototype.reverse = function () {
	var data = this.data.reverse()
	this.emit('reverse', data);
	return data;
};

Model.prototype.size = function () {
	var data = this.data.length;
	this.emit('size', data);
	return data;
};

Model.prototype.length = function () {
	return this.size();
};

Model.prototype.on = function (key, func) {
	this.events[key] = func;
};

Model.prototype.emit = function (key, data) {
	if (this.events[key] !== undefined) this.events[key](data);
};

module.exports = Model;
