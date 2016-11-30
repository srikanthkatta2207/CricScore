CricScore.factory("XmlToJsonParser",function() {
	
	function flatten(object) {
		var check = _.isPlainObject(object) && _.size(object) === 1;
		return check ? flatten(_.values(object)[0]) : object;
	}

	function parse(xml) {
		var data = {};

		var isText = xml.nodeType === 3,
		    isElement = xml.nodeType === 1,
		    body = xml.textContent && xml.textContent.trim(),
		    hasChildren = xml.children && xml.children.length,
		    hasAttributes = xml.attributes && xml.attributes.length;

		if (isText) { return xml.nodeValue.trim(); }

		if (!hasChildren && !hasAttributes) { return body; }

		if (!hasChildren && body.length) { data.text = body; }

		if (isElement && hasAttributes) {
			data.attributes = _.reduce(xml.attributes, function(obj, name, id) {
				var attr = xml.attributes.item(id);
				obj[attr.name] = attr.value;
				return obj;
			}, {});
		}

		_.each(xml.children, function(child) {
			var name = child.nodeName;

			if (!_.has(data, name)) {
				data[name] = parse(child);
				return;
			}

			if (!_.isArray(data[name])) { data[name] = [data[name]]; }

			data[name].push(parse(child));
		});

		_.each(data.attributes, function(value, key) {
			if (data[key] != null) { return; }
			data[key] = value;
			delete data.attributes[key];
		});

		if (_.isEmpty(data.attributes)) { delete data.attributes; }

		return flatten(data);
	}

	return function (xml) {
		return parse(xml)
	}
});
