Dump = {};

$(document).
ready(function() {
	Dump.
	toolbarLeftSetup().
	toolbarRightSetup().
	plistSetup();
});

Dump.plistSetup = function() {
	var i;

	Selida.ofelimoDOM.
	append(Dump.formDOM = $('<form>').
	attr({
		id: 'plistForm',
		method: 'GET',
		action: 'data.php',
		target: '_blank',
	}).
	append($('<div>').attr('id', 'neo').
	append($('<img>').attr({
		id: 'neoIcon',
		src: '../ikona/misc/add.png',
	})).
	on('click', function(e) {
		e.stopPropagation();
		Dump.
		plistAdd().
		focusLast();
	})).
	append($('<input>').attr({
		id: 'submit',
		type: 'submit',
		value: 'Submit',
	})).
	on('submit', function() {
		var cont = false;

		Dump.plistDOM.children().each(function() {
			var item = $(this), ok = false;

			$(this).find('input').each(function() {
				if ($(this).val()) {
					ok = true;
					return false;
				}
			});

			if (ok)
			cont = true;

			// Αν τα κριτήρια της ανά χείρας γραμμής είναι κενά,
			// κάνουμε disable τα σχετικά input fields ώστε να
			// μην μεταφερθούν στη φόρμα εκτύπωσης χωρίς λόγο.
			// Από εκεί θα τα επαναφέρουμε σε enabled.

			else
			$(this).find('input').prop('disabled', true);

			return true;
		});

		if (cont)
		return true;

		Dump.plistDOM.find('input').prop('disabled', false);
		Dump.focusFirst();

		return false;
	}).

	append(Dump.rootDOM = $('<input>').attr({
		name: 'root',
		type: 'hidden',
	})).

	append(Dump.plistDOM = $('<div>').
	attr('id', 'plist').
	sortable({
		axis: 'y',
		containment: 'parent',
		handle: '.handler',
	})));

	for (i = 0; i < 4; i++)
	Dump.plistAdd();

	Dump.
	focusFirst().
	rootSetup();

	return Dump;
};

Dump.rootSetup = function() {
	var root, bbska;

	root = undefined;

	if (Dump.hasOwnProperty('root'))
	root = Dump.root;

	else if (self.opener && self.opener.hasOwnProperty('Bbska') && self.opener.Bbska.hasOwnProperty('root'))
	root = self.opener.Bbska.root.kodikos;

	else
	root = 2;

	Dump.rootDOM.val(root);

	Dump.
	anamoni().
	loading();

	$.post('../bbska.php', {
		action: 'imageget',
		root: root,
	}, function(data) {
		try {
			if (!data)
			throw 'no data';

			Dump.image = ('{' + data + '}').evalAsfales();
			Dump.
			anamoni(false).
			loading(false).
			focusFirst();
		} catch (e) {
			Selida.ofelimoDOM.text('invalid data');
		}
	}).
	fail(function() {
		Selida.ofelimoDOM.text('no data');
	});

	return Dump;
};

Dump.focusFirst = function() {
	Dump.plistDOM.children('.pitem').first().
	children('.pedio').children('input').focus();

	return Dump;
};

Dump.focusLast = function() {
	Dump.plistDOM.children('.pitem').last().
	children('.pedio').children('input').focus();

	return Dump;
};

Dump.anamoni = function(stat) {
	var display;

	if (stat === undefined)
	stat = true;

	display = (stat ? 'none' : 'block');

	Dump.plistDOM.css('display', display);
	Dump.formDOM.css('display', display);

	return Dump;
};

Dump.loading = function(stat) {
	if (stat === undefined)
	stat = true;

	if (stat)
	Selida.ofelimoDOM.
	prepend($('<div>').attr('id', 'loading').text('Loading…'));

	else
	$('#loading').finish().slideUp(function() {
		$(this).remove();
	});

	return Dump;
};

Dump.plistAdd = function() {
	Dump.plistDOM.
	append($('<div>').addClass('pitem').

	append(Dump.baresDOM()).
	append($('<div>').addClass('pedio').
	append($('<input>').addClass('patInput').attr({
		name: 'key[]',
		placeholder: 'Atrribute pattern',
	}))).

	append(Dump.baresDOM()).
	append($('<div>').addClass('kritirio').
	append($('<input>').addClass('patInput').attr({
		name: 'pat[]',
		placeholder: 'Value pattern',
	}))).

	append(Dump.baresDOM()).
	append($('<div>').addClass('delete').
	append($('<img>').addClass('deleteIcon').
	attr('src', '../ikona/misc/Xred.png')).
	on('click', function(e) {
		e.stopPropagation();
		$(this).closest('.pitem').
		finish().
		slideUp(100, function() {
			$(this).remove();
		});
	})));

	return Dump;
};

Dump.baresDOM = function() {
	return $('<div>').addClass('handler').
	append($('<img>').addClass('handlerIcon').
	attr('src', '../ikona/misc/baresV.png'));
};

Dump.toolbarLeftSetup = function() {
	if (self.opener)
	Selida.toolbarLeftDOM.
	append(Selida.baseTab()).
	append(Selida.closeTab());

	else
	Selida.toolbarLeftDOM.
	append(Selida.homeTab());

	return Dump;
};

Dump.toolbarRightSetup = function() {
	if (Selida.oxiLogin()) {
		Selida.toolbarRightDOM.
		append(Selida.signupTab()).
		append(Selida.loginTab());
	}
	else {
		Selida.toolbarRightDOM.
		append(Selida.accountTab()).
		append(Selida.exitTab());
	}

	return Dump;
};
