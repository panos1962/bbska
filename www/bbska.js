Bbska = {
	// property: attrImageAreaMax
	//
	// Είναι το μέγιστο εμβαδόν εικόνας στη σελίδα. Όπου τα
	// δεδομένα φαίνονται να είναι URL εικόνας, τότε αυτά
	// εμφανίζονται ως εικόνες.

	attrImageAreaMax: 6000,

	// property: icon
	//
	// Το favicon της σελίδας. Μπορεί να καθοριστεί με το attribute
	// "_icon_" της ριζικής μονάδας.

	icon: Selida.icon ? Selida.icon : 'ikona/misc/bbska.png',

	// property: imageWait
	//
	// Flag που τίθεται αρχικά αληθής και διατηρείται για όσο διάστημα
	// διαρκεί η αρχική μεταφορά του database image από τον server στον
	// client.

	imageWait: true,

	// property: docRef
	//
	// Είναι το URL σελίδας που περιέχει το το documentation του
	// προγράμματος εν είδει μπάμπουσκας.
	// ΠΡΟΣΟΧΗ: το URL αναφέρεται στην official σελίδα της μπάμπουσκας
	// και όχι σε τυχόν αντίγραφο.

	docRef: 'http://bbska.info?root=4834&explode&chain=',

	// property: info
	//
	// Δείχνει αν θα εμφανίζονται επικεφαλίδες στις πληροφοριακές μονάδες.
	// Η επικεφαλίδα μιας πληροφοριακής μονάδας περιέχει τον κωδικό (id)
	// της μονάδας και μια ένδειξη ιδιωτικότητας εν είδει κλειδαριάς.
	// Στο control panel παρέχεται πλήκτρο αλλαγής της συγκεκριμένης
	// ιδιότητας. By default δεν εμφανίζονται επικεφαλίδες, αλλά αυτό
	// μπορεί να αλλάξει με χρήση της URL παραμέτρου "info".

	info: Selida.urlParam.hasOwnProperty('info'),

	// property: eco
	//
	// Δείχνει αν τα αποτελέσματα της αναζήτησης θα εμφανίζονται πλήρως
	// αναπτυγμένα. Όταν κάνουμε αναζητήσεις, το πρόγραμμα αναπτύσσει
	// όλους τους κόμβους που βρίσκονται πάνω από τους επιλεγμένους.
	// Αυτό μπορεί να αλλάξει και να έχουμε μερική ανάπτυξη.

	eco: Selida.urlParam.hasOwnProperty('eco'),

	// property: zoomWindow
	//
	// Αρχικά κενή λίστα που δεικτοδοτείται με κάθε zoom window που
	// εκκινεί ο χρήστης.

	zoomWindow: {},

	// property: crude
	//
	// Αν είναι true τότε οι κόμβοι ανοίγουν απότομα, χωρίς animation.

	crude: false,
};

$(document).

// Ακολουθούν διαδικασίες που θα ενεργοποιηθούν κατά το φόρτωμα της σελίδας
// και μάλιστα όταν η σελίδα τεθεί σε επιχειρησιακή ετοιμότητα.

ready(function() {
	// Ονοματίζουμε τη βασική σελίδα της εφαρμογής. Αυτό θα χρειαστεί
	// για να επαναφέρουμε το focus στη βασική σελίδα από υποσελίδες.

	if (Bbska.oxiZoom() && Bbska.oxiChain())
	self.name = 'bbska';

	// Δημιουργούμε τις βασικές ενότητες της σελίδας.

	Selida.ofelimoDOM.

	// Στην αριστερή πλευρά της σελίδας υπάχει ως fixed position element
	// το control panel, τουτέστιν μια στήλη με εικονίδια-εργαλεία με τα
	// οποία ο χρήστης επιτελεί βασικές λειτουργίες όπως: ανάπτυγμα όλων
	// των κόμβων, επαναφορά στην κορυφή της σελίδας κλπ.

	append(Bbska.cpanelDOM = $('<div>').addClass('sidePanel imageWait').attr('id', 'cpanel')).

	// Στην ίδια στήλη και κάτω από το control panel υπάρχει το search panel
	// το οποίο ενεργοποιείται μετά από αναζητήσεις και δίνει τη δυνατότητα
	// στον χρήστη να μεταβαίνει από τον έναν κόμβο στον άλλο, εφόσον υπάρχουν
	// κόμβοι που πληρούν τα κριτήρια αναζήτησης.

	append(Bbska.spanelDOM = $('<div>').addClass('sidePanel imageWait').attr('id', 'spanel')).

	// Στο επάνω μέρος της σελίδας υπάρχει οριζόντια ενότητα με πεδίο αναζήτησης
	// και πλήκτρο εκκίνησης αναζήτησης. Οι αναζητήσεις είναι εξαντλητικές και
	// επιτελούνται τοπικά στo μοντέλο των δεδομένων που διατηρεί ο browser.

	append(Bbska.queryDOM = $('<div>').attr('id', 'query')).

	// Κάτω από την ενότητα αναζήτησης, όλος ο υπόλοιπος διαθέσιμος χώρος διατίθεται
	// για την εμφάνιση των κόμβων και είναι ουσιαστικά ο ωφέλιμος χώρος στον οποίο
	// προβάλλεται, εισάγεται ή ενημερώνεται η πληροφορία.

	append(Bbska.resultDOM = $('<div>').attr('id', 'result'));

	// Ορισμένες φορές είναι χρήσιμο να βλέπουμε την πλήρη διαδρομή κάποιου κόμβου.
	// Για το σκοπό αυτό διατίθεται χώρος στο επάνω μέρος της σελίδας, όπου εμφανίζεται
	// η διαδρομή οποιουδήπουε κόμβου με κλικ στην επικεφαλίδα του κόμβου. Τα στοιχεία
	// της διαδρομής μπορούν να χρησιμοποιηθούν και ως σημεία ταχείας μετάβασης στους
	// αντίστοιχους κόμβους (σελιδοδείκτες).

	Selida.bodyDOM.
	append(Bbska.trenoDOM = $('<div>').attr('id', 'treno'));

	// Έχουν δημιουργηθεί οι βασικές ενότητες της σελίδας και προχωρούμε σε εργασίες
	// αρχικοποίησης των ενοτήτων αυτών, καθώς επίσης και σε άλλες εργασίες αρχικοποίησης.

	Bbska.
	toolbarLeftSetup().
	toolbarRightSetup().
	querySetup().
	searchInit().
	resultSetup().
	cpanelSetup().
	spanelSetup().
	editSetup().
	iconSetup().
	modeSetInquire().
	trenoSetup();
});

// Ακολουθούν διαδικασίες που θα ενεργοποιηθούν κατά το κλείσιμο της σελίδας.
// Οι ίδιες διαδικασίες θα ενεργοποιηθούν και πριν από κάθε ανανέωση, εφόσον
// πριν την ανανέωση της σελίδας προηγείται κλείσιμο της -όποιας- τρέχουσας
// σελίδας.

$(window).
on('unload', function() {
	// Αν έχουμε ανοίξει σελίδα μεταφόρτωσης φωτογραφιών μέσω του προγράμματος,
	// τότε φροντίζουμε για το κλείσιμο αυτής της σελίδας.

	if (Bbska.wimgdepo)
	Bbska.wimgdepo.close();

	// Ομοίως για το dump.

	if (Bbska.dumpWindow)
	Bbska.dumpWindow.close();
});

// Με την function "toolbarLeftSetup" φροντίζουμε να εμφανίσουμε τα προσήκοντα
// tabs στο αριστερό μέρος του toolbar, δηλαδή της γραμμής εργαλείων που υπάρχει
// στο επάνω μέρος της σελίδας.

Bbska.toolbarLeftSetup = function() {
	// Αν δεν πρόκειται για τη σελίδα του documentation, τότε παρέχουμε
	// tabs πρόσβασης στις σελίδες τεκμηρίωσης.

	if (window.name !== 'doc')
	Selida.toolbarLeftDOM.
	append(Selida.helpTab()).
	append(Selida.faqTab()).
	append(Bbska.docTab()).
	append(Bbska.dumpTab()).
	append(Bbska.crudeTab());

	// Στις zoom σελίδες παρέχονται στο αριστερό toolbar: tab επιστροφής
	// στη βασική σελίδα και tab κλεισίματος σελίδας.

	if (Bbska.isZoom() || Bbska.isChain())
	Selida.toolbarLeftDOM.
	append(Selida.baseTab()).
	append(Selida.closeTab());

	return Bbska;
};

Bbska.docTab = function() {
	return Selida.ltab($('<a target="doc" href="' + Bbska.docRef + Bbska.root + '">Doc</a>'));
};

Bbska.dumpTab = function() {
	return Selida.ltab($('<a>').attr({
		target: 'dump',
		href: Selida.server + 'dump',
	}).text('Dump').
	on('click', function(e) {
		e.stopPropagation();

		if (!self.dumpWindow)
		Bbska.dumpWindow = window.open(Selida.server + 'dump', 'dump');

		Bbska.dumpWindow.focus();
		return false;
	}));
};

Bbska.crudeTab = function() {
	return Selida.ltab($('<a>').attr({
		target: '_self',
		href: '#',
	}).text(Bbska.crude ? 'Sweet' : 'Crude').
	on('click', function(e) {
		e.stopPropagation();

		if (Bbska.crude) {
			Bbska.crude = false;
			$(this).text('Crude');
		}
		else {
			Bbska.crude = true;
			$(this).text('Sweet');
		}

		return false;
	}));
};

// Αν υπάρχει παράμετρος "zoom" στο URL, τότε σημαίνει ότι το URL έχει προκύψει
// ως zoom από άλλο instance της σελίδας, οπότε δίνουμε τη δυνατότητα κλεισίματος
// μέσω σχετικού tab. Ωστόσο, μπορεί το URL να δόθηκε ως σύνδεσμος μέσω email κλπ,
// οπότε σ' αυτήν την περίπτωση θα πρέπει να αγνοήσουμε το zoom και να μην δώσουμε
// δυνατότητα κλεισίματος στο toolbar κλπ.
//
// Η function "isZoom" κάνει όλους αυτούς τους ελέγχους και επιστρέφει true μόνον
// εφόσον συντρέχουν όλοι οι παράγοντες που δείχνουν ότι πρόκειται πράγματι για
// zoom σελίδα.

Bbska.isZoom = function() {
	var goniki, root;

	// Ελέγχουμε πρώτα το τυπικό μέρος, αν δηλαδή στο URL υπάρχει παράμετρος
	// "zoom".

	if (!Bbska.hasOwnProperty('zoom'))
	return false;

	// Προχωρούμε σε πιο ουσιαστικό έλεγχο αλλά παραμένουμε σε χαμηλό επίπεδο,
	// ελέγχοντας αν υπάρχει σελίδα αφετηρίας από την οποία εκκίνησε η τρέχουσα
	// σελίδα.

	if (!self.opener)
	return false;

	goniki = self.opener;

	// Στο σημείο αυτό έχουμε διασφαλίσει ότι τυπικά πρόκειται για zoom σελίδα
	// και προχωρούμε σε έλεγχο στοιχείων της σελίδας αφετηρίας. Πρώτα ελέγχουμε
	// αν η σελίδα αφετηρίας είναι σελίδα μπάμπουσκας.

	if (!goniki.hasOwnProperty('Bbska'))
	return false;

	// Διασφαλίσαμε ότι η σελίδα αφετηρίας είναι σελίδα μπάμπουσκας, ωστόσο
	// κάνουμε επιπλέον ελέγχους που αφορούν στο περιεχόμενο της σελίδας.
	// Ελέγχουμε αν υπάρχει ριζικός κόμβος στη σελίδα αφετηρίας…

	if (!goniki.Bbska.hasOwnProperty('root'))
	return false;

	// …και αν αυτός ο κόμβος έχει attribute κωδικού μονάδας.

	if (!goniki.Bbska.root.hasOwnProperty('kodikos'))
	return false;

	// Ελέγχουμε αν ο ριζικός κόμβος της σελίδας αφετηρίας είναι όντως
	// αυτός που έχει καθοριστεί με την παράμετρο "zoom".

	if (goniki.Bbska.root.kodikos !== Bbska.zoom)
	return false;

	// Αποσπούμε τον κωδικό ριζικής μονάδας της παρούσης σελίδας.

	root = Bbska.rootKodikosGet();

	// …και ελέγχουμε αν υπάρχει σχετική εγγραφή στο μητρώο υποσελίδων της
	// σελίδας αφετηρίας. Αν δεν υπάρχει σχετική εγγραφή, τη δημιουργούμε
	// τώρα.

	if (!goniki.Bbska.zoomWindow.hasOwnProperty(root))
	goniki.Bbska.zoomWindow[root] = {};

	// Ελέγχουμε την κατάσταση της παρούσης σελίδας στο μητρώο υποσελίδων
	// της σελίδας αφετηρίας. Αν φαίνεται ότι έχει επιχειρηθεί τροποποίηση
	// της παρούσης από κάποια υποσελίδα, τότε κόβουμε τον ομφάλιο λώρο τού
	// zoom που συνδέει την παρούσα με τη σελίδα αφετηρίας.

	if (goniki.Bbska.zoomWindow[root].piragmeno)
	return false;

	// Προσπαθήσαμε να ελέγξουμε, κατά το δυνατόν, τις εξαρτήσεις της παρούσης
	// σελίδας από τη σελίδα αφετηρίας, όπως επίσης και το αν υπήρξαν αποχρώσες
	// ενδείξεις απόπειρας ενημέρωσης της παρούσης. Μέχρι στιγμής δεν είχαμε
	// σημαντικούς λόγους αποκοπής της παρούσης σελίδας από τη γονική σελίδα.

	return true;
};

// Η function "rootKodikosGet" επιστρέφει τον κωδικό της ριζικής μονάδας
// της σελίδας. Αυτό ακούγεται εύκολο, αλλά δεν είναι, καθώς το property
// "root" εκκινεί μεν ως κωδικός της ριζικής μονάδας (αριθμός), αλλά στην
// πορεία μεταλλάσσεται στην ίδια τη ριζική μονάδα (αντικείμενο).

Bbska.rootKodikosGet = function() {
	if (Bbska.root.hasOwnProperty('kodikos'))
	return Bbska.root.kodikos;

	return Bbska.root;
};

Bbska.oxiZoom = function() {
	return !Bbska.isZoom();
};

Bbska.isChain = function() {
	if (!Bbska.hasOwnProperty('chain'))
	return false;

	// Εδώ δεν πρέπει να διενεργήσουμε ελέγχους σχετικούς με την
	// πατρική σελίδα βάσει του opener, όπως κάνουμε με το zoom,
	// γιατί θα μας «κόψει» η πολιτική ασφαλείας.

	return true;
};

Bbska.oxiChain = function() {
	return !Bbska.isChain();
};

// Ακολουθεί το setup της δεξιάς πλευράς του toolbar στο επάνω μέρος της σελίδας.
// Εκεί υπάρχουν tabs που αφορούν την εγγραφή, την είσοδο, την έξοδο, τα στοιχεία
// λογαριασμού και το recache.

Bbska.toolbarRightSetup = function() {
	if (Selida.oxiLogin()) {
		Selida.toolbarRightDOM.
		append(Selida.signupTab()).
		append(Selida.loginTab());

		return Bbska;
	}

	Selida.toolbarRightDOM.
	append(Selida.accountTab()).
	append(Bbska.recacheTab()).
	append(Selida.loginTab('reLogin')).
	append(Selida.exitTab());

	return Bbska;
};

Bbska.recacheTab = function() {
	return Selida.rtab($('<a href="recache">reCache</a>').
		on('click', function(e) {
			e.stopPropagation();
			$.post('bbska.php', {
				action: 'imageclear',
			});
			return false;
		}));
};

// Ακολουθεί το setup της περιοχής αναζήτησης. Στην περιοχή αυτή υπάρχει πεδίο
// αναζήτησης και πλήκτρο εκκίνησης αναζήτησης. Η περιοχή αναζήτησης στήνεται
// ως φόρμα ώστε να μπορούν να λειτουργήσουν οι λειτουργίες φόρμας (submit κλπ).

Bbska.querySetup = function() {
	Bbska.queryDOM.
	append($('<form>').
	on('submit', function() {
		Bbska.searchSubmit();
		return false;
	}).

	append($('<table>').
	append($('<tr>').
	append($('<td>').css('position', 'relative').
	append(Bbska.searchDOM = $('<input>').
	prop('disabled', true).
	attr('name', 'srchpat').
	attr('placeholder', 'Loading…').
	addClass('inputRight').
	data('escape', function() {
		Bbska.onlineMatch();
	}).
	on('keyup', function(e) {
		switch (e.which) {
		case 13:	// Enter key
		case 16:	// Shift key
		case 17:	// Control key
		case 18:	// Alt key
		case 38:	// Up arrow key
		case 40:	// Down arrow key
			e.stopPropagation();
			return;
		}

		if (e.ctrlKey)
		return;

		Bbska.onlineMatch();
	}).
	on('keydown', function(e) {
		switch (e.which) {
		case 38:	// Up arrow
			if (Bbska.onlineMatchExists()) {
				e.stopPropagation();
				e.preventDefault();
				Bbska.onlineMatchNavigate(e, -1);
			}

			break;
		case 40:	// Down arrow
			if (Bbska.onlineMatchExists()) {
				e.stopPropagation();
				e.preventDefault();
				Bbska.onlineMatchNavigate(e, 1);
			}

			break;
		case 9:		// Tab key
			e.stopPropagation();
			e.preventDefault();

			if (e.shiftKey)
			Bbska.searchButtonDOM.focus();

			else
			Bbska.searchButtonDOM.focus();

			break;
		case 16:	// Shift key
			e.stopPropagation();
			e.preventDefault();
			break;
		}
	})).
	append(Bbska.onlineMatchContainerDOM = $('<div>').
	attr('id', 'onlineMatchContainer'))).

	append($('<td>').append(Bbska.searchButtonDOM = $('<input>').
	addClass('formaButton imageWait').
	attr({
		title: 'Exhaustive search',
	}).
	prop({
		type: 'button',
		value: 'Search',
	}).
	on('keydown', function(e) {
		switch (e.which) {
		case 9:
			e.stopPropagation();
			e.preventDefault();

			if (e.shiftKey)
			Bbska.searchDOM.focus();

			else
			Bbska.searchDOM.focus();

			break;
		case 16:
			e.stopPropagation();
			e.preventDefault();
			break;
		}
	}))))));

	Bbska.searchDOM.val(Bbska.search).focus();
	Bbska.onlineMatchSetup();

	return Bbska;
};

