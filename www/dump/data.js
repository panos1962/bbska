Data = {};

$(window).
ready(function() {
	try {
		Data.image = self.opener.Dump.image;

		// Στη φόρμα καθορισμού κριτηρίων έχουμε κάνει disabled
		// τα κενά κριτήρια ώστε να μην περνάμε κριτήρια που δεν
		// θα παίξουν κάποιο ρόλο εδώ. Εφόσον τώρα η μεταφορά των
		// κριτηρίων έχει ήδη γίνει, επαναφέρουμε όλα τα κριτήρια
		// σε κατάσταση enabled.

		self.opener.Dump.plistDOM.find('input').prop('disabled', false);

		Data.display();
	} catch (e) {
		Data.imageGet();
	}
});

Data.imageGet = function() {
	if (!Data.hasOwnProperty('root'))
	throw 'root undefined';

	Selida.bodyDOM.text('Loading…');
	$.post('../bbska.php', {
		action: 'imageget',
		root: Data.root,
	}, function(data) {
		try {
			if (!data)
			throw 'no data';

			Data.image = ('{' + data + '}').evalAsfales();
			Data.display();
		} catch (e) {
			Selida.bodyDOM.text('Error!');
		}
	}).
	fail(function() {
		Selida.bodyDOM.text('no data');
	});

	return Data;
};

Data.display = function() {
	Data.setup();

	Globals.walk(Data.image, function(i, monada) {
		Data.monadaMatch(monada);
	});

	Data.print();
	return Data;
};

Data.monadaMatch = function(monada, data) {
	var data, plist, i, attr, j, match;

	if (!monada.hasOwnProperty('a'))
	return Data;

	data = [];
	plist = [];
	Globals.awalk(Data.klist, function(i, k) {
		data[i] = undefined;
		plist[i] = Data.plist[i]
	});

	match = false;

	for (i = 0; i < monada.a.length; i++) {
		attr = monada.a[i];

		for (j = 0; j < Data.klist.length; j++) {
			if (!attr.k.match(Data.klist[j]))
			continue;

			if (!Data.plist[j]) {
				data[j] = attr.v;
				match = true;
				continue;
			}

			if (!attr.v.match(Data.plist[j]))
			return Data;

			data[j] = attr.v;
			match = true;
			plist[j] = false;
		}
	}

	if (!match)
	return Data;

	for (i = 0; i < plist.length; i++) {
		if (plist[i])
		return Data;
	}

	Data.mlist.push(data);
	return Data;
};

Data.setup = function() {
	Globals.awalk(Data.klist, function(i, k) {
		Data.klist[i] = k.atore();

		if (Data.plist[i])
		Data.plist[i] = Data.plist[i].atore();
	});

	Data.mlist = [];
	Selida.bodyDOM.
	empty().
	append($('<table>').
	attr('border', '1').
	append(Data.tbodyDOM = $('<tbody>')));

	return Data;
};

Data.print = function() {
	Globals.awalk(Data.mlist.sort(function(m1, m2) {
		var i, cmp;

		for (i = 0; i < m1.length; i++) {
			if (!m1[i])
			return -1;

			if (!m2[i])
			return 1;

			cmp = m1[i].localeCompare(m2[i]);
			if (cmp < 0)
			return -1;

			if (cmp > 0)
			return 1;

			return 0;
		}
	}), function(i, monada) {
		var rowDOM, empty;

		rowDOM = $('<tr>');
		empty = true;

		Globals.awalk(monada, function(i, x) {
			var s;

			s = x.replace(/(\[\[.)|(\]\])|(^[=^]+$)/g, '');

			if (!s)
			return true;

			rowDOM.append($('<td>').text(s));
			empty = false;
		});

		if (empty)
		rowDOM.remove();

		else
		Data.tbodyDOM.append(rowDOM);
	});

	return Data;
};
