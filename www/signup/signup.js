Signup = {};

$(window).ready(function() {
	Signup.
	toolbarLeftSetup().
	toolbarRightSetup().
	formaSetup();

	return Signup;
});

Signup.toolbarLeftSetup = function() {
	Selida.toolbarLeftDOM.
	append(Selida.helpTab()).
	append(Selida.faqTab());

	return Signup;
};

Signup.toolbarRightSetup = function() {
	Selida.toolbarRightDOM.
	append(Selida.homeTab()).
	append(Selida.loginTab());

	return Signup;
};

Signup.formaSetup = function() {
	Selida.ofelimoDOM.
	append($('<form>').addClass('forma').
	append($('<div>').addClass('formaSoma').
	append($('<div>').addClass('formaTitlos').text('Signup form')).
	append($('<table>').

	append($('<tr>').
	append($('<td>').addClass('formaPrompt').text('Login')).
	append($('<td>').append(Signup.loginDOM = $('<input>').
	prop('name', 'login').addClass('formaPedio').
	data('driver', Signup.checkLogin)))).

	append($('<tr>').
	append($('<td>').addClass('formaPrompt').text('Password')).
	append($('<td>').append(Signup.kodikosDOM = $('<input>').
	prop('name', 'kodikos').addClass('formaPedio')))).

	append($('<tr>').
	append($('<td>').addClass('formaPrompt').text('Repeat')).
	append($('<td>').append(Signup.kodikos2DOM = $('<input>').
	prop('name', 'kodikos2').addClass('formaPedio')))).

	append($('<tr>').
	append(Signup.robotDOM = $('<td>').addClass('formaPrompt')).
	append($('<td>').append(Signup.toborDOM = $('<input>').
	prop('name', 'tobor').addClass('formaPedio')))))).

	append($('<div>').addClass('formaPanel').

	append($('<button>').addClass('formaButton').prop('type', 'submit').text('Create account').
	on('click', Signup.submit)).

	append($('<button>').addClass('formaButton').prop('type', 'reset').text('Reset').
	on('click', Signup.reset)).

	append($('<button>').addClass('formaButton').prop('type', 'button').text('Cancel').
	on('click', function(e) {
		e.stopPropagation();
		self.location = Selida.server;
	})))).

	append(Selida.errorDOM = $('<div>').attr('id', 'error'));

	Signup.toborDOM.css('width', Signup.loginDOM.css('width'));
	Signup.reset();
	setTimeout(function() {
		Signup.kodikosDOM.prop('type', 'password');
		Signup.kodikos2DOM.prop('type', 'password');
	}, 100);

	return Signup;
};

Signup.submit = function(e) {
	var login;

	if (e)
	e.stopPropagation();

	login = Signup.loginDOM.focus().val();
	if (!login.validLogin()) {
		Signup.loginDOM.addClass('error').focus();
		return false;
	}

	$.post('signup.php', {
		login: login,
		kodikos: Signup.kodikosDOM.val(),
		kodikos2: Signup.kodikos2DOM.val(),
		robot: Signup.robot,
		tobor: Signup.toborDOM.val(),
	}, function(data, status){
		if (!data) {
			self.location = Selida.server;
			return;
		}

		switch (Selida.error(data, {
			WA: "Wrong answer",
			WP: "Wrong password",
			FCA: "Failed to create account",
			FUA: "Failed to update account",
			LNM: "Login name missing",
			FCU: "Failed to create unit",
		})) {
		case 'WA':
			Signup.toborDOM.focus();
			break;
		case 'WP':
			Signup.kodikosDOM.focus();
			break;
		case 'FCA':
		case 'FUA':
		case 'LNM':
		case 'FCU':
			Signup.loginDOM.focus();
			break;
		}
	});

	return false;
};

Signup.reset = function(e) {
	var a, b;

	if (e)
	e.stopPropagation();

	a = Globals.random(1, 99);
	b = Globals.random(1, 99);
	Signup.robotDOM.text(a + ' + ' + b);
	Signup.robot = a + b;

	Signup.loginDOM.focus();

	return Signup;
};

Signup.checkLogin = function(fld, e) {
	var login, len, delay;

	if (Signup.checkLoginTimer)
	clearTimeout(Signup.checkLoginTimer);

	delete Signup.checkLoginTimer;

	login = fld.val();
	len = login.length;

	if (len < 1)
	return fld.removeClass('error');

	if (!login.validLogin())
	return fld.addClass('error');

	if (len < 3)
	delay = 500;

	else if (len < 5)
	delay = 300;

	else
	delay = 200;

	Signup.checkLoginTimer = setTimeout(function() {
		Signup.checkLoginNow(login, fld);
	}, delay);
};

Signup.checkLoginNow = function(login, fld) {
	$.post('checkLogin.php', {
		login: login,
	}, function(data) {
		if (data)
		fld.addClass('error');

		else
		fld.removeClass('error');
	});
};
