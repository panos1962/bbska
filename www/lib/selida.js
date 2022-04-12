$(window).ready(function() {
	Selida.setup();
});

Selida = {};

Selida.setup = function() {
	Selida.login = Selida.session.login;
	Selida.windowDOM = $(window);
	Selida.bodyDOM = $(document.body);
	Selida.toolbarLeftDOM = $('#toolbarLeft');
	Selida.toolbarRightDOM = $('#toolbarRight');

	Selida.ofelimoDOM = $('#ofelimo').
	append($('<div>').attr('id', 'copyright').
	html('&copy; Panos Papadopoulos 2015&ndash;'));

	Selida.errorDOM = $();
	Selida.inputSetup();

	if (Selida.oxiLogin())
	return Selida;

	setInterval(function() {
		$.post(Selida.server + 'lib/session.php').
		fail(function() {
			console.error('session.php::error');
		});
	}, 300000);

	return Selida;
};

Selida.inputSetup = function() {
	Selida.bodyDOM.

	on('selectstart', 'input,textarea', function(e) {
		e.stopPropagation();
		return true;
	}).

	on('keyup', 'input,textarea', function(e) {
		var driver, stored;

		switch (e.which) {
		case 27:
			stored = $(this).data('val');
			val = $(this).val();
			$(this).val(stored);

			if (stored === undefined)
			$(this).data('val', val);

			else
			$(this).removeData('val');

			driver = $(this).data('escape');
			if (driver)
			driver($(this));

			break;
		default:
			$(this).removeData('val');

			driver = $(this).data('driver');
			if (driver)
			driver($(this), e);

			break;
		}
	});

	return Selida;
};

Selida.isLogin = function(login) {
	if (!Selida.login)
	return false;

	if (login === undefined)
	return true;

	return(Selida.login === login);
};

Selida.oxiLogin = function(login) {
	return !Selida.isLogin(login);
};

Selida.closeTab = function(tab) {
	if (tab === undefined)
	tab = 'ltab';

	return Selida[tab]($('<a href="#">Close</a>').
		on('click', function(e) {
			e.stopPropagation();
			self.close();
			return false;
		}));
};

Selida.baseTab = function() {
	return Selida.ltab($('<a target="bbska" href="' + Selida.server + '">Base</a>').
		on('click', function(e) {
			e.stopPropagation();

			if (!self.opener)
			return true;

			window.open('', 'bbska').focus();
			return false;
		}));
};

Selida.helpTab = function() {
	return Selida.ltab($('<a target="help" href="' + Selida.server + 'help">Help</a>').
		on('click', function(e) {
			e.stopPropagation();

			if (!self.helpWindow)
			self.helpWindow = window.open(Selida.server + 'help', 'help');

			self.helpWindow.focus();
			return false;
		}));
};

Selida.faqTab = function() {
	return Selida.ltab($('<a target="FAQ" href="' + Selida.server + 'faq">FAQ</a>').
		on('click', function(e) {
			e.stopPropagation();

			if (!self.FAQWindow)
			self.FAQWindow = window.open(Selida.server + 'faq', 'FAQ');

			self.FAQWindow.focus();
			return false;
		}));
};

Selida.printTab = function() {
	return Selida.ltab($('<a href="#">Print</a>').
	on('click', function(e) {
		e.stopPropagation();
		window.print();
	}));
};

Selida.homeTab = function() {
	return Selida.rtab('<a target="_self" href="' + Selida.server + '">Home</a>');
};

Selida.signupTab = function() {
	return Selida.rtab($('<a href="signup">Signup</a>').
		on('click', function(e) {
			e.stopPropagation();
			self.location = Selida.server + 'signup';
			return false;
		}));
};

Selida.loginTab = function(loginMessage) {
	if (loginMessage === undefined)
	loginMessage = 'Login';

	return Selida.rtab($('<a href="login">' + loginMessage + '</a>').
		on('click', function(e) {
			var loc, i, sep;

			e.stopPropagation();
			loc = Selida.server + 'login';

			sep = '?';
			for (i in Selida.urlParam) {
				loc += sep + i + '=' + Selida.urlParam[i];
				sep = '&';
			}

			self.location = loc;
			return false;
		}));
};