Bbska.onlineMatchSetup = function() {
	var top;

	top = Bbska.searchDOM.outerHeight(true);
	Bbska.onlineMatchContainerDOM.
	css('top', '+=' + top + 'px');

	Selida.bodyDOM.
	on('click', '.onlineMatchItem', function(e) {
		e.stopPropagation();
		$('.onlineMatchTrexon').removeClass('onlineMatchTrexon');
		$(this).addClass('onlineMatchTrexon');
		Bbska.searchSubmit();
	});

	return Bbska;
};

Bbska.onlineMatchOff = function() {
	Bbska.onlineMatchContainerDOM.
	css('display', 'none').
	empty();

	Bbska.onlineMatchMark = {};
	Bbska.onlineMatchArray = [];

	return Bbska;
};

Bbska.onlineMatchExists = function() {
	return(Bbska.onlineMatchContainerDOM.css('display') !== 'none');
};

Bbska.onlineMatchNavigate = function(e, step) {
	var lista, i, item;

	lista = Bbska.onlineMatchContainerDOM.children();
	if (!lista.length)
	return Bbska;

	e.stopPropagation();

	for (i = 0; i < lista.length; i++) {
		item = $(lista[i]);

		if (!item.hasClass('onlineMatchTrexon'))
		continue;

		item.removeClass('onlineMatchTrexon');
		break;
	}

	i += step;

	if (i >= lista.length)
	i = 0;

	else if (i < 0)
	i = lista.length - 1;

	$(lista[i]).addClass('onlineMatchTrexon');
	return Bbska;
};

// Η function "onlineMatch" καλείται κατά την πληκτρολόγηση του search pattern
// και προβάλλει τα strings που κάνουν match, σε dropdown div κάτω από το πεδίο
// πληκτρολόγησης του search pattern.

Bbska.onlineMatch = function() {
	Bbska.onlineMatchOff();

	Bbska.searchPattern = Bbska.searchDOM.val().trim();

	if (!Bbska.searchPattern)
	return Bbska;

	Bbska.searchPattern2RE();
	Globals.walk(Bbska.image, function(k, m) {
		Globals.awalk(m.a, function(i, attr) {
			var tok;

			if (attr.k.isSortKrifo())
			return true;

			tok = new Token(attr.k);
			if (tok.isNormal() && tok.text.match(Bbska.searchPatternRE))
			return Bbska.onlineMatchAdd(tok.text);

			tok = new Token(attr.v);
			if (tok.isNormal() && tok.text.match(Bbska.searchPatternRE))
			return Bbska.onlineMatchAdd(tok.text);
		});
	});

	if (!Bbska.onlineMatchArray.length)
	return Bbska.onlineMatchOff();

	Globals.awalk(Bbska.onlineMatchArray.sort(function(p1, p2) {
		return p1.s.localeCompare(p2.s);
	}), function(i, s) {
		Bbska.onlineMatchContainerDOM.
		append($('<div>').addClass('onlineMatchItem').
		data('pat', s.p).text(s.s));
	});

	Bbska.onlineMatchContainerDOM.
	anadisi().
	css({
		display: 'block',
		maxWidth: (Selida.bodyDOM.width() * 0.9) + 'px',
		maxHeight: (Selida.windowDOM.height() * 0.7) + 'px',
	});

	return Bbska;
};

