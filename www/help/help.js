Help = {};

$(window).
ready(function() {
	Help.
	toolbarLeftSetup().
	toolbarRightSetup().
	indexSetup();
}).
on('unload', function() {
	if (self.opener)
	delete self.opener[self.name + 'Window'];
});

Help.toolbarLeftSetup = function() {
	// Αν η σελίδα help/FAQ έχει εκκινήσει από το αντίστοιχο tab άλλης
	// σελίδας, τότε παρέχουμε μια επιπλέον ευκολία στον χρήστη ώστε
	// να μπορεί να κλείσει τη σελίδα με κλικ στο ίδιο σημείο. Αυτός
	// είναι ο λόγος που αλλάζουμε τη σειρά των σχετικών tabs.

	if (self.opener)
	switch (self.name) {
	case 'help':
		Selida.toolbarLeftDOM.
		append(Selida.closeTab()).
		append(Selida.baseTab());
		break;
	default:
		Selida.toolbarLeftDOM.
		append(Selida.baseTab()).
		append(Selida.closeTab());
		break;
	}

	else
	Selida.toolbarLeftDOM.
	append(Selida.homeTab());

	return Help;
};

Help.toolbarRightSetup = function() {
	if (!self.opener)
	Selida.toolbarRightDOM.
	append(Selida.accountTab()).
	append(Selida.exitTab());

	return Help;
};

Help.indexSetup = function() {
	var indexDOM, aa;

	Selida.ofelimoDOM.
	prepend(indexDOM = $('<ul>').addClass('index'));

	aa = 0;
	$('h3').each(function() {
		var text;

		aa++;
		text = $(this).text();

		indexDOM.
		append($('<li>').
		append($('<a>').attr({
			id: 'idx' + aa,
			href: '#' + aa,
		}).text(text).
		data('epikefalida', $(this)).
		on('click', function(e) {
			Help.markClear();
			$(this).addClass('mark');
			$(this).data('epikefalida').children('a').addClass('mark');
			return true;
		})));

		$(this).empty().
		append($('<a>').attr({
			name: aa,
			href: '#',
			title: 'Top of page',
		}).text(text).
		data('idx', aa).
		on('click', function(e) {
			Help.markClear();
			$('#idx' + $(this).data('idx')).addClass('mark');
			$(this).addClass('mark');
			return true;
		}));

		return true;
	});

	return Help;
};

Help.markClear = function() {
	$('.mark').removeClass('mark');

	return Help;
};