Selida.accountTab = function() {
	if (Selida.oxiLogin())
	return $();

	return Selida.rtab($('<a id="account" target="account" href="' +
		Selida.server + 'account">' + Selida.login + '</a>').
		on('click', function(e) {
			e.stopPropagation();

			if (!self.accountWindow)
			self.accountWindow = window.open(Selida.server + 'account', 'account');

			self.accountWindow.focus();
			return false;
		}));
};

Selida.exitTab = function() {
	if (Selida.oxiLogin())
	return $();

	return Selida.rtab($('<a href="#">Exit</a>').
		on('click', function(e) {
			e.stopPropagation();
			$.post(Selida.server + 'lib/exit.php', function(data) {
				self.location = Selida.server;
			});
			return false;
		}));
};

Selida.tab = function(dom, opts) {
	var tab;

	tab = $('<div>').addClass('tab').append(dom);

	if (opts.left)
	tab.addClass('tabLeft');

	else if (opts.right)
	tab.addClass('tabRight');

	return tab;
};

Selida.ltab = function(dom, opts) {
	if (opts === undefined)
	opts = {};

	delete opts.right;
	opts.left = true;
	return Selida.tab(dom, opts);
};

Selida.rtab = function(dom, opts) {
	if (opts === undefined)
	opts = {};

	delete opts.left;
	opts.right = true;
	return Selida.tab(dom, opts);
};

Selida.error = function(msg, lista) {
	var minima;

	Selida.clearErrorTimer();

	msg = msg.replace(Selida.errsepRE, '');
	if (!msg)
	return Selida;

	minima = (lista && lista.hasOwnProperty(msg)) ? lista[msg] : msg;

	setTimeout(function() {
		Selida.errorDOM.empty();
	}, 15000);
	Selida.errorDOM.text(minima);

	return msg;
};


Selida.clearErrorTimer = function() {
	if (Selida.errorTimer)
	clearTmeout(Selida.errorTimer);

	delete Selida.errorTimer;
	return Selida;
};

jQuery.fn.peristrofiStart = function(opts) {
	var obj = this, deg = 0;

	this.peristrofiStop();

	if (opts === undefined)
	opts = {};

	if (!opts.hasOwnProperty('fora'))
	opts.fora = 1;

	if (!opts.hasOwnProperty('vima'))
	opts.vima = 15;

	if (!opts.hasOwnProperty('delay'))
	opts.delay = 10;

	this.data('peristrofiTimer', setInterval(function() {
		deg += (opts.vima * opts.fora);
		obj.css('transform', 'rotate(' + deg + 'deg)');
	}, opts.delay));

	return this;
};

jQuery.fn.peristrofiStop = function() {
	var timer;

	timer = this.data('peristrofiTimer');

	if (!timer)
	return this;

	clearInterval(timer);
	this.css('transform', '').removeData('peristrofiTimer');

	return this;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////@

Globals.anadisiLevel = 0;

jQuery.fn.anadisi = function() {
	Globals.anadisiLevel++;
	$(this).css('z-index', Globals.anadisiLevel);
	return $(this);
};

jQuery.fn.patima = function() {
	var bc;

	bc = $(this).finish().css('border-color');
	if (!bc)
	bc = '';

	$(this).
	css('border-color', 'rgb(255, 255, 195)').
	animate({
		borderColor: bc,
	}, {
		duration: 200,
		complete: function() {
			$(this).css('border-color', bc);
		},
	});

	return $(this);
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////@

Selida.klisimo = function(callback) {
	return $('<img>').addClass('klisimoIcon').attr({
		src: Selida.server + 'ikona/misc/klisimo.png',
	}).

	on('mouseenter', function(e) {
		e.stopPropagation();
		$(this).addClass('klisimoIconEmfanes');
	}).

	on('mouseleave', function(e) {
		e.stopPropagation();
		$(this).removeClass('klisimoIconEmfanes');
	}).

	// Λαμβάνουμε μέριμνα για τα συρόμενα στοιχεία.

	on('mousedown', function(e) {
		e.stopPropagation();
	}).

	on('click', function(e) {
		e.stopPropagation();
		if (callback) callback();
		else $(this).parent().finish().fadeOut(200, function() {
			$(this).remove();
		});
	});
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Globals.debugAA = 0;

Globals.debug = function(x) {
	console.log(++Globals.debugAA, x);
	return Globals;
};
