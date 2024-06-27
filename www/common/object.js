Monada = function(props) {
	Globals.initObject(this, props);
};

Monada.prototype.attrPush = function(attr) {
	this.alist.push(attr);
	return this;
};

Monada.prototype.onketSet = function() {
	this.onket = {};

	this.teknoWalk(function(i, tekno) {
		onket[tekno.kodikos] = true;
		return true;
	});

	return this;
};

Monada.prototype.teknoPush = function(tekno) {
	this.tekno.push(tekno);

	if (typeof tekno !== 'number')
	tekno = tekno.kodikos;

	if (this.hasOwnProperty('onket'))
	this.onket[tekno] = true;

	return this;
};

Monada.prototype.attrWalk = function(callback) {
	var i;

	if (!this.hasOwnProperty('alist'))
	return this;

	for (i = 0; i < this.alist.length; i++) {
		if (!callback.call(this.alist[i], i))
		break;
	}

	return this;
};

Monada.prototype.attrGet = function(key) {
	var val = '';

	this.attrWalk(function() {
		if (this.keyGet() !== key)
		return true;

		val = this.valGet();
		return false;
	});

	return val;
};

Monada.prototype.attrExists = function(key) {
	var i;

	for (i = 0; i < this.alist.length; i++) {
		if (this.alist[i].keyGet() === key)
		return true;
	}

	return false;
};

Monada.prototype.titlosGet = function() {
	return this.attrGet('_title_');
};

Monada.prototype.iconGet = function() {
	return this.attrGet('_icon_');
};

Monada.prototype.oxiIcon = function() {
	return !this.iconGet();
};

Monada.prototype.isExplosive = function() {
	return this.attrExists('_explode_');
};

Monada.prototype.isNeutral = function() {
	return this.attrExists('_neutral_');
};

Monada.prototype.isTerminal = function() {
	return this.attrExists('_block_');
};

Monada.prototype.oxiTerminal = function() {
	return !this.isTerminal();
};

Monada.prototype.isChain = function() {
	return this.attrExists('_chain_');
};

Monada.prototype.teknoWalk = function(callback) {
	var i;

	if (!this.hasOwnProperty('tekno'))
	return this;

	for (i = 0; i < this.tekno.length; i++) {
		if (!callback.call(this.tekno[i], i))
		break;
	}

	return this;
};

Monada.prototype.teknoDelete = function(tekno) {
	var onket, i, t;

	if (typeof tekno !== 'number')
	tekno = tekno.kodikos;

	onket = [];
	for (i = 0; i < this.tekno.length; i++) {
		t = this.tekno[i];

		if (typeof t !== 'number')
		t = t.kodikos;

		if (t !== tekno)
		onket.push(t);
	}

	this.tekno = onket;

	if (this.hasOwnProperty('onket'))
	delete onket[tekno];

	return this;
};

Monada.prototype.attrFix = function() {
	var monada = this;

	this.attrWalk(function(i) {
		monada.alist[i] = new Attrib(monada.alist[i]);
		return true;
	});

	return this;
};

Monada.prototype.teknoFix = function() {
	var monada = this;

	this.teknoWalk(function(i) {
		monada.tekno[i] = new Monada(monada.tekno[i]).fix();
		return true;
	});

	return this;
};

Monada.prototype.fix = function() {
	this.
	attrFix().
	teknoFix();

	return this;
};

Monada.prototype.deleteTekno = function(kodikos) {
	var onket = [];

	this.teknoWalk(function(i) {
		if (this.kodikos === kodikos)
		return true;

		onket.push(this);
		return true;
	});

	this.tekno = onket;
	return this;
};

Monada.prototype.deleteTekno = function(kodikos) {
	var onket = [];

	this.teknoWalk(function(i) {
		if (this.kodikos === kodikos)
		return true;

		onket.push(this);
		return true;
	});

	this.tekno = onket;
	return this;
};

Monada.prototype.teknoCount = function() {
	return this.tekno.length;
}

Monada.prototype.isTekno = function() {
	return this.tekno.length;
}

Monada.prototype.oxiTekno = function() {
	return !this.isTekno();
}

Monada.prototype.isSystem = function() {
	return(this.idiotikotita === 'SYSTEM');
};

Monada.prototype.oxiSystem = function() {
	return !this.isSystem();
};

Monada.prototype.isPublic = function() {
	return(this.idiotikotita === 'PUBLIC');
};