Bbska.onlineMatchAdd = function(s) {
	var olm = {};

	olm.s = s.decorStrip();

	if (Bbska.onlineMatchMark.hasOwnProperty(olm.s))
	return Bbska;

	olm.p = s.replace(/\[\[./g, '.*').replace(/\]\]/g, '.*');

	Bbska.onlineMatchMark[olm.s] = true;
	Bbska.onlineMatchArray.push(olm);

	return Bbska;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////@

Bbska.resultSetup = function() {
	Bbska.resultDOM.

	on('mouseenter', '.monada', function(e) {
		e.stopPropagation();
		Bbska.monadaMouseenter($(this));
	}).

	on('mouseleave', '.monada', function(e) {
		e.stopPropagation();
		Bbska.monadaMouseleave($(this));
		$(this).parent().closest('.monada').trigger('mouseenter');
	}).

	// Με κλικ πάνω σε matching element της σελίδας, θέτουμε το
	// στοιχείο ως navigation pivot elemnt. Με άλλα λόγια, αν έχουμε
	// π.χ. 100 matching elements και το τρέχον (pivot) είναι το 23,
	// μπορούμε να κάνουμε κλικ στο 35 και να "πηδήξουμε" τα ενδιάμεσα
	// στοιχεία, συνεζχίζοντας το navigation από το 35.

	on('click', '.attrTarget', function(e) {
		var navidx;

		e.stopPropagation();

		if (!Bbska.searchNavigationArray.length)
		return;

		navidx = parseInt($(this).data('navidx'));

		if (isNaN(navidx))
		return;

		Bbska.searchNavigationIndex = navidx;

		// Θέτουμε νέο pivot element, χωρίς όμως να κάνουμε
		// scroll, καθώς το νέο pivot βρίσκεται στο ορατό
		// τμήμα της σελίδας εφόσον κάναμε κλικ.

		Bbska.searchNavigate(false);
	}).

	on('click', '.goPanel', function(e) {
		e.stopPropagation();
	}).

	on('selectstart', 'input,textarea', function(e) {
		e.stopPropagation();
		return true;
	}).

	on('selectstart', '.monadaData', function(e) {
		e.stopPropagation();
		Bbska.selectstart = true;
		return true;
	}).

	on('selectstart', '.monada,.bbska', function(e) {
		e.stopPropagation();
		return false;
	}).

	on('mousedown', '.editForma', function(e) {
		$(this).closest('.monada').anadisi();
	}).

	on('click', '.monadaData a', function(e) {
		e.stopPropagation();
	}).

	on('click', '.attrPhoto', function(e) {
		var imgDOM, link;

		e.stopPropagation();

		link = $(this).data('link');

		if (link)
		return window.open(link, '_blank');

		imgDOM = $(this);
	}).

	on('click', '.monada', function(e) {
		var monada, t1, t2;

		e.stopPropagation();

		if (Bbska.selectstart) {
			delete Bbska.selectstart;
			return;
		}

		if (Bbska.modeIsInquire())
		return Bbska.trenoRefreshInquire($(this));

		monada = $(this).data('monada');

		if (Selida.oxiLogin(monada.xristis))
		return Bbska.trenoRefreshInquire($(this));

		t1 = $(this).data('clickTS');
		t2 = Globals.torams();
		$(this).data('clickTS', t2);

		monada.panel();

		if (!t1)
		return;

		if (t2 - t1 < 300)
		monada.edit();
	}).

	on('click', '.editDelete', function(e) {
		var dom;

		e.stopPropagation();

		dom = $(this).closest('.editTable');
		$(this).closest('tr').remove();
		dom.find('.editKey').last().focus();
	}).

	on('click', '.panel,.editForma', function(e) {
		e.stopPropagation();
	}).

	on('click', '.bbska,.bbskaBlockIcon', function(e) {
		var monada;

		e.stopPropagation();

		// Οι μπάμπουσκες είναι κρυμμένες κατά τη διάρκεια της παραλαβής
		// ή μη παραλαβής του database image από τον server. Ωστόσο, ειδικά
		// για τη ριζική μονάδα η μπάμπουσκα είναι εμφανής. Για το λόγο αυτό
		// ελέγχουμε αν έχει τελειώσει η διαδικασία παραλαβής ή μη παραλαβής
		// του database image, πριν προχωρήσουμε σε περαιτέρω ενέργειες.

		if (Bbska.imageWait)
		return;

		monada = $(this).parent().data('monada');
		if (!monada)
		return;

		if (monada.aplomeni)
		return monada.mazemaAnimated();

		if (monada.oxiRoot() && monada.isTerminal())
		return monada.bbskaBounce();

		monada.aplomaAnimated();
	});

	if (Bbska.oxiRoot() && Selida.oxiLogin())
	Bbska.root = 2;

	$.post('bbska.php', {
		action: 'setup',
		root: Bbska.root,
	}, function(data) {
		if (!data)
		return Bbska.searchDOM.attr('placeholder', 'Ooops!');

		try {
			data.evalAsfales();
		} catch (e) {
			return console.error('bbska.php::setup: ' + data);
		}

		Bbska.resultDOM.append(Bbska.root.fix().getDOM());
		Bbska.root.dataDOM.addClass('monadaDataRoot');
		Bbska.trenoAdanom = Bbska.root;
		Bbska.root.aploma(function() {
			if (Bbska.explosive)
			Bbska.explodeDOM.trigger('click');
		});

		Bbska.root.bbskaWorking();
		setTimeout(function() {
			Bbska.imageGet();
		}, 100);
	});

	return Bbska;
};

Bbska.imageGet = function() {
	if (Bbska.oxiZoom())
	return Bbska.imageFromServer();

	if (self.opener.Bbska.databaseMode())
	return Bbska.imageFromServer();

	if (Bbska.root.isTerminal())
	return Bbska.imageFromServer();

	// Οι συνθήκες είναι τέτοιες που ευνοούν την αντιγραφή του image
	// από τη γονική σελίδα.

	Bbska.image = {};
	Bbska.
	imageCopy(Bbska.root.kodikos).
	imageGetPost();

	return Bbska;
};

Bbska.imageFromServer = function() {
	$.post('bbska.php', {
		action: 'imageget',
		root: Bbska.root.kodikos,
	}, function(data) {
		try {
			Bbska.image = ('{' + data + '}').evalAsfales();

			if (!Bbska.image.hasOwnProperty('id'))
			throw 'Missing id!';

			if (!Bbska.image.hasOwnProperty('di'))
			throw 'Missing di!';

			if (Bbska.image.di !== Bbska.image.id)
			throw 'Broken image!';

			delete Bbska.image.id;
			delete Bbska.image.di;
		} catch (e) {
			Bbska.image = {};
			delete Bbska.imageWait;
			Bbska.root.bbskaRelax();

			Bbska.resultDOM.text('Error!');
			Bbska.searchDOM.
			attr('placeholder', 'Ooops!').
			prop('disabled', true);
			throw 'bbska.php::imageget: ' + data;
		}

		Bbska.imageGetPost();
	});

	return Bbska;
};

// Η function "imageCopy" αντιγράφει μέρος του image από την γονική σελίδα
// στην τρέχουσα, προκειμένου να αποφύγουμε αχρείαστα database queries.

Bbska.imageCopy = function(root) {
	var source, target;

	// Αν στο παρόν image υπάρχει ήδη η ζητούμενη πληροφοριακή μονάδα,
	// τότε δεν προβαίνουμε σε καμία επιπλέον ενέργεια.

	if (Bbska.image.hasOwnProperty(root))
	return Bbska;

	// Ονοματίζουμε ευκολότερα την γονική και την παρούσα πληροφοριακή
	// μονάδα η οποία θα αποτελέσει αντίγραφο της γονικής.

	source = self.opener.Bbska.image[root];

	// Αν έχουμε μπλοκαρισμένες μονάδες, υπάρχει περίπτωση το source
	// να είναι undefined.

	if (!source)
	return Bbska;

	target = {};

	// Πριν ακόμη αντιγράψουμε την πληροφοριακή μονάδα, τοποθετούμε την
	// παρούσα μονάδα στο παρόν image.

	Bbska.image[root] = target;

	if (source.hasOwnProperty('i'))
	target.i = source.i;

	if (source.hasOwnProperty('a')) {
		target.a = [];
		Globals.awalk(source.a, function(i, a) {
			target.a[i] = a;
		});
	}

	if (!source.hasOwnProperty('t'))
	return Bbska;

	target.t = [];
	Globals.awalk(source.t, function(i, t) {
		target.t[i] = t;
		Bbska.imageCopy(t);
	});

	return Bbska;
};

Bbska.imageGetPost = function() {
	Bbska.searchDOM.
	attr('placeholder', '').
	prop('disabled', false).
	focus();

	// Έχουμε τελειώσει με την παραλαβή ή μη παραλαβή του database image
	// από τον server, επομένως είναι η κατάλληλη στιγμή να εμφανίσουμε
	// τα controls (buttons, panels, εικονίδια κλπ).

	$('.imageWait').removeClass('imageWait');

	// Τέλος, διαγράφουμε το flag "imageWait" που ήταν ενεργό για όσο
	// διάστημα διήρκεσε η διαδικασία παραλαβής ή μή παραλαβής του
	// database image.

	delete Bbska.imageWait;
	Bbska.root.bbskaRelax();

	Bbska.
	imageFix().
	searchButtonDOM.prop('type', 'submit');

	if (Bbska.search && Bbska.oxiZoom())
	Bbska.searchButtonDOM.trigger('click');

	return Bbska;
};

// Κατά την αποστολή φροντίζουμε στα ονόματα του χρήστη να μην επαναλαμβάνουμε
// ονόματα που έχουν εμφανιστεί ήδη σε άλλη μονάδα. Σ' αυτές τις περιπτώσεις αντί
// του ονόματος χρήστη (string) αποστέλλουμε τον κωδικό της μονάδας (νούμερο) στην
// οποία έχει ήδη εμφανιστεί ο χρήστης.
//
// Η function "imageFix" σκοπό έχει την επαναφορά του ονόματος χρήστη σε όσες μονάδες
// έχει γίνει εξοικονόμηση.

Bbska.imageFix = function() {
	Globals.walk(Bbska.image, function(kodikos, monada) {
		var kodikos1, monada1;

		if (!monada.hasOwnProperty('x'))
		return;

		if (typeof monada.x !== 'number')
		return;

		kodikos1 = monada.x
		delete monada.x;

		if (Bbska.oxiImage(kodikos1))
		return;

		monada1 = Bbska.image[kodikos1];

		if (!monada1.hasOwnProperty('x'))
		return;

		monada.x = monada1.x;
	});

	return Bbska;
};

Bbska.imageMode = function() {
	return Bbska.hasOwnProperty('image');
}

Bbska.databaseMode = function() {
	return !Bbska.imageMode();
}

Bbska.isImage = function(kodikos) {
	return Bbska.image.hasOwnProperty(kodikos);
}

Bbska.oxiImage = function(kodikos) {
	return !Bbska.isImage(kodikos);
}

Bbska.monadaMouseenter = function(monadaDOM) {
	var monada, chain, zoom, pattern, goPanelDOM, chinfo;

	$('.goPanel').remove();
	monadaDOM.addClass('monadaEpilogi');

	if (!(monada = monadaDOM.data('monada')))
	return;

	// Σε κάθε πληροφοριακή μονάδα μπορούμε να έχουμε "_chain_" attribute
	// με το οποίο καθορίζουμε εξωτερική σελίδα στην οποία μπορεί να μεταβεί
	// ο χρήστης με κλικ στο σχετικό εικονίδιο διαφυγής.

	chain = monada.attrGet('_chain_');

	// Το chain attribute μπορεί να είναι ο κωδικός ενός μη συγγενούς κόμβου,
	// π.χ. 2956, ο οποίος μάλιστα μπορεί να συνδεύεται από URL παραμέτους της
	// μπάμπουσκας, π.χ. 2596&info&eco. Σ' αυτές τις περιπτώσεις μεταβαίνουμε
	// σε σελίδα της μπάμπουσκας με τον συγκεκριμένο ριζικό κόμβο.

	if (chain) {
		if (!chain.validLink()) {
			chain = Selida.server + '?root=' + monada.attrGet('_chain_');
			chain += '&chain=' + monada.kodikos;

			if (Bbska.isInfo())
			chain += '&info';

			if (Bbska.isEco())
			chain += '&eco';
		}
	}

	// Με το zoom εννοούμε το άνοιγμα νέας σελίδας με ριζική μονάδα την ανά
	// χείρας μονάδα.

	zoom = undefined;

	// Το zoom έχει νόημα όταν η ανά χείρας μονάδα δεν είναι η ριζική μονάδα
	// της τρέχουσας σελίδας.

	if (monada.oxiRoot()) {
		zoom = Selida.server + '?root=' + monada.kodikos;
		zoom += '&zoom=' + Bbska.root.kodikos;

		if (Bbska.searchDOM && (pattern = Bbska.searchDOM.val().trim()))
		zoom += '&search=' + pattern.uri();

		if (Bbska.isInfo())
		zoom += '&info';

		if (Bbska.isEco())
		zoom += '&eco';
	}

	// Αν δεν έχει προκύψει chain page ή zoom page, τότε δεν έχει νόημα
	// ούτε το go parent, καθώς πρόκειται για τη ριζική μονάδα.

	if (!(chain || zoom))
	return;

	// Δημιουργούμε το micro panel διαφυγής στη δεξιά πλευρά της περιοχής
	// δεδομένων της μονάδας.

	monada.DOM.
	append(goPanelDOM = $('<div>').addClass('goPanel').
	css('left', (monada.dataDOM.width() + 20) + 'px'));

	if (zoom) {
		goPanelDOM.

		append($('<img>').
		addClass('goIcon').
		attr({
			title: 'Parent node',
			src: 'ikona/misc/goParent.png',
		}).
		on('click', function(e) {
			e.stopPropagation();
			try {
				var scroll;

				scroll = monada.DOM.parent().closest('.monada').offset().top - 40;

				// Εν έχουμε φτάσει πολύ ψηλά, γυρνάμε στην κορυφή της σελίδας.

				if (scroll < 40)
				scroll = 0;

				$(window).scrollTop(scroll);
			} catch (e) {}
		})).

		append($('<a>').
		prop({
			title: 'Zoom page',
			href: zoom,
			target: 'z' + monada.kodikos,
		}).
		on('click', function(e) {
			var href;

			e.stopPropagation();

			// Η διεύθυνση της zoom σελίδας υπάρχει ήδη καταχωρημένη
			// στο href της αναχείρας μονάδας, ωστόσο λείπει κάποια
			// αναφορά σε τυχόν ιδιαίτερο εικονίδιο που χρησιμοποιεί
			// η παρούσα μονάδα. Για να έχουμε το σωστό εικονίδιο στη
			// zoom σελίδα, θα ακολουθήσουμε μια σχετικά περίπλοκη
			// διαδικασία μέσω της οποίας θα αλλοιώσουμε το URL τής
			// zoom σελίδας. Εξ αυτούη του λόγου προκύπτει η ανάγκη
			// αποθήκευσης της αρχικής διεύθυνσης, ενέργεια στην
			// οποία προβαίνουμε ευθύς αμέσως.

			// Θα ελέγξουμε αρχικά αν έχει ήδη αποθηκευτεί η αρχική
			// διεύθυνση της zoom σελίδας.

			href = $(this).data('href');

			// Αν δεν ήδη έχει αποθηκευτεί η διεύθυνση της zoom σελίδας
			// από προηγούμενο zoom, την αποθηκεύουμε τώρα ώστε να
			// υπάρχει διαθέσιμη σε επόμενη κλήση.

			if (!href) {
				href = $(this).prop('href');
				$(this).data('href', href);
			}

			// Ελέγχουμε αν υπάρχει λόγος να καθορίσουμε εικονίδιο
			// για τη zoom σελίδα.

			if (monada.hasOwnProperty('DOM') && monada.DOM.data('iconSrc'))
			$(this).prop('href', href + '&icon=' + monada.DOM.data('iconSrc').uri());

			else if (Selida.favicon && monada.oxiIcon())
			$(this).prop('href', href + '&icon=' + Selida.favicon.uri());

			if (Bbska.crude)
			$(this).prop('href', href + '&crude');

			// Διαγράφουμε τυχόν υπάρχουσα εγγραφή στο μητρώο
			// ανοικτών zoom σελίδων.

			delete Bbska.zoomWindow[monada.kodikos];

			return true;
		}).
		append($('<img>').
		addClass('goIcon').
		attr('src', 'ikona/misc/setRoot.png')));
	}

	chinfo = monada.attrGet('_chinfo_');
	if (!chinfo)
	chinfo = 'Chain page';

	if (chain) {
		goPanelDOM.
		append($('<a>').
		prop({
			title: chinfo,
			href: chain,
			target: 'c' + monada.kodikos,
		}).
		append($('<img>').
		addClass('goIcon').
		attr('src', 'ikona/misc/chain.png')));
	}
};

Bbska.monadaMouseleave = function(monadaDOM) {
	$('.goPanel').remove();
	monadaDOM.removeClass('monadaEpilogi');
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////@

Bbska.trenoSetup = function() {
	Selida.bodyDOM.
	on('click', '.trenoButton', function(e) {
		var monada;

		e.stopPropagation();

		monada = $(this).data('monada');

		if (!monada)
		return;

		$('.trenoMonada').removeClass('trenoMonada');
		monada.DOM.children('.monadaData').addClass('trenoMonada');
		$(window).scrollTop(monada.DOM.offset().top - 100);

		Bbska.resultDOM.find('.monadaEpilogi').removeClass('monadaEpilogi');
		Bbska.monadaMouseenter(monada.DOM);
	});

	return Bbska;
};

Bbska.trenoRefreshInquire = function(monadaDOM) {
	var monada, treno;

	monada = monadaDOM.data('monada');

	if (Bbska.trenoMonada === monada)
	return Bbska.trenoClear();

	Bbska.trenoDOM.empty();
	Bbska.trenoMonada = monada;
	delete Bbska.trenoAdanom;

	Bbska.trenoDOM.css('display', 'inline-block').anadisi();
	Bbska.trenoButtonDOM.attr('src', 'ikona/cpanel/onert.png');

	treno = [ monadaDOM ];
	monadaDOM.parents('.monada').each(function() {
		treno.push($(this));
	});

	// Σε περίπτωση που γίνει διαγραφή ή μετακίνηση κόμβου που
	// συμμετέχει στο τρένο, είναι πιθανό να έχουμε προβλήματα
	// στην ανακατασκευή. Σ' αυτή την περίπτωση καθαρίζουμε το
	// τρένο.

	try {
		while (monadaDOM = treno.pop()) {
			monadaDOM.data('monada').trenoAppend();
		}

		Bbska.trenoDOM.append($('<img>').attr({
			id: 'trenoTreno',
			src: 'ikona/cpanel/treno.png',
			title: 'Train hide (Control-B)',
		}).on('click', function(e) {
			e.stopPropagation();
			Bbska.trenoButtonDOM.trigger('click');
		}));
	} catch (e) {
		Bbska.trenoClear();
	}

	return Bbska;
};

Monada.prototype.trenoAppend = function() {
	var i, attr, key, val;

	if (this === Bbska.root)
	return this.trenoAppendDOM('&bull;');

	for (i = 0; i < this.alist.length; i++) {
		attr = this.alist[i];

		if (attr.key.validYouTube())
		continue;

		if (attr.key.validImage())
		continue;

		if (attr.val.validYouTube())
		continue;

		if (attr.val.validImage())
		continue;

		key = new Token(attr.key);
		val = new Token(attr.val);

		if (attr.key.validLink()) {
			if (val.isText())
			return this.trenoAppendDOM(val.text);
		}

		if (attr.val.validLink()) {
			if (key.isText())
			return this.trenoAppendDOM(key.text);
		}

		if (key.isSpecial()) {
			if (key.oxiTitle())
			continue;

			if (val.oxiText())
			continue;

			return this.trenoAppendDOM(val.text);
		}

		if (key.isText()) {
			if (val.isText())
			return this.trenoAppendDOM(key.text + ': ' + val.text);

			return this.trenoAppendDOM(key.text);
		}

		if (val.isText())
		return this.trenoAppendDOM(val.text);
	}

	this.trenoAppendDOM(this.kodikos + '');
	return this;
};

Monada.prototype.trenoAppendDOM = function(tag) {
	Bbska.trenoDOM.
	append($('<button>').
	addClass('trenoButton').
	data('monada', this).
	html(tag.decorStrip()));

	return this;
};

Bbska.trenoClear = function() {
	Bbska.trenoDOM.empty();
	Bbska.trenoDOM.css('display', 'none');
	$('.trenoMonada').removeClass('trenoMonada');
	Bbska.trenoButtonDOM.attr('src', 'ikona/cpanel/treno.png');

	Bbska.trenoAdanom = Bbska.trenoMonada;
	delete Bbska.trenoMonada;

	return Bbska;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////@

// Προκειμένου να μπορεί ο χρήστης να επιλέξει με εύκολο τρόπο εικονίδιο
// μπάμπουσκας για οποιαδήποτε πληροφοριακή μονάδα, παρέχεται πάνελ επιλογής
// εικονιδίων μέσω πλήκτρου στο πάνελ ενημέρωσης στοιχείων μονάδας. Το πάνελ
// επιλογής εικονιδίου μπάμπουσκας είναι ένα και μοναδικό και προετοιμάζεται
// από την αρχή με σκοπό να είναι διαθέσιμο όποτε ζητηθεί από το χρήστη.

Bbska.iconSetup = function() {
	if (!Bbska.iconDir)
	return Bbska;

	Selida.bodyDOM.
	append(Bbska.iconPanelContainerDOM = $('<div>').
	attr('id', 'iconPanelContainer').
	append(Bbska.iconPanelDOM = $('<div>').
	attr('id', 'iconPanel').draggable({
		cursor: 'move',
		cancel: 'input,.iconPanelIcon',
	}).

	append(Bbska.iconPanelMonadaDOM = $('<div>').
	attr('id', 'iconPanelMonada').
	addClass('monadaKodikos')).

	append(Bbska.iconPanelURLDOM = $('<input>').attr('id', 'iconPanelURL').
	on('change', function(e) {
		Bbska.iconSet($(this).val());
	})).
	append(Selida.klisimo(function() {
		Bbska.iconPanelClose();
	}))));

	Bbska.iconPanelContainerDOM.
	on('click', '.iconPanelIcon', function(e) {
		e.stopPropagation();
		Bbska.iconSet($(this).data('icon'));
	});

	return Bbska;
};

// Η function "iconDownload" θα κληθεί με το πρώτο άνοιγμα του icon panel
// και αμέσως μετά θα διαγραφεί.

Bbska.iconDownload = function() {
	Globals.awalk(Bbska.iconList, function(i, v) {
		Bbska.iconPanelDOM.
		append($('<img>').addClass('iconPanelIcon').
		attr('src', Bbska.iconDir + v).
		data('icon', v.replace(/\.png$/, '')));
	});

	delete Bbska.iconPanelDOM;

	return Bbska;
};

Bbska.iconPanelToggle = function(monada) {
	if (monada === undefined)
	return Bbska.iconPanelClose();

	if (Bbska.iconPanelMonada === monada)
	return Bbska.iconPanelClose();

	Bbska.iconPanelOpen(monada);
	return Bbska;
};

Bbska.iconPanelOpen = function(monada) {
	if (Bbska.hasOwnProperty('iconDownload')) {
		Bbska.iconDownload();
		delete Bbska.iconDownload;
	}

	if (!Bbska.iconPanelMonada)
	Bbska.iconPanelContainerDOM.finish().anadisi().fadeIn(100);

	Bbska.iconPanelMonada = monada;
	Bbska.iconPanelMonadaDOM.text(monada.kodikos);
	Bbska.iconPanelURLDOM.val(Bbska.iconPanelMonada.iconGet()).select();

	return Bbska;
};

Bbska.iconPanelClose = function(opts) {
	if (!Bbska.iconPanelMonada)
	return Bbska;

	if (opts === undefined)
	opts = {};

	if (!opts.hasOwnProperty('duration'))
	opts.duration = 100;

	Bbska.iconPanelContainerDOM.finish().fadeOut(opts.duration);
	delete Bbska.iconPanelMonada;

	return Bbska;
};

Bbska.iconSet = function(icon) {
	var monada, l, row, i, k;

	monada = Bbska.iconPanelMonada;

	if (!monada)
	return Bbska.iconPanelClose();

	if (!monada.hasOwnProperty('editDOM'))
	return Bbska.iconPanelClose();

	l = monada.editDOM.find('tr');

	if (!l.length)
	return Bbska.iconPanelClose();

	row = $('<tr>').
	append($('<td>').append($('<textarea>').addClass('editKey').text('_icon_'))).
	append($('<td>').append($('<div>').addClass('editHandle').html('&#x2725;'))).
	append($('<td>').append($('<textarea>').addClass('editVal').text(icon))).
	append($('<td>').append($('<input>').addClass('editDelete').attr({
		type: 'button',
		value: 'Delete',
	})));

	for (i = 0; i < l.length; i++) {
		k = $(l[i]).find('.editKey');

		if (!k.length)
		continue;

		if (k.val() === '_icon_')
		break;
	}

	if (i === l.length)
	row.insertBefore(l[i - 1]);

	else
	$(l[i]).html(row.html());

	Bbska.iconPanelClose();
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////@

Bbska.cpanelSetup = function() {
	Bbska.cpanelDOM.

	append(Bbska.korifiButtonDOM = $('<img>').
	addClass('sidePanelButton cpanelButton').attr({
		title: 'Top of page',
		src: 'ikona/cpanel/home.png',
	}).
	on('click', function(e) {
		e.stopPropagation();
		$(window).scrollTop(0);
	})).

	append(Bbska.trenoButtonDOM = $('<img>').
	addClass('sidePanelButton cpanelButton').attr({
		title: 'Train toggle (Control-B)',
		src: 'ikona/cpanel/treno.png',
	}).
	on('click', function(e) {
		e.stopPropagation();

		if (Bbska.trenoAdanom)
		Bbska.trenoRefreshInquire(Bbska.trenoAdanom.DOM);

		else if (Bbska.trenoMonada)
		Bbska.trenoRefreshInquire(Bbska.trenoMonada.DOM);
	})).

	append(Bbska.mazemaDOM = $('<img>').
	addClass('sidePanelButton cpanelButton').attr({
		title: 'Shrink (Control-Q)',
		src: 'ikona/cpanel/ikonomiki.png',
	}).
	on('click', function(e) {
		e.stopPropagation();

		Bbska.
		expandEnd().
		explodeEnd().
		mazema().
		searchInit();
	})).

	append(Bbska.expandDOM = $('<img>').
	addClass('sidePanelButton cpanelButton').
	on('click', function(e) {
		var mlist = [];

		e.stopPropagation();

		if (Bbska.expanding)
		return Bbska.expandEnd();

		if (Bbska.exploding)
		Bbska.explodeEnd();

		$(this).
		addClass('cpanelButtonEmfanes').
		attr({
			src: 'ikona/misc/workingRed.gif',
			title: 'Expanding…',
		});

		Bbska.expanding = true;

		if (Bbska.root.oxiAplomeni())
		return Bbska.root.aploma(function() {
			Bbska.expandEnd();
		});

		Bbska.
		expandPrepare(Bbska.root, mlist).
		expandExec(mlist);
	})).

	append(Bbska.explodeDOM = $('<img>').
	addClass('sidePanelButton cpanelButton').
	on('click', function(e) {
		e.stopPropagation();

		if (Bbska.exploding)
		return Bbska.explodeEnd();

		if (Bbska.expanding)
		Bbska.expandEnd();

		$(this).attr({
			src: 'ikona/misc/workingRed.gif',
			title: 'Exploding…',
		}).addClass('cpanelButtonEmfanes');

		Bbska.exploding = true;
		Bbska.explode();
	}));

	Bbska.
	expandButtonReset().
	explodeButtonReset();

	if (Selida.isLogin())
	Bbska.cpanelDOM.

	append(Bbska.inquireDOM = $('<img>').
	addClass('sidePanelButton cpanelButton').attr({
		title: 'Inquire mode (Control-E)',
		src: 'ikona/cpanel/anazitisi.png',
	}).data('refresh', function() {
		return Bbska.modeIsUpdate();
	}).on('click', function(e) {
		e.stopPropagation();

		Bbska.
		modeSetInquire().
		cpanelRefresh();

		setTimeout(function() {
			$('.monada').each(function() {
				var monada;

				if (!(monada = $(this).data('monada')))
				return true;

				monada.
				panelOff().
				teknoDraggable(false);

				return true;
			});

			$('.monadaHandler').addClass('monadaHandlerAnenergi');
		}, 0);
	})).

	append(Bbska.updateDOM = $('<img>').
	addClass('sidePanelButton cpanelButton').attr({
		title: 'Update mode (Control-E)',
		src: 'ikona/cpanel/mastorema.png',
	}).data('refresh', function() {
		return Bbska.modeIsInquire();
	}).on('click', function(e) {
		e.stopPropagation();
		$.post('bbska.php', {
			'action': 'imageclear',
			'private': true,
		});

		Bbska.
		trenoClear().
		modeSetUpdate().
		cpanelRefresh();

		setTimeout(function() {
			$('.monada').each(function() {
				var monada;

				if (!(monada = $(this).data('monada')))
				return true;

				monada.
				teknoDraggable();

				return true;
			});

			$('.monadaHandlerAnenergi').removeClass('monadaHandlerAnenergi');
		}, 0);
	})).

	append($('<img>').addClass('sidePanelButton cpanelButton').attr({
		title: 'Upload photo (' + Bbska.imgdepo + ')',
		src: 'ikona/cpanel/camera.png',
	}).data('refresh', function() {
		return Bbska.modeIsUpdate();
	}).on('click', function(e) {
		e.stopPropagation();
		Bbska.wimgdepo = window.open(Bbska.imgdepo, 'imgdepo');
	}));

	Bbska.cpanelDOM.
	append(Bbska.infoDOM = $('<img>').
	addClass('sidePanelButton cpanelButton').attr({
		title: 'Show/hide info (Control-I)',
		src: 'ikona/cpanel/info.png',
	}).data('refresh', function() {
		return Bbska.modeIsInquire();
	}).on('click', function(e) {
		e.stopPropagation();
		Bbska.infoToggle();
	}));

	Bbska.
	korifiButtonRefresh().
	cpanelRefresh();

	$(window).
	on('scroll', function() {
		Bbska.
		korifiButtonRefresh();
	});
	return Bbska;
};

Bbska.cpanelRefresh = function() {
	Bbska.cpanelDOM.children('.cpanelButton').each(function() {
		var refresh, display;

		display = 'none';

		refresh = $(this).data('refresh');

		if (!refresh)
		display = 'block';

		else if (refresh())
		display = 'block';

		$(this).css('display', display);
		return true;
	});

	return Bbska;
};

Bbska.korifiButtonRefresh = function() {
	Bbska.korifiButtonDOM.css('visibility',
	$(window).scrollTop() < 50 ? 'hidden' : 'visible');
	return Bbska;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////@

Bbska.spanelSetup = function() {
	Bbska.spanelDOM.

	append($('<div>').addClass('spanelButtonContainer').

	append(Bbska.ecoDOM = $('<img>').addClass('sidePanelButton spanelButton')).

	on('click', function(e) {
		e.stopPropagation();
		Bbska.ecoToggle();
	})).

	append($('<div>').addClass('spanelButtonContainer').

	append($('<img>').addClass('sidePanelButton spanelButton').attr({
		title: 'Previous match',
		src: 'ikona/spanel/targetPrv.png',
	})).

	append(Bbska.targetCntPrvDOM = $('<div>').addClass('targetCount')).

	on('click', function(e) {
		e.stopPropagation();
		Bbska.searchNavigatePrv();
	})).

	append($('<div>').addClass('spanelButtonContainer').

	append($('<img>').addClass('sidePanelButton spanelButton').attr({
		title: 'Current match',
		src: 'ikona/spanel/targetCur.png',
	})).

	on('click', function(e) {
		e.stopPropagation();
		Bbska.searchNavigateCur();
	})).

	append($('<div>').addClass('spanelButtonContainer').

	append(Bbska.targetCntNxtDOM = $('<div>').addClass('targetCount')).

	append($('<img>').
	addClass('sidePanelButton spanelButton').attr({
		title: 'Next match',
		src: 'ikona/spanel/targetNxt.png',
	})).

	on('click', function(e) {
		e.stopPropagation();
		Bbska.searchNavigateNxt();
	}));

	Bbska.ecoRefreshDOM();

	return Bbska;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////@

Bbska.oxiRoot = function() {
	return !Bbska.hasOwnProperty('root');
};

Monada.prototype.isRoot = function() {
	if (Bbska.oxiRoot())
	return false;

	return(this.kodikos === Bbska.root.kodikos);
};

Monada.prototype.oxiRoot = function() {
	return !this.isRoot();
};

Monada.prototype.createDOM = function() {
	var handlerDOM;

	this.DOM = $('<div>').
	addClass('monada').
	data('monada', this);

	this.
	bbskaRefreshDOM().
	dataRefreshDOM();

	this.DOM.
	append(this.teknoDOM = $('<div>'));

	this.DOM.
	append(handlerDOM = $('<div>').addClass('monadaHandler').
	attr('title', this.kodikos + '@' + (this.xristis ? this.xristis : Selida.login)));

	if (Bbska.modeIsInquire())
	handlerDOM.addClass('monadaHandlerAnenergi');

	if (Bbska.isInfo())
	handlerDOM.addClass('monadaHandlerInfo');

	return this;
};

Monada.prototype.bbskaRefreshDOM = function(aplomeni) {
	var monada = this;

	this.DOM.children('.bbskaBlockIcon').remove();

	// Πρώτα εξετάζουμε την περίπτωση κατά την οποία δεν πρέπει να
	// εμφανίζεται μπάμπουσκα.

	if (this.oxiBabouska()) {
		delete monada.aplomeni;

		if (!this.hasOwnProperty('bbskaDOM'))
		return this;

		this.bbskaDOM.remove();
		delete this.bbskaDOM;

		return this;
	}

	if (!this.hasOwnProperty('bbskaDOM'))
	this.DOM.append(this.bbskaDOM = $('<img>').addClass('bbska'));

	this.bbskaRefreshIcon();

	// Όσο το πρόγραμμα παραλαμβάνει το database image δεν εμφανίζουμε την
	// μπάμπουσκα στις μονάδες πληροφορίας. Εξαίρεση αποτελεί η ριζική μονάδα
	// προκειμένου να φαίνεται η μπάμπουσκα να στριφογυρνά όσο διαρκεί η αρχική
	// ανάπτυξη της ριζικής μονάδας σε πρώτο επίπεδο.

	if (Bbska.imageWait && this.oxiRoot())
	this.bbskaDOM.addClass('imageWait');

	if (!aplomeni)
	return this;

	this.bbskaDOM.addClass('bbskaAplomeni');
	this.aplomeni = true;

	return this;
};

// Η μπάμπουσκα εμφανίζεται μόνον όταν η μονάδα έχει παιδιά. Ωστόσο υπάρχει μια
// εξαίρεση σ' αυτόν τον κανόνα: Όταν η μονάδα είναι μπλοκαρισμένη, εμφανίζουμε
// μπάμπουσκα γιατί δεν γνωρίζουμε αν η μονάδα έχει τέκνα ή όχι. Η εξαίρεση
// ακυρώνεται, φυσικά, αν η μονάδα είναι ριζική καθώς σ' αυτήν την περίπτωση
// η μονάδα και τα περιεχόμενά της έχουν κοινοποιηθεί στο πρόγραμμα.

Monada.prototype.oxiBabouska = function() {
	// Αν είναι γνωστό σε μας ότι η μονάδα έχει παιδιά, τότε δεν τίθεται θέμα
	// καθώς θα πρέπει να εμφανίζεται μπάμπουσκα εξ ορισμού.

	if (this.isTekno())
	return false;

	// Το πρόγραμμα δεν «βλέπει» παιδιά στη μονάδα. Αυτό μπορεί να σημαίνει ότι
	// η μονάδα πράγματι δεν έχει παιδιά, ή ότι η μονάδα είναι μπλοκαρισμένη και
	// ως εκ τούτου το πρόγραμμα δεν γνωρίζει αν η μονάδα έχει παιδιά ή όχι.

	// Αν η μονάδα χρησιμοποιείται ως ριζική, τότε το μπλοκάρισμα δεν ισχύει,
	// άρα σ' αυτήν την περίπτωση, όντως, η μονάδα δεν έχει παιδια και ως εκ
	// τούτου δεν πρέπει να εμφανίζεται μπάμπουσκα.

	if (this.isRoot())
	return true;

	// Η μονάδα δεν είναι ριζική και δεν «βλέπουμε» τέκνα. Αν η μονάδα είναι
	// μπλοκαρισμένη, μπορεί να υπάρχουν τέκνα και ως εκ τούτου θα δείξουμε
	// μπάμπουσκα.

	if (this.isTerminal())
	return false

	return true;
};

// Η μέθοδος "bbskaRfreshIcon" αναλαμβάνει να ενημερώσει την εικόνα
// της μπάμπουσκας μιας μονάδας όσον αφορά το περιεχόμενό της και όχι
// το αν η μονάδα είναι ανεπτυγμένη ή συνεπτυγμένη.
//
// Αν περάσουμε αληθή παράμετρο, τότε η μέθοδος λειτουργεί αναδρομικά
// στις περιεχόμενες μονάδες όλων των επιπέδων.

Monada.prototype.bbskaRefreshIcon = function(recur) {
	var monada = this, src;

	if (!this.hasOwnProperty('bbskaDOM'))
	return this;

	src = this.iconGet();
	if (src) {
		if (!src.match(/http(s?):\/\//))
		src = Selida.server + 'ikona/favicon/' + src + '.png';
	}
	else {
		src = this.DOM.parent().closest('.monada').data('iconSrc');

		if (!src)
		src = Bbska.icon;
	}

	this.DOM.data('iconSrc', src);
	this.bbskaDOM.attr('src', src);

	this.DOM.children('.bbskaBlockIcon').remove();
	this.bbskaDOM.removeClass('bbskaTERMINAL');

	if (this.oxiRoot() && this.isTerminal())
	this.DOMblockSet();

	else
	this.DOM.parents('.monada').each(function() {
		if ($(this).data('monada').kodikos !== monada.kodikos)
		return true;

		monada.
		atermonSet().
		DOMblockSet('Found as ancestor!');

		return false;
	});

	if (recur)
	this.teknoWalk(function() {
		// Αν κάποιος από τους απογόνους έχει δικό του εικονίδιο,
		// τότε σταματούμε την αναδρομή σε αυτό το σημείο καθώς
		// οι απόγονοι κατωτέρου επιπέδου κληρονομούν από αυτή
		// τη μονάδα.

		if (this.iconGet())
		return true;

		this.bbskaRefreshIcon(recur);
		return true;
	});

	return this;
};

Monada.prototype.dataRefreshDOM = function() {
	var monada = this, headerRowDOM, noattr;

	if (this.dataDOM)
	this.dataDOM.empty();

	else
	this.DOM.
	append(this.dataDOM = $('<table>').prop('border', 0));

	this.dataDOM.
	removeClass().
	addClass('monadaData');

	// Η πρώτη γραμμή το πίνακα περιέχει τα στοιχεία ταυτότητας του
	// κόμβου, τουτέστιν τον κωδικό και την ιδιωτικότητα. Επί του
	// παρόντος εκκινούμε με τον κωδικό.

	this.dataDOM.
	append(headerRowDOM = $('<tr>').
	addClass('monadaHeaderRow').
	append(this.headerDOM = $('<td>').prop('colspan', 2).
	append(this.arithmisiDOM = $('<div>').addClass('monadaArithmisi')).
	append($('<div>').addClass('monadaKodikos').text(this.kodikos))));

	if (Bbska.isInfo())
	headerRowDOM.addClass('monadaHeaderRowInfo');

	if (this.oxiRoot() && this.isTerminal())
	this.dataDOM.addClass('monadaDataTERMINAL');

	if (this.isNeutral())
	this.dataDOM.addClass('monadaDataNEUTRAL');

	if (this.isExplosive())
	this.dataDOM.addClass('monadaDataEXPLOSIVE');

	// Αρχικά θεωρούμε ότι η μονάδα δεν διαθέτει εμφανίσιμα attributes.

	noattr = true;

	// Αν υπάρχουν sort attributes, θα πρέπει να εμφανιστούν πρώτα στην
	// άνω αριστερά γωνία.

	this.attrWalk(function() {
		// Επί τη ευκαιρία της περιδιάβασης όλων των attributes
		// επιχειρούμε διαγραφή των αντίστοιχων DOM attributes.

		delete this.DOM;

		switch (this.tiposSort()) {

		// Όταν υπάρχει φανερό sort key, τότε αυτό θα εμφανιστεί στην
		// άνω αριστερή γωνία.
		case 1:
			monada.dataDOM.addClass('monadaDataSORT').
			append(this.getDOM());
			noattr = false;
			break;

		// Αν υπάρχει κρυφό sort key, τότε θα πρέπει αυτό να γίνει
		// ευκρινές με σημαδάκι στην άνω αριστερή γωνία.

		case 2:
			monada.dataDOM.addClass('monadaDataSORT');
			break;
		}

		// Δεν επιστρέφουμε false καθώς μπορεί να υπάρχουν περισσότερα
		// από ένα sort attributes.

		return true;
	});

	// Προσθέτουμε τώρα τα υπόλοιπα attributes εκτός των sort attributes.

	this.attrWalk(function() {
		var dom;

		if (this.isSort())
		return true;

		dom = this.getDOM();

		if (!dom)
		return true;

		monada.dataDOM.append(dom);
		noattr = false;

		return true;
	});

	if (noattr)
	monada.dataDOM.addClass('monadaDataEMPTY');

	// Αν η μονάδα περιέχει κλειδιά ταξινόμησης, κρυφά ή φανερά, τότε θα
	// προσθέσουμε ειδικό σηματάκι στην άνω αριστερά γωνία.

	if (this.dataDOM.hasClass('monadaDataSORT'))
	this.dataDOM.append($('<img>').addClass('sortIcon').attr({
		src: 'ikona/misc/sort.png',
		title: monada.sortGet(),
	}));

	// Ήρθε η στιγμή να ενημερώσουμε τα στοιχεία ιδιωτικότητας.

	this.idioRefreshDOM();

	$('.goPanel').remove();

	if (Bbska.searchTarget.hasOwnProperty(this.kodikos)) {
		this.DOM.addClass('monadaTarget');
		this.dataDOM.addClass('monadaDataTarget');
	}

	else {
		this.DOM.removeClass('monadaTarget');
		this.dataDOM.removeClass('monadaDataTarget');
	}

	return this;
};

Monada.prototype.idioRefreshDOM = function() {
	this.headerDOM.
	removeClass().
	addClass('monadaHeader');

	switch (this.idiotikotita) {
	case 'SYSTEM':
		this.dataDOM.addClass('monadaDataSYSTEM');
		this.headerDOM.addClass('monadaSYSTEM');
		break;
	case 'PRIVATE':
		this.dataDOM.addClass('monadaDataPRIVATE');
		this.headerDOM.addClass('monadaPRIVATE');
		break;
	case 'PUBLIC':
		break;
	}

	return this;
};

Monada.prototype.getDOM = function() {
	if (!this.hasOwnProperty('DOM'))
	this.createDOM();

	return this.DOM;
};

Attrib.prototype.createDOM = function() {
	var key, val, keyDOM, valDOM;

	key = this.keyGet();
	if (key.isSpecial())
	return this;

	val = this.valGet();

	if ((!key) && (!val))
	return this;

	this.DOM = $('<tr>').
	data('attr', this);

	// Αν πρόκειται για sort attribute, τότε κατασκευάζουμε επί τόπου το
	// σχετικό DOM και επιστρέφουμε.

	if (key.isSort()) {
		this.DOM.
		append(valDOM = $('<td>').addClass('attr attrSort').prop('colspan', 2));
		Bbska.attrRefreshDOM(valDOM, new Token(val));
		return this;
	}

	// Δημιουργούμε τα key/value tokens του ανά χείρας attribute με σκοπό
	// να κατασκευάσουμε λίγο αργότερα το σχετικό DOM.

	if (key.validImage() && val.validLink()) {
		key = new Token(key).linkSet(val);
		val = new Token().aplomaSet(1);
	}

	else if (val.validImage() && key.validLink()) {
		val = new Token(val).linkSet(key);
		key = new Token().aplomaSet(1);
	}

	else if (key.validLink() && key.invalidYouTube() && key.invalidImage() && (!val)) {
		key = new Token(Selida.server + 'ikona/misc/link.png').linkSet(key);
		val = new Token().aplomaSet(1);
	}

	else if ((!key) && val.validLink() && val.invalidYouTube() && val.invalidImage()) {
		key = new Token().aplomaSet(1);
		val = new Token(Selida.server + 'ikona/misc/link.png').linkSet(val);
	}

	else if (key && val.validLink() && val.invalidYouTube() && val.invalidImage()) {
		key = new Token(key).linkSet(val);
		val = new Token().aplomaSet(2);
	}

	else if (key.validLink() && key.invalidYouTube() && key.invalidImage() && val) {
		val = new Token(val).linkSet(key);
		key = new Token().aplomaSet(2);
	}

	else {
		key = new Token(key.replace(/\-/g, "\&#x2011;"));
		val = new Token(val);
	}

	// Έχουμε δημιουργήσει τα key/value tokens του ανά χείρας attribute και θα
	// κατασκευάσουμε τώρα το σχετικό DOM.

	if (key.isAploma() && val.isAploma()) {
		this.DOM.
		append(valDOM = $('<td>').addClass('attr').prop('colspan', 2));
		valDOM.html($('<hr>').addClass('enotita'));
		return this;
	}

	if (key.isNormal() && val.isNormal()) {
		this.DOM.
		append(keyDOM = $('<td>').addClass('attr attrKey')).
		append(valDOM = $('<td>').addClass('attr attrVal attrKeyVal attrBold'));

		Bbska.attrRefreshDOM(keyDOM, key);
		Bbska.attrRefreshDOM(valDOM, val);

		return this;
	}

	if (key.isNormal()) {
		this.DOM.
		append(keyDOM = $('<td>').addClass('attr').prop('colspan', 2));

		if (val.isLink())
		key.link = val.link;

		if (val.isJustify())
		keyDOM.addClass('attrJustify');

		if (val.isAploma(1)) {
			Bbska.attrRefreshDOM(keyDOM, key);
			return this;
		}

		if (val.isAploma(2)) {
			keyDOM.addClass('attrBold');
			Bbska.attrRefreshDOM(keyDOM, key);
			return this;
		}

		if (val.isAploma(3)) {
			keyDOM.addClass('attrIpogramisi');
			Bbska.attrRefreshDOM(keyDOM, key);
			return this;
		}

		if (val.isAploma(4)) {
			keyDOM.addClass('attrBold attrIpogramisi');
			Bbska.attrRefreshDOM(keyDOM, key);
			return this;
		}

		Bbska.attrRefreshDOM(keyDOM, key);
		return this;
	}

	if (val.isNormal()) {
		this.DOM.
		append(valDOM = $('<td>').addClass('attr attrKentro').prop('colspan', 2));

		if (key.link)
		val.link = key.link;

		if (key.isJustify())
		valDOM.addClass('attrJustify');

		if (key.isAploma(1)) {
			Bbska.attrRefreshDOM(valDOM, val);
			return this;
		}

		if (key.isAploma(2)) {
			valDOM.addClass('attrBold');
			Bbska.attrRefreshDOM(valDOM, val);
			return this;
		}

		if (key.isAploma(3)) {
			valDOM.addClass('attrIpogramisi');
			Bbska.attrRefreshDOM(valDOM, val);
			return this;
		}

		if (key.isAploma(4)) {
			valDOM.addClass('attrBold attrIpogramisi');
			Bbska.attrRefreshDOM(valDOM, val);
			return this;
		}

		Bbska.attrRefreshDOM(valDOM, val);
		return this;
	}

	return this;
};

Bbska.attrRefreshDOM = function(dom, tok) {
	var text, html, img;

	text = tok.text;

	if (Bbska.searchPatternRE && tok.isNormal() && text.match(Bbska.searchPatternRE)) {
		html = text.replace(Bbska.searchPatternRE, function(s) {
			return '<span class="attrTarget">' + s + '</span>';
		});
	}

	else
	html = text;

	html = html.
	replace(/\[\[!/g, '<div class="attrEntono attrEntonoError">').
	replace(/\[\[\*/g, '<div class="attrEntono attrEntonoWarning">').
	replace(/\[\[#/g, '<div class="attrEntono attrEntonoNotice">').
	replace(/\[\[\?/g, '<div class="attrEntono attrEntonoExtra">').
	replace(/\[\[~/g, '<div class="attrEntono attrEntonoTrivial">').
	replace(/\[\[=/g, '<div class="attrEntono attrEntonoExotic">').
	replace(/\[\[:/g, '<div class="attrEntono attrEntonoEros">').
	replace(/\[\[%/g, '<div class="attrEntono attrEntonoPal">').
	replace(/\[\[@/g, '<div class="attrEntono attrEntonoMono">').
	replace(/\[\[\//g, '<div class="attrEntono attrEntonoItalic">').
	replace(/\]\]/g, '</div>');

	if (text.validEmail()) {
		dom.addClass('attrURL').
		append($('<a>').prop({
			href: 'mailto:' + text,
			target: '_blank',
		}).html(html));

		return Bbska;
	}

	if (text.validImage()) {
		if (tok.link)
		dom.append(dom = $('<a>').attr({
			target: '_blank',
			href: tok.link,
		}));

		dom.append(img = $('<img>').addClass('attrPhoto attrPhotoAnte').attr('src', text).
		on('load', function() {
			Bbska.attrPhotoResize($(this));
		}).
		on('error', function(e) {
			$(this).attr('src', 'ikona/misc/imageMissing.png');
		}));

		if (tok.link)
		img.addClass('attrPhotoLink');

		return Bbska;
	}

	if (text.validYouTube()) {
		dom.append($('<iframe>').addClass('attrYouTube').attr({
			width: 420,
			height: 315,
			frameborder: 0,
			src: '//www.youtube.com/embed' + text.replace(/^https?:\/\/youtu\.be/, ''),
		}));

		return Bbska;
	}

	if (text.validLink()) {
		dom.addClass('attrURL').
		append($('<a>').prop({
			href: text,
			target: '_blank',
		}).html(html.replace(/^https?:\/\//, '')));

		return Bbska;
	}

	html = html.replace(/\n/g, '<br />');

	if (!tok.link) {
		dom.html(html);
		return Bbska;
	}

	dom.addClass('attrLinkContainer');

	// Αν η διεύθυνση είναι της τρέχουσας σελίδας, τότε εμφανίζουμε
	// ως link αλλά δεν παρέχουμε το link.
	//
	// ΠΡΟΣΟΧΗ: Αφήστε «χαλαρό» τον έλεγχο και μην αντικαταστήσετε
	// τον τελεστή "!=" με "!==" καθώς το self.location δεν είναι
	// string.

	if (tok.link != self.location)
	dom.append($('<a>').attr({
		target: '_blank',
		href: tok.link,
	}).html(html).addClass('attrLink'));

	else
	dom.addClass('attrLinkDead').html(html);

	return Bbska;
};

Attrib.prototype.getDOM = function() {
	if (!this.hasOwnProperty('DOM'))
	this.createDOM();

	return this.DOM;
};

Bbska.attrPhotoResize = function(imgDOM) {
	var imgW, imgH, imgArea, scl;

	// Αν δεν έχει καθοριστεί στοιχείο εικόνας, τότε κάνουμε resize
	// σε όλα τα στοιχεία εικόνας του τρέχοντος DOM.

	if (imgDOM === undefined) {
		$('.attrPhoto').each(function() {
			Bbska.attrPhotoResize($(this));
			return true;
		});

		return Bbska;
	}

	imgW = imgDOM.width();
	imgH = imgDOM.height();

	imgArea = imgW * imgH;

	if (imgArea > Bbska.attrImageAreaMax) {
		scl = Bbska.attrImageAreaMax / imgArea;
		imgW = parseInt(Math.sqrt(scl) * imgW);
		imgDOM.css('width', imgW + 'px');
	}

	imgDOM.data('width', imgW).removeClass('attrPhotoAnte');

	return Bbska;
};

Monada.prototype.panel = function() {
	if (this.panelDOM)
	return this.panelOff();

	if (Bbska.modeIsInquire())
	return this;

	if (Selida.oxiLogin(this.xristis))
	return this;

	this.panelDOM = $('<div>').addClass('panel monadaPanel').
	insertAfter(this.dataDOM);

	this.panelRefreshDOM();

	// Κάνουμε κλικ στο νεόκοπο panel προκειμένου να ανέβει στην επιφάνεια
	// και να μην παραμένει κρυμμένο κάτω από άλλα στοιχεία της σελίδας.
	// Η ανάδυση δεν αρκεί λόγω της ιδιαιτερότητας του sortable.

	this.panelDOM.trigger('click');

	return this;
};

Monada.prototype.panelOff = function() {
	if (this.hasOwnProperty('dataDOM'))
	this.dataDOM.removeClass('monadaDataCandi');

	if (!this.hasOwnProperty('panelDOM'))
	return this;

	this.panelDOM.remove();
	delete this.panelDOM;

	return this;
};

Monada.prototype.panelRefreshDOM = function() {
	var monada = this;

	this.dataDOM.removeClass('monadaDataCandi');
	this.panelDOM.empty();

	if (this.oxiSystem() && this.oxiRoot())
	this.panelDOM.

	append($('<button>').addClass('monadaButton').text('Clone').
	on('click', function(e) {
		e.stopPropagation();
		monada.neamonada(true);
	})).

	append($('<button>').addClass('monadaButton').text('New').
	on('click', function(e) {
		e.stopPropagation();
		monada.neamonada();
	}));

	this.panelDOM.
	append(this.editButtonDOM = $('<button>').addClass('monadaButton').text('Edit').
	on('click', function(e) {
		e.stopPropagation();
		monada.edit();
	}));

	if (this.oxiSystem() && this.oxiRoot())
	this.panelDOM.

	append($('<button>').addClass('monadaButton').text('Delete').
	on('click', function(e) {
		e.stopPropagation();
		monada.panelDeleteConfirm();
	})).

	append($('<button>').addClass('monadaButton').text('Cut').
	on('click', function(e) {
		e.stopPropagation();
		monada.apokopi();
	}));

	if (this.oxiSystem() && this.oxiRoot() && this.oxiLinked())
	this.panelDOM.
	append($('<button>').addClass('monadaButton').text('Link').
	on('click', function(e) {
		e.stopPropagation();
		monada.sindesi();
	}));

	this.panelDOM.
	append($('<button>').addClass('monadaButton').text('Put').
	on('click', function(e) {
		e.stopPropagation();
		monada.ensomatosi();
	}));

	if (this.oxiSystem() && this.oxiRoot())
	this.panelDOM.
	append($('<button>').addClass('monadaButton').text('Paste').
	on('click', function(e) {
		e.stopPropagation();
		monada.epikolisi();
	}));

	this.panelDOM.
	append($('<button>').addClass('monadaButton').text('Append').
	on('click', function(e) {
		e.stopPropagation(e);
		monada.append();
	}));

	return this;
};

Monada.prototype.isLinked = function() {
	return Bbska.kalathi.tekno.hasOwnProperty(this.kodikos);
};

Monada.prototype.oxiLinked = function() {
	return !this.isLinked();
};

Monada.prototype.panelDeleteConfirm = function() {
	var monada = this;

	this.dataDOM.addClass('monadaDataCandi');

	this.panelDOM.
	empty().

	append($('<button>').addClass('monadaButton').text('Delete').
	on('click', function(e) {
		e.stopPropagation();
		monada.panelRefreshDOM();
		monada.diagrafi();
	})).

	append($('<button>').addClass('monadaButton').text('Cancel').
	on('click', function(e) {
		e.stopPropagation();
		monada.panelRefreshDOM();
	}));

	return this;
};

Monada.prototype.aploma = function(callback) {
	if (this.oxiRoot() && this.isTerminal())
	return this.bbskaBounce();

	if (this.isAtermon())
	return this.bbskaBounce();

	this.tekno = [];

	if (Bbska.databaseMode())
	this.aplomaDatabase(callback);

	else
	this.aplomaImage(callback);

	return this;
};

Monada.prototype.atermonSet = function() {
	this.atermon = true;
	return this;
};

Monada.prototype.isAtermon = function() {
	return this.atermon;
};

Monada.prototype.aplomaDatabase = function(callback) {
	var monada = this;

	$.post('bbska.php', {
		action: 'teknoget',
		monada: this.kodikos,
	}, function(data) {
		if (!data)
		return monada.aplomaPost(callback);

		try {
			monada.tekno = data.evalAsfales();
		} catch (e) {
			return console.error('bbska.php::teknoget: ' + data);
		}

		monada.aplomaPost(callback);
	}).fail(function() {
		monada.bbskaRelax();
	});

	return this;
};

Monada.prototype.aplomaImage = function(callback) {
	var monada = this;

	setTimeout(function() {
		var monadaImage;

		if (Bbska.oxiImage(monada.kodikos))
		return monada.aplomaPost(callback);

		monadaImage = Bbska.image[monada.kodikos];

		if (!monadaImage.hasOwnProperty('t'))
		return monada.aplomaPost(callback);

		Globals.awalk(monadaImage.t, function(i, k) {
			var teknoImage, tekno;

			if (Bbska.oxiImage(k))
			return;

			teknoImage = Bbska.image[k];

			tekno = {};

			tekno.kodikos = k;

			if (teknoImage.hasOwnProperty('x'))
			tekno.xristis = teknoImage.x;

			switch (teknoImage.i) {
			case 1:
				tekno.idiotikotita = 'SYSTEM';
				break;
			case 2:
				tekno.idiotikotita = 'PRIVATE';
				break;
			default:
				tekno.idiotikotita = 'PUBLIC';
				break;
			}

			tekno.alist = [];
			if (teknoImage.hasOwnProperty('a'))
			Globals.awalk(teknoImage.a, function(i, a) {
				tekno.alist.push({
					key: a.k,
					val: a.v,
				});
			});

			tekno.tekno = [];
			if (teknoImage.hasOwnProperty('t'))
			Globals.awalk(teknoImage.t, function(i, t) {
				tekno.tekno.push({
					kodikos: t,
				});
			});

			monada.tekno.push(tekno);
		});

		monada.aplomaPost(callback);
	}, 0);

	return this;
};

Monada.prototype.aplomaPost = function(callback) {
	var monada = this, aa, mlist;

	this.teknoDOM.children('.monada').remove();

	this.
	teknoFix().
	teknoSort().
	teknoWalk(function() {
		monada.teknoDOM.append(this.getDOM());
		this.bbskaRefreshIcon();
		return true;
	});

	this.aplomeni = true;
	this.teknoDraggable();

	if (callback)
	callback();

	mlist = this.teknoDOM.children('.monada');
	aa = mlist.length;
	mlist.each(function() {
		$(this).data('monada').arithmisiDOM.text(aa);
		aa--;
		return true;
	});

	return this;
};

Monada.prototype.isAplomeni = function() {
	return this.aplomeni;
};

Monada.prototype.oxiAplomeni = function() {
	return !this.isAplomeni();
};

Monada.prototype.mazema = function() {
	delete this.aplomeni;

	if (!this.hasOwnProperty('teknoDOM'))
	return this;

	this.teknoDOM.empty();

	if (this.hasOwnProperty('bbskaDOM'))
	this.bbskaDOM.removeClass('bbskaAplomeni');

	return this;
};

Monada.prototype.aplomaAnimated = function() {
	var monada = this;

	if (!this.hasOwnProperty('teknoDOM'))
	return this;

	if (Bbska.crude) {
		monada.aploma();
		monada.bbskaDOM.addClass('bbskaAplomeni');
		return this;
	}

	this.bbskaWorking();
	setTimeout(function() {
		monada.teknoDOM.css('display', 'none');
		monada.aploma(function() {
			monada.teknoDOM.finish().
			slideDown(monada.animationDelay(), function() {
				monada.bbskaRelax();
			});
		});
	}, 0);

	return this;
};

Monada.prototype.mazemaAnimated = function() {
	var monada = this;

	delete this.aplomeni;

	if (!this.hasOwnProperty('teknoDOM'))
	return this;

	if (Bbska.crude) {
		monada.teknoDOM.empty();
		monada.bbskaDOM.removeClass('bbskaAplomeni');
		return this;
	}

	this.bbskaWorking(true);
	setTimeout(function() {
		monada.teknoDOM.finish().slideUp(monada.animationDelay(), function() {
			monada.teknoDOM.empty().css('display', 'block');
			if (!monada.hasOwnProperty('bbskaDOM'))
			return;

			monada.bbskaRelax();
			monada.bbskaDOM.removeClass('bbskaAplomeni');
		});
	}, 0);

	return this;
};

Monada.prototype.animationDelay = function() {
	var delay, aone = 30, amin = 200, amax = 400;

	if (!this.hasOwnProperty('tekno'))
	return 0;

	delay = this.tekno.length * aone;

	if (delay > amax)
	delay = amax;

	else if (delay < amin)
	delay = amin;

	return delay;
};

Monada.prototype.bbskaWorking = function(anapoda) {
	if (!this.bbskaDOM)
	return this;

	if (anapoda)
	anapoda = { fora: -1 };

	this.bbskaDOM.peristrofiStart(anapoda);
	return this;
};

Monada.prototype.bbskaBounce = function() {
	var dom = this.bbskaDOM;

	if (!dom)
	return this;

	this.bbskaRelax();

	dom = this.DOM.children('.bbskaBlockIcon');

	if (!dom.length)
	return this;

	dom.finish().animate({
		opacity: '1.0',
		left: '-34px',
		width: '30px',
	}, 50, function() {
		dom.finish().animate({
			opacity: '0.8',
			left: '-40px',
			width: '15px',
		}, 1000, 'easeOutBounce');
	});

	return this;
};

Monada.prototype.DOMblockSet = function(info) {
	if (!this.hasOwnProperty('DOM'))
	return this;

	this.DOM.append($('<img>').
	addClass('bbskaBlockIcon').
	attr('src', 'ikona/misc/block.png'));

	if (!this.hasOwnProperty('bbskaDOM'))
	return this;

	this.bbskaDOM.addClass('bbskaTERMINAL');

	if (info)
	this.bbskaDOM.attr('title', info);

	return this;
}

Monada.prototype.bbskaRelax = function() {
	if (!this.bbskaDOM)
	return this;

	this.bbskaDOM.peristrofiStop();

	if (this.aplomeni)
	this.bbskaDOM.addClass('bbskaAplomeni');

	return this;
};

Monada.prototype.teknoDraggable = function(off) {
	var monada = this, offsetY, maxY;

	if (!this.hasOwnProperty('teknoDOM'))
	return this;

	if (off === false) {
		if (this.teknoDOM.sortable('instance'))
		this.teknoDOM.sortable('destroy');

		return this;
	}

	if (Bbska.modeIsInquire())
	return this;

	if (Selida.oxiLogin(this.xristis))
	return this;

	this.teknoDOM.sortable({
		delay: 150,
		axis: 'y',
		cursor: 'move',
		tolerance: 'pointer',
		handle: '.bbska,.monadaHandler',

		start: function(e, ui) {
			ui.item.
			addClass('monadaMoving').
			children('.monadaData').
			addClass('monadaDataMoving');

			ui.placeholder.
			height(ui.item.height());

			offsetY = e.clientY - parseInt(ui.helper.css('top'));
			maxY = monada.teknoDOM.height() + 50;

		},

		sort: function(e, ui) {
			var helperY, dy;

			helperY = parseInt(ui.helper.css('top'));
			dy = helperY - e.clientY + offsetY;

			if (!dy)
			return;

			helperY -= dy;

			if (helperY < 0)
			helperY = 0;

			else if (helperY > maxY)
			helperY = maxY;

			ui.helper.css('top', helperY + 'px');
		},

		update: function(e, ui) {
			var goneasImage, kmov, tlist, imov, prm;

			if (Bbska.imageMode()) {
				if (Bbska.oxiImage(monada.kodikos))
				return;

				goneasImage = Bbska.image[monada.kodikos];
			}

			kmov = ui.item.data('monada').kodikos;
			tlist = [];
			monada.teknoDOM.children('.monada').each(function() {
				var k;

				k = $(this).data('monada').kodikos;
				tlist.push(k);

				if (k === kmov)
				imov = tlist.length - 1;

				return true;
			});

			if (tlist.length < 2)
			return;

			prm = {
				action: 'reorder',
				goneas: monada.kodikos,
				tekno: tlist[imov],
			};

			if (imov === 0)
			prm.epomeno = tlist[imov + 1];

			else
			prm.proigoumeno = tlist[imov - 1];

			$.post('bbska.php', prm, function(data) {
				if (data !== Selida.okrsp)
				return monada.aploma();

				if (Bbska.databaseMode())
				return;

				goneasImage.t = tlist;
			}).
			fail(function() {
				monada.aploma();
			});
		},

		stop: function(e, ui) {
			ui.item.
			css('top', 'auto').
			removeClass('monadaMoving').
			children('.monadaData').
			removeClass('monadaDataMoving');
		},
	});

	return this;
};

Monada.prototype.append = function() {
	var monada = this, monadaImage;

	if (Bbska.imageMode()) {
		if (Bbska.oxiImage(this.kodikos))
		return this;

		monadaImage = Bbska.image[this.kodikos];
	}

	$.post('bbska.php', {
		action: 'append',
		goneas: this.kodikos,
	}, function(data) {
		var tekno, tlist;

		try {
			tekno = new Monada(data.evalAsfales());
		} catch (e) {
			return console.error('bbska.php::append: ' + data);
		}

		monada.teknoDOM.prepend(tekno.getDOM());
		monada.
		teknoPush(tekno).
		teknoDraggable().
		bbskaRefreshDOM(true);
		tekno.panel().edit();

		if (Bbska.databaseMode())
		return;

		Bbska.image[tekno.kodikos] = {
			a: [],
			t: [],
		};

		tlist = [ tekno.kodikos ];
		Globals.awalk(monadaImage.t, function(i, k) {
			tlist.push(k);
		});

		monadaImage.t = tlist;
	});

	return this;
};

Monada.prototype.neamonada = function(clone) {
	var monada = this, dom, goneas, monadaImage, goneasImage;

	dom = this.getDOM();
	goneas = dom.parent().closest('.monada').data('monada');

	if (!goneas)
	return this;

	if (Bbska.imageMode()) {
		if (Bbska.oxiImage(this.kodikos))
		return this;

		monadaImage = Bbska.image[this.kodikos];

		if (Bbska.oxiImage(goneas.kodikos))
		return this;

		goneasImage = Bbska.image[goneas.kodikos];
	}

	$.post('bbska.php', {
		action: 'neamonada',
		monada: this.kodikos,
		goneas: goneas.kodikos,
		clone: clone,
	}, function(data) {
		var nea, neaImage, tlist;

		try {
			nea = new Monada(data.evalAsfales());
		} catch (e) {
			return console.error('bbska.php::neamonada: ' + data);
		}

		nea.attrFix().getDOM().insertAfter(dom);
		goneas.teknoPush(nea);
		nea.panel().edit();

		if (clone)
		nea.editDOM.find('.editVal').first().focus();

		if (Bbska.databaseMode())
		return;

		neaImage = {};

		Bbska.image[nea.kodikos] = neaImage;

		switch (nea.idiotikotita) {
		case 'SYSTEM':
			neaImage.i = 1;
			break;
		case 'PRIVATE':
			neaImage.i = 2;
			break;
		}

		neaImage.a = [];
		nea.attrWalk(function() {
			neaImage.a.push({
				k: this.key,
				v: this.val,
			});
			return true;
		});

		tlist = [];
		Globals.awalk(goneasImage.t, function(i, k) {
			tlist.push(k);

			if (k === monada.kodikos)
			tlist.push(nea.kodikos);
		});

		goneasImage.t = tlist;
	});

	return this;
};

Monada.prototype.edit = function() {
	var monada = this, headerDOM, paletaDOM, cpanelDOM, idio, neutral, explode,
		terminal, idioDOM, neutralDOM, explodeDOM, terminalDOM, offsetY, maxY;

	if (Selida.oxiLogin(this.xristis))
	return this;

	if (this.editDOM) {
		this.DOM.anadisi();
		this.editDOM.anadisi();
		return this;
	}

	idio = this.idiotikotita;
	neutral = this.isNeutral();
	explode = this.isExplosive();
	terminal = this.isTerminal();

	if (this.hasOwnProperty('editButtonDOM'))
	this.editButtonDOM.css('display', 'none');

	this.DOM.anadisi().
	append(this.editDOM = $('<div>').addClass('editForma').
	append(headerDOM = $('<div>').addClass('monadaHeader').
	append($('<div>').addClass('monadaKodikos').text(this.kodikos))).
	append($('<table>').addClass('editTable').
	append(this.editTableDOM = $('<tbody>').sortable({
		axis: 'y',
		cursor: 'move',
		tolerance: 'pointer',
		containment: 'parent',

		start: function(e, ui) {
			offsetY = e.clientY - parseInt(ui.helper.css('top'));
			maxY = monada.editTableDOM.height() + 10;
			ui.placeholder.height(ui.item.height());
		},

		sort: function(e, ui) {
			var helperY, dy;

			helperY = parseInt(ui.helper.css('top'));
			dy = helperY - e.clientY + offsetY;

			if (!dy)
			return;

			helperY -= dy;

			if (helperY < 0)
			helperY = 0;

			else if (helperY > maxY)
			helperY = maxY;

			ui.helper.css('top', helperY + 'px');
		},

		update: function() {
			monada.alist = [];
			monada.editTableDOM.children('tr').each(function() {
				var key, val;

				key = $(this).find('.editKey').val();
				val = $(this).find('.editVal').val();

				if ((!key) && (!val))
				return true;

				monada.attrPush(new Attrib({
					key: key,
					val: val,
				}));

				return true;
			});

			monada.editAttrRefresh();
		},

		stop: function(e, ui) {
			ui.item.css('top', 'auto');
		},
	}))));

	this.editAttrRefresh();

	this.editDOM.
	append($('<div>').addClass('panel editPanel').

	append(this.editSaveButtonDOM = $('<input>').
	addClass('monadaButton editSaveButton').
	attr('title', 'Save (Control-S)').
	prop('type', 'button').val('Save').
	on('click', function(e) {
		var kdata, vdata, monadaImage;

		e.stopPropagation();

		if (Bbska.imageMode()) {
			if (Bbska.oxiImage(monada.kodikos))
			return;

			monadaImage = Bbska.image[monada.kodikos];
		}

		kdata = [];
		vdata = [];

		monada.editTableDOM.find('tr').each(function() {
			kdata.push($(this).find('.editKey').val().trim());
			vdata.push($(this).find('.editVal').val().trim());
		});

		$.post('bbska.php', {
			action: 'save',
			monada: monada.kodikos,
			idio: idio,
			kdata: kdata,
			vdata: vdata,
		}, function(data) {
			var autoClone, x, i;

			autoClone = Bbska.autoClone;
			delete Bbska.autoClone;

			if (!data)
			return;

			try {
				x = data.evalAsfales();
			} catch (e) {
				return console.error('bbska.php::save: ' + data);
			}

			monada.idiotikotita = x.idiotikotita;

			monada.alist = [];
			for (i = 0; i < x.alist.length; i++) {
				monada.attrPush(new Attrib({
					key: x.alist[i].key,
					val: x.alist[i].val,
				}));
			}

			monada.
			dataRefreshDOM().
			bbskaRefreshDOM().
			editCancel();

			if (autoClone)
			monada.neamonada(true);

			if (Bbska.databaseMode())
			return;

			switch (monada.idiotikotita) {
			case 'SYSTEM':
				monadaImage.i = 1;
				break;
			case 'PRIVATE':
				monadaImage.i = 2;
				break;
			default:
				delete monadaImage.i;
				break;
			}

			monadaImage.a = [];
			monada.attrWalk(function() {
				monadaImage.a.push({
					k: this.key,
					v: this.val,
				});
				return true;
			});
		});
	})).

	append($('<input>').
	addClass('monadaButton editCloneButton').
	prop('type', 'button').val('Clone').
	attr('title', 'Save & clone (Control-L)').
	on('click', function(e) {
		Bbska.autoClone = true;

		try {
			monada.editSaveButtonDOM.trigger('click');
		} catch (e) {
			delete Bbska.autoClone;
		}
	})).

	append($('<input>').
	addClass('monadaButton editCancelButton').
	prop('type', 'button').val('Cancel').
	on('click', function(e) {
		e.stopPropagation();
		monada.editCancel();
	})));

	this.editDOM.
	append(cpanelDOM = $('<div>').addClass('panel editCpanel'));

	if (idio != 'SYSTEM')
	cpanelDOM.
	append(idioDOM = $('<img>').addClass('editCpanelIcon').
	on('click', function(e) {
		e.stopPropagation();

		switch (idio) {
		case 'PUBLIC':
			idio = 'PRIVATE';
			break;
		default:
			idio = 'PUBLIC';
			break;
		}

		Bbska.editIdioRefreshDOM(headerDOM, idioDOM, idio);
	}).
	on('mousedown', function(e) {
		e.stopPropagation();
	}));

	cpanelDOM.
	append(neutralDOM = $('<img>').addClass('editCpanelIcon').
	on('click', function(e) {
		e.stopPropagation();
		neutral = !neutral;
		Bbska.
		attrSet(monada, neutral, '_neutral_').
		editNeutralRefreshDOM(neutralDOM, neutral);
	}).
	on('mousedown', function(e) {
		e.stopPropagation();
	})).

	append(explodeDOM = $('<img>').addClass('editCpanelIcon').
	on('click', function(e) {
		e.stopPropagation();
		explode = !explode;
		Bbska.
		attrSet(monada, explode, '_explode_').
		editExplodeRefreshDOM(explodeDOM, explode);
	}).
	on('mousedown', function(e) {
		e.stopPropagation();
	})).

	append(terminalDOM = $('<img>').addClass('editCpanelIcon').
	on('click', function(e) {
		e.stopPropagation();
		terminal = !terminal;
		Bbska.
		attrSet(monada, terminal, '_block_').
		editTerminalRefreshDOM(terminalDOM, terminal);
	}).
	on('mousedown', function(e) {
		e.stopPropagation();
	}));

	if (Bbska.iconDir)
	cpanelDOM.
	append($('<img>').addClass('editCpanelIcon').
	attr('src', 'ikona/misc/bbska.png').
	on('click', function(e) {
		e.stopPropagation();
		Bbska.iconPanelToggle(monada);
	}).
	on('mousedown', function(e) {
		e.stopPropagation();
	}));

	this.editDOM.
	append(paletaDOM = $('<div>').addClass('editPaleta').

	append($('<div>').addClass('attrEntonoError').attr('title', 'Error').text('!')).
	append($('<div>').addClass('attrEntonoWarning').attr('title', 'Warning').text('*')).
	append($('<div>').addClass('attrEntonoNotice').attr('title', 'Notice').text('#')).
	append($('<div>').addClass('attrEntonoTrivial').attr('title', 'Trivial').text('~')).
	append($('<div>').addClass('attrEntonoExtra').attr('title', 'Extra').text('?')).
	append($('<div>').addClass('attrEntonoExotic').attr('title', 'Exotic').text('=')).
	append($('<div>').addClass('attrEntonoEros').attr('title', 'Eros').text(':')).
	append($('<div>').addClass('attrEntonoPal').attr('title', 'Pal').text('%')).
	append($('<div>').addClass('attrEntonoMono').attr('title', 'Monospace').text('@')).
	append($('<div>').addClass('attrEntonoItalic').attr('title', 'Italic').text('/')).
	append($('<div>').addClass('attrEntonoTelos').attr('title', 'Telos').html('&bull;')));

	paletaDOM.
	children().addClass('attrEntono editPaletaItem').
	on('click', function(e) {
		var pos, val, val1, val2, txt;

		e.stopPropagation();

		try {
			Bbska.curfld.focus();
		} catch (e) {
			return;
		}

		pos = Bbska.curfld.prop('selectionStart');
		val = Bbska.curfld.val();

		val1 = val.substr(0, pos);
		val2 = val.substr(pos);

		txt = $(this).text();
		txt = txt.charCodeAt(0) === 8226 ? ']]' : '[[' + txt;
		pos += txt.length;

		Bbska.curfld.
		val(val1 + txt + val2).
		prop({
			selectionStart: pos,
			selectionEnd: pos,
		});
	}).
	on('mousedown', function(e) {
		e.stopPropagation();
	});

	Bbska.
	editIdioRefreshDOM(headerDOM, idioDOM, idio).
	editNeutralRefreshDOM(neutralDOM, neutral).
	editExplodeRefreshDOM(explodeDOM, explode).
	editTerminalRefreshDOM(terminalDOM, terminal);

	this.editDOM.anadisi().draggable({
		containment: 'document',
		cursor: 'move',
		opacity: 0.7,
	});

	return this;
};

Monada.prototype.editAttrRefresh = function() {
	var monada = this;

	this.editTableDOM.empty();
	this.attrWalk(function() {
		Bbska.editRowDOM(monada, this);
		return true;
	});

	Bbska.editRowDOM(monada);
	return this;
};

Monada.prototype.editCancel = function() {
	Bbska.iconPanelClose({
		duration: 0,
	});

	if (!this.editDOM)
	return this;

	this.editDOM.remove();
	delete this.editDOM;

	if (this.hasOwnProperty('editButtonDOM'))
	this.editButtonDOM.css('display', 'inline-block');

	return this;
};

Bbska.editIdioRefreshDOM = function(headerDOM, idioDOM, idio) {
	headerDOM.
	removeClass().
	addClass('monadaHeader');

	switch (idio) {
	case 'SYSTEM':
		headerDOM.addClass('monadaSYSTEM');
		break;
	case 'PRIVATE':
		idioDOM.attr({
			src: 'ikona/misc/public.png',
			title: 'Public',
		});
		headerDOM.addClass('monadaPRIVATE');
		headerDOM.parent().addClass('monadaDataPRIVATE');
		break;
	default:
		idioDOM.attr({
			src: 'ikona/misc/private.png',
			title: 'Private',
		});
		headerDOM.parent().removeClass('monadaDataPRIVATE');
		break;
	}

	return Bbska;
};

Bbska.editNeutralRefreshDOM = function(neutralDOM, neutral) {
	if (neutral)
	neutralDOM.attr({
		src: 'ikona/cpanel/expand.png',
		title: 'Deneutralize',
	});

	else
	neutralDOM.attr({
		src: 'ikona/misc/neutral.png',
		title: 'Neutralize',
	});

	return Bbska;
};

Bbska.editExplodeRefreshDOM = function(explodeDOM, explode) {
	if (explode)
	explodeDOM.attr({
		src: 'ikona/cpanel/ikonomiki.png',
		title: 'Deactivate',
	});

	else
	explodeDOM.attr({
		src: 'ikona/cpanel/panoramiki.png',
		title: 'Explosive',
	});

	return Bbska;
};

Bbska.editTerminalRefreshDOM = function(terminalDOM, terminal) {
	if (terminal)
	terminalDOM.attr({
		src: 'ikona/misc/pass.png',
		title: 'Pass',
	});

	else
	terminalDOM.attr({
		src: 'ikona/misc/block.png',
		title: 'Block',
	});

	return Bbska;
};

Bbska.attrSet = function(monada, attr, sattr) {
	var l, i, k;

	l = monada.editDOM.find('tr');

	if (!l.length)
	return Bbska;

	for (i = 0; i < l.length; i++) {
		k = $(l[i]).find('.editKey');

		if (!k.length)
		continue;

		if (k.val() === sattr)
		break;
	}

	if (!attr) {
		if (i < l.length) 
		l[i].remove();
		return Bbska;
	}

	if (i < l.length)
	return Bbska;

	$('<tr>').
	append($('<td>').append($('<textarea>').addClass('editKey').text(sattr))).
	append($('<td>').append($('<div>').addClass('editHandle').html('&#x2725;'))).
	append($('<td>').append($('<textarea>').addClass('editVal'))).
	append($('<td>').append($('<input>').addClass('editDelete').attr({
		type: 'button',
		value: 'Delete',
	}))).insertBefore(l[i - 1]);

	return Bbska;
};

Bbska.editRowDOM = function(monada, attr) {
	var key, mov, val, del;

	monada.editTableDOM.append($('<tr>').
	append($('<td>').append(key = $('<textarea>').addClass('editKey'))).
	append(mov = $('<td>').append($('<td>').append($('<div>').addClass('editHandle').html('&#x2725;')))).
	append($('<td>').append(val = $('<textarea>').addClass('editVal'))).
	append($('<td>').append(del = $('<input>').prop('type', 'button').
	addClass('editDelete').val('Delete'))));

	if (attr) {
		key.val(attr.keyGet());
		val.val(attr.valGet());
	}

	else {
		mov.css('visibility', 'hidden');
		del.css('visibility', 'hidden');
		key.focus();
	}

	return Bbska;
};

Bbska.editSetup = function() {
	var gotit = false;

	Selida.bodyDOM.

	on('selectstart', function() {
		return false;
	}).

	on('keydown', '.editForma textarea', function(e) {
		if (!e.ctrlKey)
		return;

		switch (e.which) {
		case 83:	// Control-S
			e.stopPropagation();
			e.preventDefault();
			$(e.target).closest('.editForma').find('.editSaveButton').trigger('click');
			break;
		case 76:	// Control-L
			e.stopPropagation();
			e.preventDefault();
			$(e.target).closest('.editForma').find('.editCloneButton').trigger('click');
			break;
		}
	}).

	on('keydown', '.editIdioButton', function(e) {
		e.stopPropagation();

		if (e.which !== 9)
		return;

		if (e.shiftKey)
		return;

		e.preventDefault();
		$(this).parent().children('.monadaButton').first().focus();
	}).

	on('keydown', '.editPanel,#iconPanel', function(e) {
		e.stopPropagation();
	}).

	on('keydown', '.editKey', function(e) {
		gotit = true;

		if (Bbska.editEnterKey(e, $(this)))
		return;

		if (Bbska.editPisoTab(e, $(this)))
		return;
	}).

	on('keydown', '.editVal', function(e) {
		gotit = true;

		if (Bbska.editEnterVal(e, $(this)))
		return;

		if (Bbska.editBrosTab(e, $(this)))
		return;
	}).

	on('focus', '.editKey,.editVal', function() {
		Bbska.curfld = $(this);
	}).

	on('keydown', function(e) {
		if (gotit) {
			gotit = false;
			return true;
		}

		switch (e.which) {
		case 16:	// Shift
		case 17:	// Control
		case 18:	// Alt
			return false;

		case 67:	// Control-C
		case 86:	// Control-V
			if (e.ctrlKey)
			return true;

			else
			break;

		case 40:	// Down arrow
		case 39:	// Right arrow
			if (Bbska.onlineMatchExists())
			return Bbska.onlineMatchNavigate(e, 1);

			if (e.ctrlKey || e.shiftKey)
			Bbska.searchNavigationIndex = Bbska.searchNavigationArray.length - 2;

			Bbska.searchNavigateNxt();
			return false;
		case 38:	// Up arrow
		case 37:	// Left arrow
			if (Bbska.onlineMatchExists())
			return Bbska.onlineMatchNavigate(e, -1);

			if (e.ctrlKey || e.shiftKey)
			Bbska.searchNavigationIndex = 1;

			Bbska.searchNavigatePrv();
			return false;
		case 34:	// Page down
			$(window).scrollTop($(window).scrollTop() + $(window).height());
			return false;
		case 33:	// Page up
			$(window).scrollTop($(window).scrollTop() - $(window).height());
			return false;
		case 35:	// End
			if (e.ctrlKey || e.shiftKey) {
				$(window).scrollTop($(document).height());
				return false;
			}

			else
			break;

		// Αν πατηθεί Control-Q, κάνουμε βίαιο «μάζεμα»
		// σε πρώτο επίπεδο.

		case 81:	// Control-Q
			if (!e.ctrlKey)
			break;

			Bbska.mazemaDOM.trigger('click');
			return false;

		// Αν πατηθεί Control-X, κάνουμε πλήρες «άπλωμα»
		// σε όλα τα επίπεδα.

		case 88:	// Control-X
			if (!e.ctrlKey)
			break;

			Bbska.explodeDOM.trigger('click');
			return false;

		// Αν πατηθεί Control-E και λειτουργούμε επώνυμα,
		// κάνουμε toggle Update/Find mode.

		case 69:	// Control-E
			if (!e.ctrlKey)
			break;

			if (Selida.oxiLogin())
			break;

			Bbska[Bbska.updateMode ? 'inquireDOM' : 'updateDOM'].trigger('click');
			return false;

		// Αν πατηθεί Control-S εκτελούμε αναζήτηση με το τρέχον
		// search pattern.

		case 83:	// Control-S
			if (!e.ctrlKey)
			break;

			e.stopPropagation();
			e.preventDefault();

			Bbska.searchSubmit();
			return false;

		// Αν πατηθεί Control-B κάνουμε toggle στον σελιδοδείκτη.

		case 66:	// Control-B
			if (!e.ctrlKey)
			break;

			e.stopPropagation();
			e.preventDefault();

			Bbska.trenoButtonDOM.trigger('click');
			return false;

		// Αν πατηθεί Control-I κάνουμε toggle τις πληροφορίες μονάδας.
		// By default δεν εμφανίζονται οι πληροφορίες μονάδας, αλλά
		// αυτό μπορεί να αλλάξει με χρήση της URL παραμέτρου "info".

		case 73:	// Control-I
			if (!e.ctrlKey)
			break;

			e.stopPropagation();
			e.preventDefault();

			Bbska.infoToggle();
			return false;

		// Αν πατηθεί Control-Y κάνουμε toggle το eco mode, τουτέστιν
		// αποκρύπτουμε ή εμφανίζουμε μονάδες που βρίσκονται στη
		// διαδρομή τυχόν επιλεγμένων μονάδων.
		// By default εμφανίζονται οι πληροφορίες που βρίσκονται στη
		// διαδρομή τυχόν επιλεγμένων μονάδων, αλλά αυτό μπορεί να
		// αλλάξει με χρήση της URL παραμέτρου "eco".

		case 89:	// Control-Y
			if (!e.ctrlKey)
			break;

			e.stopPropagation();
			e.preventDefault();

			Bbska.ecoToggle();
			return false;
		}

		try {
			$(window).scrollTop(0);
		} catch (e) {}

		Bbska.searchDOM.focus();
		return true;
	});

	return Bbska;
};

// Ελέγχεται αν πατήθηκε [Enter] στο prompt της γραμμής και αν ναι,
// τότε απλώς περνάμε στo πεδίο τιμής της συγκεκριμένης γραμμής.

Bbska.editEnterKey = function(e, fld) {
	if (e.which !== 13)
	return false;

	if (e.shiftKey)
	return false;

	e.stopPropagation();
	e.preventDefault();
	fld.closest('tr').find('.editVal').focus();
	return true;
};

// Ελέγχεται αν πατήθηκε [Enter] στο propmpt της γραμμής και αν ναι,
// τότε ελέγχουμε αν το prompt, ή η τιμή της συγκεκριμένης γραμμής
// περιέχει κάτι. Αν ναι, τότε περνάμε στην επόμενη γραμμή, αλλιώς
// προχωρούμε στην καταχώρηση (save).

Bbska.editEnterVal = function(e, fld) {
	if (e.which !== 13)
	return false;

	if (e.shiftKey)
	return false;

	if (fld.val() || fld.closest('tr').find('.editKey').val()) {
		e.which = 9;
		e.shiftKey = false;
		return false;
	}

	e.stopPropagation();
	fld.closest('.editForma').find('.editSaveButton').trigger('click');
	return true;
};

Bbska.editPisoTab = function(e, fld) {
	var dom, pedio, plist, i;

	if (e.which !== 9)
	return false;

	if (!e.shiftKey)
	return false;

	dom = fld.closest('tbody');
	pedio = fld[0];

	// Αν το πεδίο δεν είναι το πρώτο της φόρμας, τότε πρέπει
	// να «πηδήξουμε» το delete button της προηγούμενης γραμμής
	// και να πάμε στο προηγούμενο val field.

	if (pedio !== dom.find('.editKey').first()[0]) {
		plist = dom.find('.editKey,.editVal');
		for (i = 0; i < plist.length; i++) {
			if (plist[i] !== pedio)
			continue;

			$(plist[i - 1]).focus();
			e.preventDefault();
			break;
		}

		return false;
	}

	dom.find('.editVal').last().focus();
	e.preventDefault();
	e.stopPropagation();

	return true;
};

Bbska.editBrosTab = function(e, fld) {
	var dom , pedio, plist, i, trDOM, val;

	if (e.which !== 9)
	return false;

	if (e.shiftKey)
	return false;

	dom = fld.closest('tbody');
	pedio = fld[0];

	// Αν το πεδίο δεν είναι το τελευταίο της φόρμας, τότε πρέπει
	// να «πηδήξουμε» το delete button και να πάμε στο επόμενο
	// key field.

	if (pedio !== dom.find('.editVal').last()[0]) {
		plist = dom.find('.editKey,.editVal');
		for (i = 0; i < plist.length; i++) {
			if (plist[i] !== pedio)
			continue;

			$(plist[i + 1]).focus();
			e.preventDefault();
			break;
		}

		return false;
	}

	trDOM = fld.closest('tr');

	val = '';
	trDOM.find('.editKey,.editVal').each(function() {
		val += $(this).val();
		return true;
	});

	if (!val) {
		trDOM.closest('.editForma').find('.editSaveButton').focus();
		e.preventDefault();
		return false;
	}

	trDOM.find('.editDelete').css('visibility', 'visible');
	trDOM.find('.editHandle').css('visibility', 'visible');

	dom.append($('<tr>').
	append($('<td>').append(fld = $('<textarea>').addClass('editKey'))).
	append($('<td>').css('visibility', 'hidden').append($('<div>').addClass('editHandle').html('&#x2725;'))).
	append($('<td>').append($('<textarea>').addClass('editVal'))).
	append($('<td>').append($('<input>').prop('type', 'button').
	addClass('editDelete').css('visibility', 'hidden').val('Delete'))));

	fld.focus();
	e.preventDefault();
	return true;
};

Monada.prototype.diagrafi = function() {
	var monada = this, dom, goneas, goneasImage;

	dom = this.getDOM();
	goneas = dom.parent().closest('.monada').data('monada');

	if (!goneas)
	return this;

	if (Bbska.imageMode()) {
		if (Bbska.oxiImage(goneas.kodikos))
		return this;

		goneasImage = Bbska.image[goneas.kodikos];
	}

	$.post('bbska.php', {
		action: 'diagrafi',
		monada: this.kodikos,
		goneas: goneas.kodikos,
	}, function(data) {
		var tlist;

		if (data !== Selida.okrsp)
		return;

		monada.DOM.remove();
		goneas.
		deleteTekno(monada.kodikos).
		teknoDraggable().
		bbskaRefreshDOM();

		if (Bbska.databaseMode())
		return;

		tlist = [];
		Globals.awalk(goneasImage.t, function(i, k) {
			if (k !== monada.kodikos)
			tlist.push(k);
		});

		goneasImage.t = tlist;

		Bbska.imageOrfanaCleanup();
	});

	return this;
};

Bbska.imageOrfanaCleanup = function() {
	var tlist = {}, dirty;

	// Καταχωρούμε στη λίστα "tlist" τους κωδικούς των μονάδων
	// που εμφανίζονται ως τέκνα άλλων μονάδων. Σκοπός είναι
	// να διαγράψουμε όλες τις μονάδες που είναι ορφανές, ήτοι
	// τις μονάδες που δεν θα είναι στη λίστα "tlist".

	Globals.walk(Bbska.image, function(i, monada) {
		if (!monada.hasOwnProperty('t'))
		return;

		Globals.awalk(monada.t, function(i, t) {
			tlist[t] = true;
		});
	});

	// Η ριζική μονάδα είναι δύσκολο να έχει εμφανιστεί ως τέκνο
	// άλλων μονάδων, επομένως την προσθέτουμε με το χέρι καθώς
	// δεν επιθυμούμε τη διαγραφή της.

	tlist[Bbska.rootKodikosGet()] = true;

	// Εκκινούμε τη διαδικασία εκκαθάρισης. Αν βρεθούν ορφανές
	// μονάδες τότε αυτές θα πρέπει να διαγραφούν.

	dirty = false;

	Globals.walk(Bbska.image, function(i, monada) {
		if (tlist.hasOwnProperty(i))
		return;

		delete Bbska.image[i];
		dirty = true;
	});

	// Αν διεγράφησαν ορφανές μονάδες, η διαδικασία θα πρέπει
	// να επαναληφθεί καθώς μπορεί να έχουν προκύψει νέες
	// ορφανές μονάδες.

	if (dirty)
	Bbska.imageOrfanaCleanup();

	return Bbska;
};

Monada.prototype.apokopi = function() {
	var monada = this, dom, goneas, goneasImage;

	dom = this.getDOM();
	goneas = dom.parent().closest('.monada').data('monada');

	if (!goneas)
	return this;

	if (Bbska.imageMode()) {
		if (Bbska.oxiImage(goneas.kodikos))
		return this;

		goneasImage = Bbska.image[goneas.kodikos];
	}

	$.post('bbska.php', {
		action: 'apokopi',
		monada: this.kodikos,
		goneas: goneas.kodikos,
		kalathi: Bbska.kalathi.kodikos,
	}, function(data) {
		var tlist;

		if (data !== Selida.okrsp)
		return;

		Bbska.kalathi.teknoPush(monada);

		monada.DOM.remove();
		goneas.
		deleteTekno(monada.kodikos).
		teknoDraggable().
		bbskaRefreshDOM();

		Bbska.pasteRefresh();

		if (Bbska.databaseMode())
		return;

		tlist = [];
		Globals.awalk(goneasImage.t, function(i, k) {
			if (k !== monada.kodikos)
			tlist.push(k);
		});

		goneasImage.t = tlist;
	});

	return this;
};

Monada.prototype.sindesi = function() {
	var monada = this;

	$.post('bbska.php', {
		action: 'sindesi',
		monada: this.kodikos,
	}, function(data) {
		if (data !== Selida.okrsp)
		return;

		Bbska.kalathi.teknoPush(monada);
		Bbska.pasteRefresh();
	});

	return this;
};

Monada.prototype.ensomatosi = function() {
	var monada = this, monadaImage;

	if (Bbska.imageMode()) {
		if (Bbska.oxiImage(this.kodikos))
		return this;

		monadaImage = Bbska.image[this.kodikos];
	}

	$.post('bbska.php', {
		action: 'ensomatosi',
		goneas: this.kodikos,
	}, function(data) {
		var tlist, tlist2;

		if (!data)
		return;

		try {
			tlist = data.evalAsfales();
		} catch (e) {
			return console.error('bbska.php::ensomatosi: ' + data);
		}

		Globals.awalk(tlist, function(i, tekno) {
			tekno = new Monada(tekno).fix();
			monada.teknoPush(tekno);
			monada.teknoDOM.prepend(tekno.getDOM());
			Bbska.kalathi.teknoDelete(tekno);
		});

		monada.
		teknoDraggable().
		bbskaRefreshDOM(true);

		Bbska.pasteRefresh();

		if (Bbska.databaseMode())
		return;

		tlist2 = [];

		Globals.klawa(tlist, function(i, t) {
			tlist2.push(t.kodikos);
		});

		Globals.awalk(monadaImage.t, function(i, k) {
			tlist2.push(k);
		});

		monadaImage.t = tlist2;
	});
};

Monada.prototype.epikolisi = function() {
	var monada = this, dom, goneas, goneasImage;

	dom = this.getDOM();
	goneas = dom.parent().closest('.monada').data('monada');

	if (!goneas)
	return this;

	if (Bbska.imageMode()) {
		if (Bbska.oxiImage(goneas.kodikos))
		return this;

		goneasImage = Bbska.image[goneas.kodikos];
	}

	$.post('bbska.php', {
		action: 'epikolisi',
		goneas: goneas.kodikos,
		pivot: this.kodikos,
	}, function(data) {
		var tlist, tlist2;

		if (!data)
		return;

		try {
			tlist = data.evalAsfales();
		} catch (e) {
			return console.error('bbska.php::epikolisi: ' + data);
		}

		Globals.awalk(tlist, function(i, tekno) {
			tekno = new Monada(tekno).fix();
			goneas.teknoPush(tekno);
			tekno.getDOM().insertAfter(monada.DOM);
			Bbska.kalathi.teknoDelete(tekno);
		});

		goneas.
		teknoDraggable().
		bbskaRefreshDOM(true);

		Bbska.pasteRefresh();

		if (Bbska.databaseMode())
		return;

		tlist2 = [];

		Globals.awalk(goneasImage.t, function(i, k) {
			tlist2.push(k);

			if (k !== monada.kodikos)
			return;

			Globals.awalk(tlist, function(i, t) {
				tlist2.push(t.kodikos);
			});
		});

		goneasImage.t = tlist2;

	});

	return this;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////@

Bbska.isPaste = function() {
	if (!Bbska.kalathi)
	return false;

	return Bbska.kalathi.tekno.length;
};

Bbska.pasteRefresh = function() {
	$('.monadaPanel').each(function() {
		var monada;

		monada = $(this).parent().data('monada');

		if (!monada)
		return true;

		monada.panelRefreshDOM();
		return true;
	});

	return Bbska;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////@

Bbska.expandPrepare = function(root, mlist) {
	root.teknoWalk(function() {
		if (this.isAplomeni())
		return Bbska.expandPrepare(this, mlist);

		// Στη διαδικασία expand ανοίγουμε και τις neutral
		// μονάδες, ώστε να παρέχουμε εναλλακτικές μεθόδους
		// πλήρους ιστιοφορίας. Αν πλήρη ιστιοφορία με τις
		// neutral μονάδες κλειστές, τότε επιτελούμε explode,
		// αλλιώς επιτελούμε διαδοχικά expand.

		if (this.isTerminal())
		return true;

		if (this.isAtermon())
		return true;

		mlist.push(this);
		return true;
	});

	return Bbska;
};

Bbska.expandExec = function(mlist, button) {
	if (!Bbska.expanding)
	return Bbska;

	if (!mlist.length)
	return Bbska.expandEnd();

	mlist[0].aploma(function() {
		Bbska.expandExec(mlist.slice(1), button);
	});

	return Bbska;
};

Bbska.expandEnd = function() {
	Bbska.expandButtonReset();
	delete Bbska.expanding;

	return Bbska;
};

Bbska.expandButtonReset = function(button) {
	Bbska.expandDOM.
	removeClass('cpanelButtonEmfanes').
	attr({
		src: 'ikona/cpanel/expand.png',
		title: 'Expand',
	});

	return Bbska;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////@

Bbska.explode = function() {
	var mlist;

	// Το array "mlist" θα πληρωθεί με τις μονάδες που πρόκειται
	// να αναπτυχθούν στην παρούσα φάση.

	mlist = [];

	// Μαζεύουμε όλες τις μπάμπουσκες και μέσω αυτών προσπελαύνουμε
	// τις αντίστοιχες μονάδες.

	$('.bbska').each(function() {
		var monada;

		// Αν δεν μπορούμε από την μπάμπουσκα να προσπελάσουμε τη
		// σχετική μονάδα, τότε προχωρούμε στην επόμενη μπάμπουσκα.

		if (!(monada = $(this).parent().data('monada')))
		return true;

		// Αν η μονάδα είναι ήδη απλωμένη, τότε προχωρούμε στην επόμενη
		// μπάμπουσκα.

		if (monada.aplomeni)
		return true;

		// Σε περίπτωση που η μονάδα είναι τερματική, τότε σταματάμε τη
		// διαδικασία, εκτός και αν πρόκειται για τη ριζική μονάδα της
		// σελίδας, οπότε τη θεωρούμε μη τερματική.

		if (monada.isTerminal() && monada.oxiRoot())
		return true;

		if (monada.isNeutral())
		return true;

		if (monada.isAtermon())
		return true;

		// Εντάσσουμε τη μονάδα στις προς ανάπτυξη μονάδες και προχωρούμε
		// στην επόμενη μπάμπουσκα.

		mlist.push(monada);
		return true;
	});

	// Αν εντοπίστηκαν μονάδες προς ανάπτυξη, τότε προχωρούμε στην ανάπτυξη.

	if (mlist.length)
	Bbska.explodeMore(mlist);

	// Αλλιώς τερματίζουμε την εκρηκτική διαστολή.

	else
	Bbska.explodeEnd();

	return Bbska;
};

Bbska.explodeMore = function(mlist) {
	if (!Bbska.exploding)
	return Bbska;

	// Αν η τρέχουσα λίστα έχει εξαντληθεί, τότε επιχειρούμε
	// εκ νέου εκρηκτική διαστολή. Αυτό θα συνεχιστεί μέχρις
	// ότου όλες οι μπάμπουσκες στη σελίδα να αφορούν σε ήδη
	// ανεπτυγμένες μονάδες.

	if (!mlist.length)
	return Bbska.explode();

	// Αναπτύσσουμε την πρώτη μονάδα της λίστας και όταν αυτή
	// αναπτυχθεί, προχωρούμε αλυσιδωτά στην ανάπτυξη των
	// υπολοίπων.

	mlist[0].aploma(function() {
		Bbska.explodeMore(mlist.slice(1));
	});

	return Bbska;
};

Bbska.explodeEnd = function() {
	Bbska.explodeButtonReset();
	delete Bbska.exploding;

	return Bbska;
};

Bbska.explodeButtonReset = function() {
	Bbska.explodeDOM.
	removeClass('cpanelButtonEmfanes').
	attr({
		src: 'ikona/cpanel/panoramiki.png',
		title: 'Explode! (Control-X)',
	});

	return Bbska;
};

Bbska.mazema = function() {
	if (Bbska.root.aplomeni)
	Bbska.root.teknoWalk(function() {
		this.mazema();
		return true;
	});

	else
	Bbska.root.aploma();

	Bbska.trenoClear();
	return Bbska;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////@

Bbska.searchInit = function() {
	Bbska.spanelDOM.css('display', 'none');
	$('.monadaDataTarget').removeClass('monadaDataTarget');
	$('.attrTarget').removeClass('attrTarget attrTargetCurrent');
	$('.monada').removeClass('monadaTarget monadaEco');
	$('.targetCount').empty();
	Bbska.searchPattern = null;
	Bbska.searchPatternRE = null;
	Bbska.searchTarget = {};
	Bbska.searchArray = [];
	Bbska.searchLista = {};
	Bbska.searchNavigationArray = [];
	Bbska.searchNavigationIndex = 0;

	return Bbska;
};

Bbska.searchInputEnable = function() {
	Bbska.searchDOM.prop('disabled', false);
	return Bbska;
};

Bbska.searchInputDisable = function() {
	Bbska.searchDOM.prop('disabled', true);
	return Bbska;
};

Bbska.searchSubmit = function() {
	Bbska.searchInit();
	Bbska.spanelDOM.removeClass('spanelSearching');

	Bbska.searchPattern = Bbska.searchDOM.val().trim();
	Bbska.searchDOM.val(Bbska.searchPattern).focus();

	Bbska.onlineMatchContainerDOM.children('.onlineMatchTrexon').each(function() {
		Bbska.searchPattern = $(this).data('pat').replace(/[()&?^$\[\]!-]/g, '.');
		return false;
	});
	Bbska.onlineMatchOff();

	if (!Bbska.searchPattern) {
		if (Bbska.isEco())
		Bbska.attrPhotoResize();

		return Bbska;
	}

	// Μετατρέπουμε το search pattern σε regular expression.

	Bbska.searchPattern2RE();

	// Θέτουμε τη σελίδα σε φάση «απομεμακρυσμένης» αναζήτησης κάνοντας
	// φανερό στο χρήστη ότι το πρόγραμμα είναι απασχολημένο με την
	// αναζήτηση στον server των μονάδων που πληρούν το κριτήριο
	// αναζήτησης.

	Bbska.searchButtonDOM.patima();
	Bbska.searchInputDisable();
	Bbska.spanelDOM.addClass('spanelSearching');

	// Σε παλαιότερες εκδόσεις του προγράμματος η απομεμακρυσμένη αναζήτηση
	// αφορούσε σε απευθείας αναζήτηση στην database, αλλά πλέον αφορά σε
	// τοπικές αναζητήσεις στο local image.

	Bbska.searchImage();

	return Bbska;
};

Bbska.searchImage = function(monada) {
	var monadaImage, res, p, i, a;

	if (monada === undefined)
	return setTimeout(function() {
		var x;

		Bbska.searchImageVisited = {};
		x = Bbska.searchImage(Bbska.root.kodikos);
		Bbska.
		searchFix([ x ]).
		searchExpand(0);
	}, 0);

	// Αποφεύγουμε ατέρμονες καταστάσεις.

	if (Bbska.searchImageVisited.hasOwnProperty(monada))
	return undefined;

	Bbska.searchImageVisited[monada] = true;

	res = {
		k: monada,
		t: [],
	};

	if (Bbska.oxiImage(monada))
	return res;

	monadaImage = Bbska.image[monada];

	if (monadaImage.hasOwnProperty('a'))
	for (i = 0; i < monadaImage.a.length; i++) {
		a = monadaImage.a[i];
		if (a.k.match(Bbska.searchPatternRE) || a.v.match(Bbska.searchPatternRE)) {
			res.s = 1;
			break;
		}
	}

	res.t = [];
	if (monadaImage.hasOwnProperty('t'))
	for (i = 0; i < monadaImage.t.length; i++) {
		p = Bbska.searchImage(monadaImage.t[i]);

		// Εντάσσουμε τη μονάδα ως τέκνο για περαιτέρω έλεγχο
		// μόνον εφόσον δεν έχει επιστραφεί undefined, πράγμα
		// που θα σήμαινε ότι έχουμε ήδη ελέγξει από αυτή τη
		// μονάδα και κάτω.

		if (p)
		res.t.push(p);
	}

	return res;
};

Bbska.searchLocate = function() {
	var found = false;

	if (Bbska.searchPatternRE)
	$('.monada').each(function() {
		var monada, ok;

		monada = $(this).data('monada');

		if (!monada)
		return true;

		ok = false;
		monada.attrWalk(function() {
			var tok;

			tok = new Token(this.keyGet());
			if (tok.isNormal() && tok.text.match(Bbska.searchPatternRE)) {
				ok = true;
				return false;
			}

			tok = new Token(this.valGet());
			if (tok.isNormal() && tok.text.match(Bbska.searchPatternRE)) {
				ok = true;
				return false;
			}

			return true;
		});

		if (!ok)
		return true;

		found = true;
		Bbska.searchTarget[monada.kodikos] = true;
		monada.dataRefreshDOM();
		return true;
	});

	if (found) {
		Bbska.spanelDOM.css('display', 'block');
		Bbska.searchNavigation();
		return Bbska;
	}

	Bbska.spanelDOM.css('display', 'none');
	return Bbska;
}

Bbska.searchPattern2RE = function() {
	Bbska.searchPatternRE = Bbska.searchPattern.atore();
	return Bbska;
};

// Κύριος σκοπός της "searchFix" είναι να αποκόψει από τα αποτελέσματα της
// αναζήτησης εκείνες τις διαδρομές στις οποίες δεν περιέχονται ευρήματα.
// Η διαδικασία είναι recursive και δέχεται ως παράμετρο ένα array κόμβων
// αρχικού επιπέδου. Παράλληλα ελέγχονται οι αρχικοί κόμβοι αν οι ίδιοι
// αποτελούν ευρήματα και μαρκάρονται σχετικά.

Bbska.searchFix = function(x, inner) {
	// Διατρέχονται οι αρχικοί κόμβοι ένας προς ένας.

	Globals.awalk(x, function(i, m) {
		// Αν ο ίδιος ο αρχικός κόμβος αποτελεί εύρημα, μαρκάρεται
		// σχετικά ώστε να εμφανίζεται με έντονα χρώματα στη σελίδα.

		if (m.s)
		Bbska.searchTarget[m.k] = 1;

		// Αν δεν υπάρχουν ευρήματα στους απογόνους τού ανά χείρας
		// κόμβου, προχωρούμε στον επόμενο κόμβο.

		if (!Bbska.searchSuccessor(m))
		return;

		// Ο κόμβος βρέθηκε να έχει ευρήματα στους απογόνους του και
		// επομένως μαρκάρεται σχετικά και τοποθετείται στο array
		// κόμβων που θα ανοιχτούν στη σελίδα των ευρημάτων.

		if (!Bbska.searchLista.hasOwnProperty(m.k)) {
			Bbska.searchLista[m.k] = 1;
			Bbska.searchArray.push(m.k);
		}

		// Εφόσον βρέθηκαν ευρήματα στους απογόνους του ανά χείρας κόμβου,
		// επαναλαμβάνουμε τη διαδικασία για τους απογόνους πρώτου επιπέδου
		// του κόμβου αυτού.

		Bbska.searchFix(m.t, true);
	});

	if (inner)
	return Bbska;

	if (!Bbska.searchArray.length)
	return Bbska;

	Bbska.spanelDOM.css('display', 'block');
	Bbska.onlineMatchOff();

	return Bbska;
};

// Η function "searchSuccessor" δέχεται έναν κόμβο και ελέγχει για τυχόν ευρήματα
// στους απογόνους. Αν εντοπίσει ευρήματα στους απογόνους επιστρέφει true, αλλιώς
// επιστρέφει false.

Bbska.searchSuccessor = function(m) {
	var success = false;

	Globals.awalk(m.t, function(i, t) {
		if (t.s) {
			Bbska.searchTarget[t.k] = 1;
			success = true;
		}

		if (Bbska.searchSuccessor(t))
		success = true;
	});

	return success;
};

Bbska.searchExpand = function(from) {
	if (from === Bbska.searchArray.length)
	return setTimeout(function() {
		Bbska.ecoFilter();
		Bbska.spanelDOM.removeClass('spanelSearching');
		Bbska.searchNavigation();
	}, 0);

	$('.monada').each(function() {
		var monada;

		monada = $(this).data('monada');

		if (!monada)
		return true;

		if (monada.kodikos !== Bbska.searchArray[from])
		return true;

		monada.aploma(function() {
			Bbska.searchExpand(from + 1);
		});

		return false;
	});

	return Bbska;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////@

Bbska.searchNavigation = function() {
	Bbska.searchInputEnable();
	Bbska.root.dataRefreshDOM();

	Bbska.searchNavigationArray = [];
	Bbska.searchNavigationIndex = 0;

	$('.attrTarget').each(function() {
		$(this).data('navidx', Bbska.searchNavigationArray.push($(this)) - 1);
		return true;
	});

	if (Bbska.searchNavigationArray.length)
	setTimeout(function() {
		Bbska.searchNavigate();
	}, 0);

	return Bbska;
};

Bbska.searchNavigate = function(scroll) {
	var attrDOM;

	if (scroll === undefined)
	scroll = true;

	$('.attrTargetCurrent').removeClass('attrTargetCurrent');

	attrDOM = Bbska.searchNavigationArray[Bbska.searchNavigationIndex];
	attrDOM.addClass('attrTargetCurrent');

	Bbska.targetCntPrvDOM.text(Bbska.searchNavigationIndex);
	Bbska.targetCntNxtDOM.text(Bbska.searchNavigationArray.length - Bbska.searchNavigationIndex - 1);

	if (scroll)
	$(document).scrollTop(attrDOM.closest('.monada').offset().top - 50);

	return Bbska;
};

Bbska.searchNavigatePrv = function() {
	if (!Bbska.searchNavigationArray.length)
	return Bbska;

	Bbska.searchNavigationIndex--;

	if (Bbska.searchNavigationIndex < 0)
	Bbska.searchNavigationIndex = Bbska.searchNavigationArray.length - 1;

	Bbska.searchNavigate();
	return Bbska;
};

Bbska.searchNavigateCur = function() {
	if (!Bbska.searchNavigationArray.length)
	return Bbska;

	Bbska.searchNavigate();
	return Bbska;
};

Bbska.searchNavigateNxt = function() {
	if (!Bbska.searchNavigationArray.length)
	return Bbska;

	Bbska.searchNavigationIndex++;

	if (Bbska.searchNavigationIndex >= Bbska.searchNavigationArray.length)
	Bbska.searchNavigationIndex = 0;

	Bbska.searchNavigate();
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////@

Bbska.modeSetUpdate = function() {
	var root;

	Bbska.updateMode = true;

	// Όταν είμαστε σε zoom σελίδα και περνάμε σε update mode, τότε
	// είναι σώφρον να αποκόψουμε τη σελίδα από τη μητρική της.

	if (Bbska.oxiZoom())
	return Bbska;

	// Διαπιστώσαμε ότι είμαστε σε zoom σελίδα και θα πρέπει να
	// εντοπίσουμε την εγγραφή μας στο μητρώο zoom σελίδων στη
	// μητρική σελίδα.

	root = Bbska.rootKodikosGet();

	// Θέτουμε την παρούσα σελίδα ως «πειραγμένη» στο μητρώο zoom
	// σελίδων της μητρικής σελίδας.

	self.opener.Bbska.zoomWindow[root].piragmeno = true;

	return Bbska;
};

Bbska.modeSetInquire = function() {
	Bbska.updateMode = false;
	return Bbska;
};

Bbska.modeIsUpdate = function() {
	return Bbska.updateMode;
};

Bbska.modeIsInquire = function() {
	return !Bbska.modeIsUpdate();
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////@

// Ακολουθούν info functions που αφορούν στην εμφάνιση/απόκρυψη των στοιχείων
// ταυτότητας των πληροφοριακών μονάδων. Στοιχεία ταυτότητας μιας μονάδας
// λογίζονται ο κωδικός και η ιδιωτικότητα της μονάδας.

Bbska.isInfo = function() {
	return Bbska.info;
}

Bbska.infoToggle = function() {
	if (Bbska.isInfo()) {
		Bbska.info = false;
		$('.monadaHeaderRow').removeClass('monadaHeaderRowInfo');
		$('.monadaHandler').removeClass('monadaHandlerInfo');
	}

	else {
		Bbska.info = true;
		$('.monadaHeaderRow').addClass('monadaHeaderRowInfo');
		$('.monadaHandler').addClass('monadaHandlerInfo');
	}

	return Bbska;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////@

// Ακολουθούν eco functions που αφορούν στην «οικονομική» εμφάνιση αποτελεσμάτων
// αναζήτησης. Αλλά τι σημαίνει «οικονομική» εμφάνιση αποτελεσμάτων αναζήτησης;
// Ως γνωστόν, όταν εκτελούμε κάποια αναζήτηση τα αποτελέσματα προβάλλονται από
// το πρόγραμμα μαζί με τα siblings τους. Αν επιλέξουμε «οικονομική» εμφάνιση,
// τότε εμφανίζονται μόνο οι μονάδες που πληρούν το κριτήριο αναζήτησης.

Bbska.isEco = function() {
	return Bbska.eco;
}

Bbska.oxiEco = function() {
	return !Bbska.isEco();
}

Bbska.ecoToggle = function() {
	Bbska.eco = !Bbska.eco;

	Bbska.
	ecoRefreshDOM().
	ecoFilter().
	searchNavigateCur();

	return Bbska;
};

Bbska.ecoRefreshDOM = function() {
	if (Bbska.eco)
	Bbska.ecoDOM.attr({
		title: 'Expand results (Control-Y)',
		src: 'ikona/spanel/ecoTrue.png',
	});

	else
	Bbska.ecoDOM.attr({
		title: 'Squeeze results',
		src: 'ikona/spanel/ecoFalse.png',
	});

	return Bbska;
};

Bbska.ecoFilter = function() {
	if (Bbska.oxiEco()) {
		$('.monadaEco').removeClass('monadaEco');
		Bbska.attrPhotoResize();
	}

	else {
		$('.monada').addClass('monadaEco');
		$('.monadaTarget').removeClass('monadaEco').
		parents('.monada').removeClass('monadaEco');
	}
	
	return Bbska;
};
