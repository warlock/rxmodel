function Model (data) {
	this.events = {};
	if (Array.isArray(data)) this.data = data;
	else this.data = [];
};

Model.prototype.struct = function (data) {
	return Object.keys(this.data[0]);
};

Model.prototype.set = function (data) {
	this.data.push(data);
};

Model.prototype.get = function (id) {
	return this.data[id];
};

Model.prototype.pop = function () {
	return this.data.pop();
};

Model.prototype.shift = function () {
	return this.data.shift();
};

Model.prototype.reverse = function () {
	return this.data.reverse();
};

Model.prototype.size = function () {
	return this.data.length;
};

Model.prototype.length = function () {
	return this.size();
};

Model.prototype.on = function () {

};

module.exports = Model;
