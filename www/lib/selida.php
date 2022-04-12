<?php
// Το παρόν περιέχει την κλάση "Selida" που αφορά στην κατασκευή ιστοσελίδων του ιστοτόπου.
// Το αρχείο γίνεται "include" σε όλες τις ιστοσελίδες και αφού διασφαλίσουμε ότι έχουμε
// διαβασμένα τα βασικά εργαλεία, ενεργοποιούμε by default το session.

if (!class_exists("Globals"))
require_once "standard.php";

$sport = preg_replace("/[^0-9]/", "", file_get_contents(Globals::$dir . "site/sport"));
if (!$sport)
Globals::klise_fige("Αδυναμία αναγνώρισης πόρτας server σκηνικού");
Globals::$skiser .= ":" . $sport . "/";

Globals::session_init();

// Η κλάση "Selida" χρησιμοποιείται ως name space και όλες οι μέθοδοι είναι static.

class Selida {
	public static function head() {
		// Πριν προχωρήσουμε στην κατασκευή της σελίδας, ελέγχουμε τη ριζική
		// πληροφοριακή μονάδα. Αυτή είτε έχει καθοριστεί στο URL, είτε λαμβάνεται
		// από τα στοιχεία του χρήστη εφόσον έχουμε επώνυμη χρήση, αλλιώς τίθεται
		// στην default ριζική μονάδα του συστήματος που απλώς μας καλωσορίζει.

		self::root_set();
		$monada = Bbska::get_monada($_REQUEST["root"]);

		// Εφόσον εντοπίστηκε η ριζική πληροφοριακή μονάδα, προχωρούμε στην
		// ανίχνευση συστημικών παραμέτρων της ριζικής μονάδας που καθορίζουν
		// συστημικά στοιχεία της σελίδας, π.χ. τίτλος σελίδας, favicon κοκ.

		if (isset($monada))
		for ($i = count($monada->alist) - 1; $i >= 0; $i--) {
			$attr = $monada->alist[$i];
			switch ($attr->key) {
			case "_icon_":
				if (!array_key_exists("icon", $_REQUEST))
				$_REQUEST["icon"] = $attr->val;
				break;
			case "_title_":
				if (!array_key_exists("title", $_REQUEST))
				$_REQUEST["title"] = $attr->val;
				break;
			case "_explode_":
				$_REQUEST["explode"] = "yes";
				break;
			}
		}

		if (array_key_exists("icon", $_REQUEST)) {
			$favicon = $_REQUEST["icon"];

			$icon = Globals::$www . "ikona/favicon/" . $favicon . ".png";

			if (file_exists($icon))
			$icon = Globals::$server . "ikona/favicon/" . $favicon . ".png";

			else
			$icon = $favicon;
		}

		else {
			$favicon = NULL;
			$icon = Globals::$server . "ikona/misc/bbska.png";
		}

		if (array_key_exists("title", $_REQUEST))
		$titlos = $_REQUEST["title"];

		else if (array_key_exists("zoom", $_REQUEST) && array_key_exists("root", $_REQUEST))
		$titlos = $_REQUEST["root"];

		else
		$titlos = "bbska";

		Globals::header_html();
		?>
		<!DOCTYPE html>
		<html>
		<head>

		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="description" content="Store your data the bbska way!" />
		<meta name="keywords" content="bbska,babushka,matryoshka" />
		<meta name="author" content="<?php print OWNER_ONOMA; ?>" />
		<meta name="copyright" content="Copyright by <?php print OWNER_ONOMA; ?>. All Rights Reserved." />

		<?php
		if (Globals::is_cert()) {
			?><meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"><?php
		}
		?>

		<link rel="canonical" href="<?php print PRODUCTION_URL; ?>" />
		<link rel="icon" type="image/png" href="<?php print $icon; ?>" />
	  	<title><?php print $titlos; ?></title>

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
		<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css" />
		<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>

		<?php
		self::stylesheet('lib/selida');
		self::javascript('common/globals');
		self::javascript('lib/selida');
		self::javascript_begin();

		if ($titlos)
		print "Selida.title = " . Globals::asfales_json($titlos) . ";";

		if ($favicon)
		print "Selida.favicon = " . Globals::asfales_json($favicon) . ";";

		// Κάποιες φορές χριεάζεται να περάσουμε τις παραμέτρους του URL από
		// τη μια σελίδα σε άλλη την οποία θα φορτώσουμε μέσω της javascript.
		// Για το σκοπό αυτό κρατάμε τις παραμέτρους του URL σε λίστα.

		print "Selida.urlParam = {};";
		foreach ($_GET as $get_key => $get_val)
		print "Selida.urlParam['" . urlencode($get_key) . "'] = '" . urlencode($get_val) . "';";

		?>
		Selida.icon = '<?php print $icon; ?>';
		Selida.server = '<?php print Globals::$server; ?>';
		Selida.skiser = '<?php print Globals::$skiser; ?>';
		Selida.timeDif = <?php print time(); ?> - Globals.tora();
		Selida.errsep = '<?php print ERRSEP; ?>';
		Selida.errsepRE = new RegExp('^.*' + Selida.errsep);
		Selida.okrsp = '<?php print OKRSP; ?>';
		Selida.session = {};
		<?php

		foreach ($_SESSION as $key => $val)
		print "Selida.session[" . Globals::asfales_json($key) . "] = " . Globals::asfales_json($val) . ";";

		self::javascript_end();
	}

