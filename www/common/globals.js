Globals = {};

Globals.aa = 0;
Globals.checkaa = function(tag) {
	tag = tag ? 'aa(' + tag + ')' : 'aa';

	Globals.aa++;
	console.log(tag, Globals.aa);
};

// Η function "walk" διατρέχει όλα τα στοιχεία μιας λίστας και για κάθε στοιχείο
// καλεί κάποια function με παραμέτρους το ανά χείρας κλειδί και το αντίστοιχο
// στοιχείο της λίστας. Η μέθοδος επιστρέφει το πλήθος των στοιχείων της λίστας.

Globals.walk = function(list, callback) {
	var count = 0, i;

	if (!list)
	return count;

	for (i in list) {
		count++;

		if (callback)
		callback(i, list[i]);
	}

	return count;
};

// Η function "awalk" διατρέχει όλα τα στοιχεία ενός array και για κάθε στοιχείο
// καλεί κάποια function με παραμέτρους το ανά χείρας index και το αντίστοιχο
// στοιχείο του array. Η μέθοδος επιστρέφει το πλήθος των στοιχείων του array.
// Η κύρια διαφορά της με την "walk" είναι ότι διατρέχει τα στοιχεία του array
// με τη σειρά.

Globals.awalk = function(list, callback) {
	var i;

	if (!list)
	return 0;

	for (i = 0; i < list.length; i++) {
		if (callback)
		callback(i, list[i]);
	}

	return i;
};

// Reverse awalk

Globals.klawa = function(list, callback) {
	var i;

	if (!list)
	return 0;

	for (i = list.length - 1; i >= 0; i--) {
		if (callback)
		callback(i, list[i]);
	}

	return list.length;
};

// Η function "torams" επιστρέφει το τρέχον timestamp σε milliseconds,
// με όρους της μηχανής στην οποία εκτελείται.

Globals.torams = function() {
	return (new Date).getTime();
};

// Η function "tora" επιστρέφει το τρέχον timestamp σε seconds,
// με όρους της μηχανής στην οποία εκτελείται.

Globals.tora = function() {
	return Math.floor((new Date).getTime() / 1000);
};

// Η function "toramsServer" επιστρέφει το τρέχον timestamp
// σε milliseconds, με όρους του server. Η διαφορά ώρας μεταξύ
// server και client δίνεται στην property "timeDif" και είναι
// σε seconds.

Globals.toramsServer = function() {
	return Globals.torams() + (Client ? Client.timeDif * 1000 : 0);
};

// Η function "toraServer" επιστρέφει το τρέχον timestamp
// σε seconds, με όρους του server.

Globals.toraServer = function() {
	return Globals.tora() + (Client ? Client.timeDif : 0);
};

// Η μέθοδος "validLogin" ελέγχει ένα string ως login name. Αν
// είναι δεκτό το επιστρέφει, αλλιώς επιστρέφει κενό string.

