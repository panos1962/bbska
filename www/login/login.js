Login = {};

$(window).ready(function() {
	Login.
	toolbarLeftSetup().
	toolbarRightSetup().
	formaSetup();

	return Login;
});

Login.toolbarLeftSetup = function() {
	Selida.toolbarLeftDOM.
	append(Selida.helpTab()).
	append(Selida.faqTab());

	return Login;
};

Login.toolbarRightSetup = function() {
	Selida.toolbarRightDOM.
	append(Selida.signupTab()).
	append(Selida.homeTab());

	return Login;
};

Login.formaSetup = function() {
	var sep, i;

	Login.action = Selida.server;

	sep = '?';
	for (i in Selida.urlParam) {
		Login.action += sep + i + '=' + Selida.urlParam[i];
		sep = '&';
	}

	Selida.ofelimoDOM.
	append($('<div>').addClass('forma').
	append(Login.formDOM = $('<form>').prop({
		method: 'post',
		action: Login.action,
	}).

	append($('<div>').addClass('formaSoma').
	append($('<div>').addClass('formaTitlos').text('Login form')).
	append($('<table>').

	append($('<tr>').
	append($('<td>').addClass('formaPrompt').text('Login')).
	append($('<td>').append(Login.loginDOM = $('<input>').
	prop('name', 'login').attr('id', 'login').addClass('formaPedio')))).

	append($('<tr>').
	append($('<td>').addClass('formaPrompt').text('Password')).
	append($('<td>').append(Login.kodikosDOM = $('<input>').
	prop({
		name: 'kodikos',
		type: 'password',
	}).attr('id', 'kodikos').
	addClass('formaPedio')))))).

	append($('<div>').addClass('formaPanel').
	append($('<button>').addClass('formaButton').prop('type', 'submit').text('Login').
	on('click', Login.submit)).
	append($('<button>').addClass('formaButton').prop('type', 'reset').text('Reset').
	on('click', Login.reset)).
	append($('<button>').addClass('formaButton').prop('type', 'button').text('Cancel').
	on('click', function(e) {
		e.stopPropagation();
		self.location = Login.action;
	}))))).

	append(Selida.errorDOM = $('<div>').attr('id', 'error'));

	Login.loginDOM.focus();
	return Login;
};

Login.submit = function(e) {
	if (e)
	e.stopPropagation();

	$.post('login.php', {
		login: Login.loginDOM.val(),
		kodikos: Login.kodikosDOM.val(),
	}, function(data) {
		if (!data)
		return self.location = Login.action;

		Selida.error(data);
		Login.loginDOM.focus();
	});

	return false;
};

Login.reset = function(e) {
	if (e)
	e.stopPropagation();

	Login.loginDOM.focus();
	return Login;
};