	// Η private μέθοδος "root_set" αναθέτει στην παράμετρο URL "root" τον
	// κωδικό της ριζικής πληροφοριακής μονάδας.

	private static function root_set() {
		// Αν η παράμετρος υπάρχει ήδη στον πίνακα παραμέτρων URL, τότε
		// απλώς την μετατρέπουμε σε αριθμητική.

		if (array_key_exists("root", $_REQUEST))
		return($_REQUEST["root"] = intval($_REQUEST["root"]));

		// Αν δεν έχουμε επώνυμη χρήση, τότε θεωρούμε ως ριζική πληροφοριακή
		// μονάδα την default ριζική πληροφοριακή μονάδα του συστήματος.
		// Πρόκειται για μονάδα καλωσορίσματος και συνήθως φέρει τον κωδικό 2.

		if (Globals::oxi_login())
		return($_REQUEST["root"] = ROOT_DEFAULT);

		// Διαπιστώσαμε επώνυμη χρήση. Σ' αυτή την περίπτωση πρέπει να
		// εντοπίσουμε τον χρήστη στην database και να θέσουμε ως ριζική
		// πληροφοριακή μονάδα τη ριζική μονάδα του συγκεκριμένου χρήστη.

		$xristis = Bbska::get_xristis($_SESSION["login"]);

		// Αν καταφέραμε να εντοπίσουμε τον χρήστη που φαίνεται να ελέγχει
		// το πρόγραμμα, τότε θέτουμε ως ριζική πληροφοριακή μονάδα τη
		// ριζική μονάδα του χρήστη.

		if (isset($xristis))
		return($_REQUEST["root"] = $xristis->root);

		// Αν δεν καταφέραμε να εντοπίσουμε τον χρήστη που φαίνεται να
		// έχει τον έλεγχο του προγράμματος, τότε κάτι δεν πάει καλά
		// επομένως ακυρώνουμε την επώνυμη χρήση και θέτουμε ως ριζική
		// πληροφοριακή μονάδα την default ριζική μονάδα του συστήματος.

		unset($_SESSION["login"]);
		return($_REQUEST["root"] = ROOT_DEFAULT);
	}

	public static function stylesheet($css, $media = NULL) {
		$file = Globals::$www . $css . ".css";
		if (!file_exists($file))
		return;

		$mtime = filemtime($file);
		?><link rel="stylesheet" type="text/css" <?php

		if ($media) {
			?>media="<?php print $media; ?>" <?php
		}

		?>href="<?php Globals::url($css); ?>.css?mt=<?php
			print $mtime; ?>" /><?php
	}

	// Η μέθοδος "javascript" δέχεται το όνομα ενός JavaScript source file και
	// παράγει το HTML script tag με το οποίο θα ενσωματώσουμε τον κώδικα στη
	// σελίδα μας. Η function προσθέτει το modification timestamp ως παράμετρο
	// στο URL του αρχείου, ώστε να αποφύγουμε το caching σε περίπτωση μεταβολής
	// του αρχείου. Επίσης, ελέγχει αν υπάρχει νεότερη minified version αυτού
	// του αρχείου και αν ναι, τότε προτιμά την minified version. Ως minified
	// version του αρχείου θεωρούμε το ίδιο αρχείο με κατάληξη ".min.js"

