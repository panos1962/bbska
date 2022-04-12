Account = {};

$(window).
ready(function() {
	Account.
	toolbarLeftSetup().
	toolbarRightSetup().
	formaSetup();

	return Account;
}).
on('unload', function() {
	if (!self.opener)
	return;

	delete self.opener.accountWindow;
});

Account.toolbarLeftSetup = function() {
	return Account;
};

Account.toolbarRightSetup = function() {
	Selida.toolbarRightDOM.
	append(Selida.closeTab('rtab')).
	append(Selida.baseTab('rtab'));

	return Account;
};

Account.formaSetup = function() {
	Selida.ofelimoDOM.
	append($('<div>').addClass('forma').
	append($('<div>').
	on('keypress', function(e) {
		if (e.which !== 13)
		return;

		Account.submit(e);
	}).
	append($('<div>').addClass('formaSoma').
	append($('<div>').addClass('formaTitlos').text('Account form')).
	append($('<table>').

	append($('<tr>').
	append($('<td>').addClass('formaPrompt').text('Login')).
	append($('<td>').append(Account.loginDOM = $('<input>').
	val(Selida.session.login).
	prop({
		name: 'login',
		disabled: true,
	}).addClass('formaPedio')))).

	append($('<tr>').
	append($('<td>').addClass('formaPrompt').text('Name')).
	append($('<td>').append(Account.onomaDOM = $('<input>').
	prop('name', 'onoma').addClass('formaPedio')))).

	append($('<tr>').
	append($('<td>').addClass('formaPrompt').text('Email')).
	append($('<td>').append(Account.emailDOM = $('<input>').
	prop('name', 'email').addClass('formaPedio').
	on('keydown', function(e) {
		$(this).removeClass('error');
	})))).

	append($('<tr>').
	append($('<td>').addClass('formaPrompt').text('Current password')).
	append($('<td>').append(Account.kodikosDOM = $('<input>').
	prop('name', 'kodikos').addClass('formaPedio').prop('type', 'password')).
	append('&nbsp;*'))).

	append($('<tr>').
	append($('<td>').addClass('formaPrompt')).
	append($('<td>').append(Account.alagiDOM = $('<a href="#">').append('Change password').
	attr('id', 'alagi').addClass('formaPedio').
	on('mousedown', function(e) {
		e.preventDefault();
	}).
	on('click', function(e) {
		e.stopPropagation();

		Account.kodikos1DOM.val('');
		Account.kodikos2DOM.val('');

		Account.alagi = !Account.alagi;
		if (Account.alagi) {
			$('.alagi').css('display', 'table-row');
			Account.kodikos1DOM.focus();
		}
		else {
			$('.alagi').css('display', 'none');
			Account.kodikosDOM.focus();
		}

		return false;
	})))).

	append($('<tr class="alagi">').
	append($('<td>').addClass('formaPrompt').text('New password')).
	append($('<td>').append(Account.kodikos1DOM = $('<input>').
	prop('name', 'kodikos1').addClass('formaPedio').prop('type', 'password')))).

	append($('<tr class="alagi">').
	append($('<td>').addClass('formaPrompt').text('Repeat')).
	append($('<td>').append(Account.kodikos2DOM = $('<input>').
	prop('name', 'kodikos2').addClass('formaPedio').prop('type', 'password'))))))).

	append($('<div>').addClass('formaPanel').

	append($('<button>').addClass('formaButton').prop('type', 'submit').text('Update account').
	on('click', Account.submit)).

	append($('<button>').addClass('formaButton').prop('type', 'reset').text('Reset').
	on('click', Account.reset)).

	append($('<button>').addClass('formaButton').prop('type', 'button').text('Cancel').
	on('click', function(e) {
		e.stopPropagation();
		self.close();
	})))).

	append(Selida.errorDOM = $('<div>').attr('id', 'error'));

	Account.reset();
	return Account;
};

Account.submit = function(e) {
	var email;

	if (e)
	e.stopPropagation();

	email = Account.emailDOM.focus().val();
	if (email && (!email.validEmail())) {
		Selida.error('Invalid email');
		Account.emailDOM.addClass('error').focus();
		return false;
	}

	$.post('putData.php', {
		login: Account.loginDOM.val(),
		onoma: Account.onomaDOM.val(),
		email: email,
		kodikos1: Account.kodikos1DOM.val(),
		kodikos2: Account.kodikos2DOM.val(),
		kodikos: Account.kodikosDOM.val(),
	}, function(data, status){
		if (!data)
		return(self.close());

		switch (Selida.error(data, {
			UU: 'Unknown user',
			DP: 'Wrong new password',
		})) {
		case 'UU':
			Account.onomaDOM.focus();
			break;
		case 'DP':
			Account.kodikos1DOM.focus();
			break;
		default:
			Account.kodikosDOM.focus();
			break;
		}
	});

	return false;
};

Account.reset = function(e) {
	var a, b;

	if (e)
	e.stopPropagation();

	$.post('getData.php', {
		login: Account.loginDOM.val(),
	}, function(data, status) {
		var xristis;

		if (!data)
		return;

		try {
			xristis = ('{' + data + '}').evalAsfales();
			Account.onomaDOM.val(xristis.onoma);
			Account.emailDOM.val(xristis.email);
		} catch (e) {
			Selida.error('Error');
		}
	});

	Account.onomaDOM.focus();

	return Account;
};