Monada.prototype.isPrivate = function() {
	return !this.isPublic();
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////@

Monada.prototype.teknoSort = function() {
	// Κατά την ταξινόμηση θα ληφθούν υπόψιν πρώτα τυχόν sort attributes
	// και δευτερευόντως τα indices των υπό σύγκριση στοιχείων. Προσθέτουμε,
	// λοιπόν, σε κάθε τέκνο το σχετικό index ως attribute.

	this.teknoWalk(function(i) {
		this.idx = i;
		return true;
	});

	// Εκκινούμε την ταξινόμηση. Αν κάποιο στοιχείο έχει sort attribute,
	// τότε αυτό το attribute κατισχύει στον καθορισμό της σειράς, αλλιώς
	// χρησιμοποιούμε τα indices των στοιχείων προκειμένου να μη χαλάσουμε
	// τη σειρά στην οποία ο χρήστης έχει τοποθετήσει τα τέκνα.

	this.tekno.sort(function(t1, t2) {
		var s1, s2, cmp;

		s1 = t1.sortGet();
		s2 = t2.sortGet();

		cmp = s1.localeCompare(s2);

		if (cmp)
		return cmp;

		if (t1.idx < t2.idx)
		return -1;

		if (t1.idx > t2.idx)
		return 1;

		return 0;
	});

	return this;
};

Monada.prototype.sortGet = function() {
	if (!this.hasOwnProperty('sortKey'))
	this.sortSet();

	return this.sortKey;
};

Monada.prototype.sortSet = function() {
	var monada = this, sep = '';

	this.sortKey = '';

	this.attrWalk(function(i) {
		if (this.oxiSort())
		return true;

		monada.sortKey += sep + this.valGet();
		sep = ':';

		return true;
	});

	return this;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////@

Attrib = function(props) {
	Globals.initObject(this, props);
};

Attrib.prototype.keyGet = function() {
	return this.key;
};

Attrib.prototype.valGet = function() {
	return this.val;
};

Attrib.prototype.isSort = function() {
	return(this.keyGet().isSort());
};

Attrib.prototype.oxiSort = function() {
	return !this.isSort();
};

Attrib.prototype.tiposSort = function() {
	return(this.keyGet().tiposSort());
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////@

Token = function(s) {
	var i;

	this.aploma = 0;
	delete this.justify;
	this.text = '';
	delete this.link;

	if (!s)
	return;

	for (i = 0; i < s.length; i++) {
		switch (s.substr(i, 1)) {
		case '=':
			this.justify = true;
			// FALL THROUGH!!!
		case '^':
			this.aploma++;
			continue;
		}

		if (i > 0)
		this.link = s.substr(i);

		else
		this.text = s;

		return;
	}
}

Token.prototype.textSet = function(text) {
	this.text = text;
	return this;
};

Token.prototype.aplomaSet = function(aploma) {
	this.aploma = aploma;
	return this;
};

Token.prototype.linkSet = function(link) {
	this.link = link;
	return this;
};

Token.prototype.isEmpty = function() {
	return(this.oxiAploma() && this.oxiText())
};

Token.prototype.isNormal = function() {
	return(this.oxiAploma());
};

Token.prototype.isText = function() {
	return(this.text !== '');
};

Token.prototype.oxiText = function() {
	return !this.isText();
};

Token.prototype.isAploma = function(aploma) {
	if (aploma === undefined)
	return this.aploma;

	return(this.aploma === aploma);
};

Token.prototype.oxiAploma = function() {
	return !this.aploma;
};

Token.prototype.isJustify = function() {
	return this.justify;
};

Token.prototype.isLink = function() {
	return this.link;
};

Token.prototype.oxiLink = function() {
	return !this.isLink();
};

Token.prototype.isTitle = function() {
	return this.text.isTitle();
};

Token.prototype.oxiTitle = function() {
	return !this.isTitle();
};

Token.prototype.isSpecial = function() {
	return this.text.isSpecial();
};

Token.prototype.oxiSpecial = function() {
	return !this.isSpecial();
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////@

String.prototype.isSpecial = function() {
	switch (this.valueOf()) {
	case '_title_':
	case '_icon_':
	case '_neutral_':
	case '_explode_':
	case '_block_':
	case '_chain_':
	case '_chinfo_':
		return true;
	}

	return false;
};

String.prototype.oxiSpecial = function() {
	return !this.isSpecial();
};

String.prototype.isTitle = function() {
	return(this.valueOf() === '_title_');
};

String.prototype.isIcon = function() {
	return(this.valueOf() === '_icon_');
};

String.prototype.isNeutral = function() {
	return(this.valueOf() === '_neutral_');
};

String.prototype.isExplode = function() {
	return(this.valueOf() === '_explode_');
};

String.prototype.isTerminal = function() {
	return(this.valueOf() === '_block_');
};

String.prototype.isChain = function() {
	return(this.valueOf() === '_chain_');
};

String.prototype.isChinfo = function() {
	return(this.valueOf() === '_chinfo_');
};

String.prototype.tiposSort = function() {
	switch (this.valueOf()) {
	case '_sort_':
		return 1;
	case '_tros_':
		return 2;
	default:
		return 0;
	}
};

String.prototype.isSort = function() {
	return this.tiposSort();
};

String.prototype.oxiSort = function() {
	return !this.isSort();
};

String.prototype.isSortKrifo = function() {
	return(this.tiposSort() === 2);
};