	public static function javascript($script) {
		$file = Globals::$www . $script . ".js";
		if (!file_exists($file))
		return;

		$mtime = filemtime($file);
		$file1 = Globals::$www . $script . ".min.js";
		if (file_exists($file1)) {
			$mtime1 = filemtime($file1);
			if ($mtime1 > $mtime) {
				$script .= ".min";
				$mtime = $mtime1;
			}
		}

		?><script type="text/javascript" src="<?php Globals::url($script); ?>.js?mt=<?php
			print $mtime; ?>"></script><?php
	}

	public static function javascript_begin() {
		?>
		<script type="text/javascript">
		//<![CDATA[
		<?php
	}

	public static function javascript_end() {
		?>
		//]]>
		</script>
		<?php
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////@

	public static function body() {
		if (file_exists(Globals::$www . "common/rcLocal.js"))
		Selida::javascript("common/rcLocal");

		if (file_exists(Globals::$www . "rcLocal.js"))
		Selida::javascript("rcLocal");
		?>
		</head>
		<body>
		<?php
	}

	public static function telos() {
		?>
		</body>
		</html>
		<?php
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////@

	public static function tab_begin($opts = array()) {
		?><div class="tab<?php
		if (array_key_exists("left", $opts))
		print " tabLeft";
		elseif (array_key_exists("right", $opts))
		print " tabRight";
		?>"<?php
		if (array_key_exists("id", $opts))
		print " id=" . $opts["id"];
		?>><?php
	}

	public static function tab_end() {
		?></div><?php
	}

	public static function tab($s) {
		self::tab_begin();
		print $s;
		self::tab_end();
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////@

	// Η μέθοδος "toolbar" προετοιμάζει το toolbar στο επάνω μέρος της σελίδας. Μπορούμε να
	// περάσουμε λίστα με options:
	//
	//	titlos		Είναι ο τίτλος που θα εμφανιστεί στην κεντρική περιοχή του toolbar.
	//			By default τίθεται "bbska".
	//
	//	link		Είναι το link που μπορούμε να σχετίσουμε με τον τίτλο. Αν χρησιμοποιηθεί
	//			ο default τίτλος, τότε τίθεται link στο "Κέντρο Υποστήριξης".

	public static function toolbar($options = array()) {
		?>
		<div id="toolbar">
			<table id="toolbarTable">
			<tr>
			<td style="width: 50%;">
				<div id="toolbarLeft"></div>
			</td>
			<td style="width: 0%;">
				<div id="toolbarCenter"><?php Selida::toolbar_center($options); ?></div>
			</td>
			<td style="width: 50%;">
				<div id="toolbarRight"></div>
			</td>
			</tr>
			</table>
		</div>
		<?php
	}

	private static function toolbar_center($options) {
		if (gettype($options) === "string")
		$options = array("titlos" => $options);

		if (array_key_exists("titlos", $options))
		$titlos = $options["titlos"];

		else
		$titlos = "bbska";

		if (array_key_exists("link", $options))
		$link = $options["link"];

		else
		$link = KENTRO_IPOSTIRIXIS;

		if ($link) {
			?><a target="kip" href="<?php print $link; ?>"><?php
		}

		print $titlos;

		if ($link) {
			?></a><?php
		}
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////@

	public static function ribbon() {
		?>
		<div id="ribbon">
			<table id="ribbonTable">
			<tr>
			<td style="width: 40%;">
				<div id="ribbonLeft">
					<?php Selida::ribbon_left(); ?>
				</div>
			</td>
			<td style="width: 20%;">
				<div id="ribbonCenter">
					<?php Selida::ribbon_center(); ?>
				</div>
			</td>
			<td style="width: 40%;">
				<div id="ribbonRight">
					<?php Selida::ribbon_right(); ?>
				</div>
			</td>
			</tr>
			</table>
		</div>
		<?php
	}

	public static function ribbon_left() {
		?>
		<?php if (Globals::is_login()) self::donate(); ?>
		<br />
		<a target="twitter" href="https://twitter.com/bbska"><img class="ribbonIcon"
			src="<?php Globals::url("ikona/external/twitter.png"); ?>" /></a><?php
		if (Globals::oxi_prive()) {
			?><a target="facebook" href="https://www.facebook.com/groups/bbska"><img class="ribbonIcon"
			src="<?php Globals::url("ikona/external/facebook.jpg"); ?>" /></a><?php
		}
	}

	public static function ribbon_center() {
		self::tab_begin();
		?><a target="<?php print defined("COPYRIGHT_PAGE") ? "_self" : "copyright"; ?>"
		href="<?php Globals::url("copyright/index.php"); ?>">Copyright</a><?php
		self::tab_end();

		self::tab_begin();
		?><a target="istologio" href="https://bbska.wordpress.com">Ιστολόγιο</a><?php
		self::tab_end();

		self::tab_begin();
		?><a target="<?php print defined("DOREA_PAGE") ? "_self" : "dorea"; ?>"
		href="<?php Globals::url("dorea/index.php"); ?>">Δωρεές</a><?php
		self::tab_end();
	}

	public static function donate() {
		?>
		<div id="donate" title="Για τις ανάγκες του server…">
		<form target="_blank" action="https://www.paypal.com/cgi-bin/webscr" method="post">
		<input type="hidden" name="cmd" value="_s-xclick" />
		<input type="hidden" name="hosted_button_id" value="7UGXKWGRM5TXU" />
		<input type="image" src="<?php Globals::url("ikona/external/donate.gif"); ?>"
			border="0" name="submit" title="Buy me a beer!"
			alt="PayPal - The safer, easier way to pay online!" />
		</form>
		</div>
		<?php
	}

	public static function ribbon_right() {
		?>
		<div id="toolbarCopyright"> &copy;<?php print OWNER_ONOMA; ?>
			[<a target="email" title="Send email to &quot;<?php print OWNER_EMAIL;
			?>&quot;" href="mailto:<?php print OWNER_EMAIL; ?>"><img
			id="toolbarEmailIcon" src="<?php
			Globals::url("ikona/misc/email.png"); ?>" /></a>] 2011&ndash;
		</div>
		<?php
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////@

	public static function fyi($klasi, $msg) {
		?>
		<div id="fyi<?php print $klasi; ?>" class="fyi">
			<?php print $msg; ?>
		</div>
		<?php
	}

	public static function fyi_pano($msg = "&nbsp;") {
		self::fyi("Pano", $msg);
	}

	public static function fyi_kato($msg = "&nbsp;") {
		self::fyi("Kato", $msg);
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////@

	public static function ofelimo_open() {
		?><div id="ofelimo"><?php
	}

	public static function ofelimo_close() {
		?></div><?php
	}

	public static function ofelimo() {
		self::ofelimo_open();
		self::ofelimo_close();
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////@

	public static function diafimisi() {
		$diafimisi = "site/diafimisi.php";
		if (!file_exists(Globals::$www . $diafimisi))
		return;
		?>
		<div id="diafimisi">
			<?php Globals::diavase($diafimisi); ?>
		</div>
		<?php
	}

	public static function motd($anonimo = FALSE) {
		if (Globals::is_pektis())
		$motd = "site/motd.php";

		else if ($anonimo)
		$motd = "site/welcome.php";

		else
		return;

		if (!file_exists(Globals::$www . $motd))
		return;
		?>
		<div id="motd">
			<?php Globals::diavase($motd); ?>
		</div>
		<?php
	}

	public static function motd_enimerosi_open($titlos = "ΕΝΗΜΕΡΩΤΙΚΟ ΣΗΜΕΙΩΜΑ") {
		?>
		<div class="motdEnimerosi">
		<?php
		if (!$titlos)
		return;
		?>

		<div class="enimerosiTitlos">
		<div class="enimerosiTitlosKimeno">
			<?php print $titlos; ?>
		</div>
		</div>
		<?php
	}

	public static function motd_enimerosi_close() {
		?>
		</div>
		<?php
	}
}
?>