String.prototype.validLogin = function() {
	return this.match(/^[a-zA-Z][a-zA-Z0-9_!@#=.:+-]*$/) ? this : '';
};

// Η μέθοδος "validEmail" ελέγχει ένα string ως email address. Αν
// είναι δεκτό το επιστρέφει, αλλιώς επιστρέφει κενό string.

String.prototype.validEmail = function() {
	return this.match(/^[a-zA-Z0-9_\.-]+\@([a-zA-Z0-9-]+\.)+([a-zA-Z0-9]{2,4})+$/) ? this : '';
};

String.prototype.validImage = function() {
	return this.match(/^https?:\/\/.*\.(png|jpg|gif|jpeg|ico)$/i);
};

String.prototype.invalidImage = function() {
	return !this.validImage();
};

String.prototype.validYouTube = function() {
	return this.match(/^https?:\/\/youtu\.be\//);
};

String.prototype.invalidYouTube = function() {
	return !this.validYouTube();
};

String.prototype.validLink = function() {
	return this.match(/^https?:\/\/.*/i);
};

// Η μέθοδος "json" επιστρέφει json safe μορφή του ανά χείρας string.

String.prototype.json = function(nl) {
	return Globals.json(this.valueOf(), nl);
};

// Η μέθοδος "uri" μετατρέπει ένα string σε μορφή ασφαλή
// ώστε να χρησιμοποιηθεί ως URI component.

String.prototype.uri = function() {
	return encodeURIComponent(this);
};

String.prototype.decorStrip = function() {
	return this.replace(/(\[\[.)|(\]\])/g, '');
};

String.prototype.evalAsfales = new Function('', "var x; eval('x = ' + this.valueOf() + ';'); return x;");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

String.prototype.atore = function() {
	var pat, i, c;

	pat = '';

	for (i = 0; i < this.length; i++) {
		switch (c = this.substr(i, 1)) {
		case '%':
			pat += '.*';
			break;
		case '_':
			pat += '.';
			break;
		case 'α':
		case 'ά':
		case 'Α':
		case 'Ά':
			pat += '[αάΑΆ]';
			break;
		case 'ε':
		case 'έ':
		case 'Ε':
		case 'Έ':
			pat += '[εέΕΈ]';
			break;
		case 'η':
		case 'ή':
		case 'Η':
		case 'Ή':
			pat += '[ηήΗΉ]';
			break;
		case 'ι':
		case 'ί':
		case 'ϊ':
		case 'ΐ':
		case 'Ι':
		case 'Ί':
		case 'Ϊ':
			pat += '[ιίϊΐΙΊΪ]';
			break;
		case 'ο':
		case 'ό':
		case 'Ο':
		case 'Ό':
			pat += '[οόΟΌ]';
			break;
		case 'υ':
		case 'ύ':
		case 'ϋ':
		case 'ΰ':
		case 'Υ':
		case 'Ύ':
		case 'Ϋ':
			pat += '[υύϋΰΥΎΫ]';
			break;
		case 'ω':
		case 'ώ':
		case 'Ω':
		case 'Ώ':
			pat += '[ωώΩΏ]';
			break;
		case 'σ':
		case 'Σ':
		case 'ς':
			pat += '[σΣς]';
			break;
		default:
			pat += c;
			break;
		}
	}

	try {
		return new RegExp(pat, 'i');
	} catch (e) {
		return /.^/;	// never match
	}
};

// Η μέθοδος "random" επιστρέφει έναν τυχαίο ακέραιο μεταξύ των τιμών που δίνονται
// ως παράμετροι (inclusive). Π.χ. η κλήση Globals.random(5, 10) μπορεί να δώσει 5,
// 6, 7, 8, 9 και 10.

Globals.random = function(min, max) {
	switch (arguments.length) {
	case 0:
		min = 0;
		max = 999999999;
		break;
	case 1:
		max = min;
		min = 0;
		break;
	}

	return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Η μέθοδος "randomString" επιστρέφει ένα τυχαίο string με μήκος που καθορίζεται
// από τις παραμέτρους. Το string αποτελείται από γράμματα του λατινικού αλφαβήτου,
// αλλά αν θέλουμε μπορούμε να περάσουμε αυθαίρετο string από το οποίο θα επιλεγούν
// χαρακτήρες.

Globals.randomString = function(min, max, pool) {
	var ret;

	if (max === undefined)
	max = min;

	if (pool === undefined)
	pool = 'abcdefghijklmnopqrstuvwxyz';

	ret = '';
	max = Globals.random(min, max);

	for (min = 0; min < max; min++)
	ret += pool.substr(Globals.random(pool.length - 1), 1);

	return ret;
};

Globals.initObject = function(obj, props, opt) {
	var i;

	if (opt === undefined)
	opt = {
		functions: false,
		recursive: true,
	};

	for (i in props) {
		if (props[i] === null)
		obj[i] = null;

		else if (typeof props[i] === 'function') {
			if (opt.functions)
			obj[i] = props[i];
		}

		else if (typeof props[i] !== 'object')
		obj[i] = props[i];

		else if (opt.recursive) {
			if (props[i] instanceof Array)
			obj[i] = Globals.initObject([], props[i]);

			else
			obj[i] = Globals.initObject({}, props[i]);
		}

		else
		obj[i] = props[i];
	}

	return obj;
};
