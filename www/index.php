<?php
require_once("lib/selida.php");
Selida::head();
Selida::stylesheet("bbska");
Selida::stylesheet("print", "print");
Selida::javascript("common/object");
Selida::javascript("bbska");
setup();
Selida::body();
Selida::toolbar();
Selida::ofelimo();
Selida::telos();

function setup() {
	// Με την παράμετρο "root" καθορίζεται ο αρχικός κόμβος της σελίδας. Αν δεν
	// έχει καθοριστεί παράμετρος "root", τότε τίθεται ο αρχικός κόμβος του
	// χρήστη εφόσον γίνεται επώνυμη χρήση, αλλιώς τίθεται ο κόμβος με κωδικό
	// αριθμό δύο (2).

	if (array_key_exists("root", $_REQUEST)) {
		Selida::javascript_begin();
		?>Bbska.root = <?php print intval($_REQUEST["root"]); ?>;<?php
		Selida::javascript_end();
	}

	// Η παράμετρος "zoom" εφόσον υπάρχει υποδηλώνει τον κόμβο από τον οποίο
	// έχουμε κάνει zoom σε νέα σελίδα. Η παράμετρος zoom δεν επηρεάζει σημαντικά
	// τη σελίδα, παρέχει ωστόσο τη δυνατότητα στο χρήστη να κλείσει τη σελίδα
	// μέσω κατάλληλου tab.

	if (array_key_exists("zoom", $_REQUEST)) {
		Selida::javascript_begin();
		?>Bbska.zoom = <?php print intval($_REQUEST["zoom"]); ?>;<?php
		Selida::javascript_end();
	}

	// Η παράμετρος "chain" μοιάζει με την παράμετρο "zoom" με την έννοια ότι
	// έχουμε κάνει zoom σε νέα σελίδα. Ωστόσο το περιεχόμενο της σελίδας είναι
	// άσχετο με το περιεχόμενο της σελίδας αφετηρίας και λαμβάνεται εκ νέου από
	// τον server. Η τιμή της παραμέτρου δείχνει τον κωδικό του κόμβου από τον
	// οποίο εκκίνησε το chain zoom και μπορεί να συνοδεύεται από άλλες URL
	// παραμέτρους πχ:
	//
	//	2596&info&eco
	//
	// Μπορούμε, εντούτοις, να χρησιμοποιήσουμε την παράμετρο "chain" και ως
	// link στο οποίο θα μεταβούμε κάνοντας κλικ στο εικονίδιο "new page".
	// Για να χρησιμοποιήσουμε τη παράμετρο "chain" ως γενικότερο link, αρκεί
	// δώσουμε ως τιμή τη διεύθυνση της σχετικής σελίδας.

	if (array_key_exists("chain", $_REQUEST)) {
		Selida::javascript_begin();
		?>Bbska.chain = <?php print Globals::asfales_json($_REQUEST["chain"]); ?>;<?php
		Selida::javascript_end();
	}

	// Η παράμετρος "search" δίνει τη δυνατότητα καθορισμού αρχικής τιμής στο
	// πεδίο αναζήτησης χωρίς, όμως, η αναζήτηση να εκκινεί αυτόματα.

	if (array_key_exists("search", $_REQUEST)) {
		Selida::javascript_begin();
		?>Bbska.search = <?php print Globals::asfales_json($_REQUEST["search"]); ?>;<?php
		Selida::javascript_end();
	}

	// Η παράμετρος "explode" εφόσον υπάρχει προκαλεί αυτόματη πλήρη ανάπτυξη
	// του ριζικού κόμβου.

	if (array_key_exists("explode", $_GET))
	$_REQUEST["explode"] = $_GET["explode"];

	if (array_key_exists("explode", $_REQUEST)) {
		Selida::javascript_begin();
		?>Bbska.explosive = <?php
			switch ($_REQUEST["explode"]) {
			case "no":
			case "NO":
			case "No":
			case "nO":
			case "0":
				print "false";
				break;
			default:
				print "true";
				break;
			}
		?>;<?php
		Selida::javascript_end();
	}

	// Η παράμετρος "crude" ακυρώνει το animation στο άπλωμα και στο μάζεμα
	// των μονάδων.

	if (array_key_exists("crude", $_REQUEST)) {
		Selida::javascript_begin();
		?>Bbska.crude = true;<?php
		Selida::javascript_end();
	}

	// Η παράμετρος "imgdepo" περιέχει το URL ιστοτόπου στον οποίο ο χρήστης
	// θα ανεβάζει εικόνες μέσω της κάμερας που παρέχεται στο side panel.

	Selida::javascript_begin();
	?>Bbska.imgdepo = <?php print Globals::asfales_json(array_key_exists("imgdepo", $_REQUEST) ?
		$_REQUEST["imgdepo"] : IMGDEPO); ?>;<?php
	Selida::javascript_end();

	favicon_list();
}

// Στο directory "favicon" κάτω από το directoy "ikona" υπάρχουν αρκετά
// αρχεία εικόνας τύπου PNG. Αυτά μπορούν να χρησιμοποιηθούν ως εικονίδια
// μπάμπουσκας στις πληροφοριακές μονάδες παραθέτοντας το όνομα των αρχείων
// αυτών ως attribute με κωδικό "_icon_", π.χ. "warning", "lamp" κλπ.
// Προκειμένου, λοιπόν, να μπορεί ο χρήστης να επιλέξει με εύκολο τρόπο
// ένα από αυτά τα εικονίδια, περνάμε τα ονόματα των αρχείων αυτών ως
// array "iconList" στο javascript πρόγραμμα που οδηγεί τη βασική σελίδα
// της εφαρμογής. Περνάμε, επίσης, και το όνομα του directory μέσω της
// μεταβλητής "iconDir".

function favicon_list() {
	$l = scandir(FAVICON_DIR);
	Selida::javascript_begin();
	?>
	Bbska.iconDir = <?php print Globals::asfales_json(FAVICON_DIR); ?>;
	Bbska.iconList = [<?php
	for ($i = count($l) - 1; $i >= 0; $i--) {
		$f = FAVICON_DIR . $l[$i];
		if (is_file($f))
		print Globals::asfales_json($l[$i]) . ",";
	}
	?>
	];
	<?php
	Selida::javascript_end();
}
?>
