function Model (data) {
	this.type = 'Model';
	this.events = {};
	if (Array.isArray(data)) this.data = data;
	else this.data = [];
};

Model.prototype.push = function (data) {
	if (data !== undefined) {
		this.data.push(data);
		this.emit('change', this.data);
		this.emit('push', data);
	}
};

Model.prototype.struct = function (data) {
	if (this.data.length > 0 && data !== undefined) {
		var data = Object.keys(this.data[0]);
		this.emit('struct', data);
		return data;
	}
};

Model.prototype.set = function (data) {
	if (data !== undefined) {
		this.data.push(data);
		this.emit('change', this.data);
		this.emit('set', data);
	}
};

Model.prototype.get = function () {
	this.emit('get', this.data);
	return this.data;
};

Model.prototype.pop = function () {
	if (this.data.length > 0) {
		var data = this.data.pop();
		this.emit('change', this.data);
		this.emit('pop', { res : this.data, diff : data });
		return data
	}
};

Model.prototype.shift = function () {
	if (this.data.length > 0) {
		var data = this.data.shift()
		this.emit('change', this.data);
		this.emit('shift', { res : this.data, diff : data });
		return data;
	}
};

Model.prototype.reverse = function () {
	if (this.data.length > 1) {
		var data = this.data.reverse()
		this.emit('change', this.data);
		this.emit('reverse', data);
		return data;
	}
};

Model.prototype.size = function () {
	var data = this.data.length;
	this.emit('change', this.data);
	this.emit('size', data);
	return data;
};

Model.prototype.length = function () {
	return this.size();
};

Model.prototype.remove = function (data) {
	if (data !== undefined && this.data.length > 0) {
		if (typeof data === 'number' || data instanceof Number) {
			if (this.data[data] !== undefined) {
				var objective = this.data[data]
				this.data = this.data.splice(data,1)
				this.emit('change', this.data);
				this.emit('remove', { res : this.data, diff : objective })
			} else if (typeof data === 'object') {
				var keys = Object.keys(data);
				var res = this.data.filter(function (e) {
					var chck = true;
					keys.forEach(function (k) {
						if (typeof e[k] === 'string') {
							if(e[k].indexOf(data[k]) >= 0) chck = false;
						} else {
							if(e[k] === data[k]) chck = false;
						}
					});
					return chck;
				});
				this.data = res;
				this.emit('change', this.data);
				this.emit('remove', this.data);
			}
		}
	}
};

Model.prototype.clear = function () {
	if (this.data.length !== 0) {
		this.data = [];
		this.emit('change', this.data);
		this.emit('clear', [])
		return [];
	}
};

Model.prototype.index = function (key) {
	if (this.data[key] === undefined) {
		this.emit('change', this.data);
		this.emit('index', this.data[key]);
		return this.data[key];
	}
};

Model.prototype.first = function () {
	if (this.data.length > 0) {
		this.emit('change', this.data);
		this.emit('first', this.data[0]);
		return this.data[0];
	}
};

Model.prototype.last = function () {
	if (this.data.length > 0) {
		this.emit('change', this.data)
		this.emit('last', this.data[this.data.length-1]);
		return this.data[this.data.length-1];
	}
};

Model.prototype.find = function (obj) {
	if (this.data.length > 0 && typeof obj === 'object') {
		var keys = Object.keys(obj);
		var data =  this.data.filter(function (e) {
			var chck = true;
			keys.forEach(function (k) {
				if(e[k] !== obj[k]) chck = false;
			});
			return chck;
		});
		this.emit('change', this.data);
		this.emit('find', data);
		return data;
	}
};

Model.prototype.filter = function (obj) {
	if (this.data.length > 0 && typeof obj === 'object') {
		var keys = Object.keys(obj);
		var data =  this.data.filter(function (e) {
			var chck = true;
			keys.forEach(function (k) {
				if (typeof e[k] === 'string') {
					if(e[k].indexOf(obj[k]) < 0) chck = false;
				} else {
					if(e[k] !== obj[k]) chck = false;
				}
			});
			return chck;
		});
		this.emit('change', this.data);
		this.emit('filter', data);
		return data;
	}
}

Model.prototype.on = function (key, func) {
	if (key !== undefined && func !== undefined && typeof func === 'function' ) {
		this.events[key] = func;
	}
};

Model.prototype.emit = function (key, data) {
	if (key !== undefined ) {
		if (this.events[key] !== undefined) this.events[key](data);
	}
};

module.exports = Model;
