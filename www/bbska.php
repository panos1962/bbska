<?php
require_once("lib/standard.php");
Globals::session_init();

if (!array_key_exists("action", $_POST))
Globals::klise_fige();

switch ($_POST["action"]) {
case "setup": return Action::setup();
case "imageget": return Action::imageget();
case "imageclear": return Action::imageclear();
case "append": return Action::append();
case "neamonada": return Action::neamonada();
case "diagrafi": return Action::diagrafi();
case "apokopi": return Action::apokopi();
case "sindesi": return Action::sindesi();
case "ensomatosi": return Action::ensomatosi();
case "epikolisi": return Action::epikolisi();
case "save": return Action::save();
case "reorder": return Action::reorder();
case "teknoget": return Action::teknoget();
case "getpaste": return Action::getpaste();
}

class Action {
	public static function setup() {
		Globals::database();

		if (Globals::is_login()) {
			if (!($xristis = Bbska::get_xristis($_SESSION["login"])))
			Globals::klise_fige();

			if (!($kalathi = Bbska::get_monada($xristis->kalathi)))
			Globals::klise_fige();

			$root = $xristis->root;
		}

		if (array_key_exists("root", $_POST))
		$root = intval($_POST["root"]);

		if (!($root = Bbska::get_monada($root)))
		Globals::klise_fige();

		if ($root->oxi_prosvasi())
		Globals::klise_fige();

		print "Bbska.root = new Monada(" . Globals::json_encode($root->prosvasima_tekna()) . ");\n";

		if (Globals::is_login())
		print "Bbska.kalathi = new Monada(" . Globals::json_encode($kalathi) . ");\n";

		Globals::klise_fige();
	}

	// Η λίστα "markam" χρησιμοποιείται κατά την αποστολή πλήρους εικόνας με
	// σκοπό την αποφυγή επαναποστολής πληροφοριακών μονάδων που έχουν ήδη
	// αποσταλεί. Ως index χρησιμοποιείται ο κωδικός πληροφοριακής μονάδας,
	// ενώ η τιμή είναι τετριμμένη (TRUE).

	private static $markam;

	// Η λίστα "image_xristis" χρησιμοποιείται κατά την αποστολή πλήρους
	// εικόνας με σκοπό την οικονομία κατά την αποστολή ονομάτων χρηστών.
	// Η λίστα δεικτοδοτείται με το όνομα του χρήστη και ως τιμή έχει τον
	// κωδικό μονάδας που έχει πρωτοεμφανιστεί ο συγκεκριμένος χρήστης.

	private static $image_xristis;

	// Ακολουθεί η function "imageget" με την οποία επιστρέφουμε στον client
	// μια πλήρη εικόνα της database που αφορά πληροφοριακές μονάδες από τον
	// ριζικό κόμβο και κάτω.

	public static function imageget() {
		self::$image_xristis = array();

		Globals::database();

		if (!array_key_exists("root", $_POST))
		Globals::klise_fige();

		$root = intval($_POST["root"]);

		if (!($monada = Bbska::get_monada($root, array(
			"alist" => FALSE,
			"tekno" => FALSE,
		))))
		Globals::klise_fige();

		if ($monada->image_exists()) {
			$monada->image_print();
			Globals::klise_fige();
		}

		// Δημιουργούμε τη λίστα "markam" την οποία θα δεικτοδοτήσουμε με
		// τους κωδικούς των αποστελλομένων μονάδων προκειμένου αυτές να
		// μην αποσταλούν δεύτερη φορά.

		self::$markam = array();

		// Εκκινούμε το output buffering με σκοπό να κρατήσουμε το output
		// σε cache file για την συγκεκριμένη μονάδα.

		ob_start();

		// Για λόγους επιπλέον ασφάλειας δημιουργούμε κάποια «ταυτότητα»
		// για το συγκεκριμένο image με το όνομα "id".

		print "id:" . ($id = rand()) . ",\n";

		self::imageget_monada($root);

		// Μετά το πέρας των δεδομένων επαναλαμβάνουμε την «ταυτότητα» του
		// image με το όνομα "di". Με αυτόν τον τρόπο θα μπορέσει ο αιτών
		// client να ελέγξει την πληρότητα και την ορθότητα των δεδομένων
		// του image.

		print "di:" . $id . ",\n";

		// Πριν αποστείλουμε τα δεδομένα στον client, δημιουργούμε το image
		// cache file για την συγκεκριμένη μονάδα.

		$monada->image_create();

		// Αποστέλλουμε τα δεδομένα στον client, καθαρίζουμε το output buffer
		// και επιστρέφουμε.

		ob_end_flush();
		Globals::klise_fige();
	}

	static private function imageget_monada($kodikos, $level = 0) {
		// Ελέγχουμε αν η πληροφοριακή μονάδα έχει ήδη αποσταλεί.

		if (array_key_exists($kodikos, self::$markam))
		return;

		// Μαρκάρουμε την πληροφοριακή μονάδα ως απεσταλμένη.

		self::$markam[$kodikos] = TRUE;

		// Προσπελαύνουμε την πληροφορική μονάδα, αποφεύγοντας όμως
		// να πάρουμε τα attributes και τα παιδιά. Αυτά θα τα πάρουμε
		// μόνον εφόσον έχουμε πρόσβαση.

		if (!($monada = Bbska::get_monada($kodikos, array(
			"alist" => FALSE,
			"tekno" => FALSE,
		))))
		return;

		// Αν δεν έχουμε πρόσβαση στην ανά χείρας πληροφοριακή μονάδα,
		// δεν έχουμε άλλη δουλειά με τη συγκεκριμένη μονάδα.

		if ($monada->oxi_prosvasi())
		return ;

		// Η μονάδα είναι προσβάσιμη, επομένως αποστέλλουμε τα στοιχεία
		// στον client.

		print $monada->kodikos;
		print ":{";

		switch ($monada->idiotikotita) {
		case "SYSTEM":
			print "i:1,";
			break;
		case "PRIVATE":
			print "i:2,";
			break;
		}

		// Αν έχουμε επώνυμη χρήση και ο χρήστης δεν είναι ο ιδιοκτήτης τής
		// πληροφοριακής μονάδας, τότε αποστέλλουμε και τον ιδιοκτήτη.

		if (Globals::is_login() && ($monada->xristis != $_SESSION["login"]))
		self::imageget_monada_xristis($monada);

		// Μαζεύουμε και αποστέλλουμε τα attributes της πληροφοριακής
		// μονάδας στον client.

		print "a:[";
		$query = "SELECT SQL_CACHE `key`, `val` FROM `attr` WHERE `monada` = " .
			$kodikos . " ORDER BY `aa`";
		$res = Globals::query($query);
		while ($row = $res->fetch_array(MYSQLI_NUM)) {
			print "{k:";
			print Globals::json_encode($row[0]);
			print ",v:";
			print Globals::json_encode($row[1]);
			print "},";
		}
		$res->free();
		print "]";

		// Μαζεύουμε τα παιδιά της πληροφοριακής μονάδας και αποθηκεύουμε
		// τους κωδικούς των παιδιών σε array.

		$tekno = array();
		$query = "SELECT SQL_CACHE `tekno` FROM `organosi` WHERE `goneas` = " .
			$kodikos . " ORDER BY `aa`";
		$res = Globals::query($query);
		while ($row = $res->fetch_array(MYSQLI_NUM)) {
			$tekno[] = intval($row[0]);
		}
		$res->free();

		$tcount = count($tekno);
		if ($tcount > 0) {
			print ",t:[" . $tekno[0];

			for ($i = 1; $i < $tcount; $i++)
			print "," . $tekno[$i];

			print "]";
		}

		print "},\n";

		// Αν δεν βρισκόμαστε στο πρώτο επίπεδο, θα πρέπει να ελέγξουμε
		// αν ο κόμβος είναι τερματικός. Τερματικός κόμβος είναι όποιος
		// κόμβος έχει attribute "_block_".

		if ($level && $monada->is_terminal())
		return;

		$level++;
		for ($i = 0; $i < $tcount; $i++)
		self::imageget_monada($tekno[$i], $level);
	}

	static private function imageget_monada_xristis($monada) {
		print "x:";

		$xristis = $monada->xristis;
		if (array_key_exists($xristis, self::$image_xristis)) {
			print self::$image_xristis[$xristis];
		}
		else {
			print Globals::asfales_json($xristis);
			self::$image_xristis[$xristis] = $monada->kodikos;
		}

		print ",";
	}

	// Ακολουθεί η function "imageclear" με την οποία διαγράφουμε όλα τα
	// images από το cache του αιτούντος.

	public static function imageclear() {
		if (!($xristis = Bbska::get_xristis($_SESSION["login"])))
		Globals::klise_fige();

		// Στο σημείο αυτό να τονίσουμε ότι υπάρχει κίνδυνος κακόβουλης
		// ενέργειας με χρήση κατάλληλου login name, ωστόσο ο κίνδυνος
		// αυτός είναι ελάχιστος καθώς στο login name απαγορεύεται το
		// slash (/).

		// Αν το αίτημα καθαρισμού των image cache files αφορά μόνο στα
		// cache files που λαμβάνει ο ίδιοκτήτης (private), τότε εκκαθαρίζονται
		// μόνο τα συγκεκριμένα image cache files…

		if (array_key_exists("private", $_POST))
		system("rm -f " . CACHE_DIR . $xristis->login . "/*.private");

		// …ενώ σε άλλη περίπτωση εκκαθαρίζονται όλα τα image cache files που
		// αφορούν σε μονάδες του αιτούντος την εκκαθάριση χρήστη.

		else
		system("rm -rf " . CACHE_DIR . $xristis->login);

		Globals::klise_fige();
	}

	// Η μέθοδος "append" δέχεται ως παράμετρο κάποια γονική μονάδα στην
	// οποία εισάγει νέα (κενή) μονάδα ως πρώτο στοιχείο. Η μονάδα διατηρεί
	// την ιδιωτικότητα της γονικής μονάδας.

	public static function append() {
		if (Globals::oxi_login())
		Globals::klise_fige();

		if (!array_key_exists("goneas", $_POST))
		Globals::klise_fige();

		$goneas = intval($_POST["goneas"]);

		Globals::database();

		if (!($goniki = Bbska::get_monada($goneas)))
		Globals::klise_fige();

		if ($goniki->oxi_owner())
		Globals::klise_fige();

		$idiotikotita = $goniki->idiotikotita;

		if ($idiotikotita === "SYSTEM")
		$idiotikotita = "PUBLIC";

		Globals::autocommit(FALSE);

		$query = "UPDATE `organosi` SET `aa` = `aa` + 1 WHERE `goneas` = " . $goneas;
		Globals::query($query);

		$query = "INSERT INTO `monada` (`xristis`, `idiotikotita`) VALUES (" .
			Globals::asfales_sql($_SESSION["login"]) . ", " .
			Globals::asfales_sql($idiotikotita) . ")";
		Globals::query($query);
		$kodikos = Globals::insert_id();

		if (!$kodikos)
		Globals::klise_fige();

		$query = "INSERT INTO `organosi` (`goneas`, `aa`, `tekno`) " .
			"VALUES (" . $goneas . ", 1, " . $kodikos . ")";
		Globals::query($query);

		if (Globals::affected_rows() !== 1)
		Globals::klise_fige();

		if (!($monada = Bbska::get_monada($kodikos)))
		Globals::klise_fige();

		Globals::commit();

		print Globals::json_encode($monada);
		Globals::klise_fige();
	}

	// Δημιουργία νέας μονάδας ως sibling κάτω από ήδη υπάρχουσα μονάδα,
	// με μετάθεση όλων των επομένων κατά μια θέση κάτω.
	//
	// Μπορεί να έχει δοθεί και παράμετρος κλωνοποίησης εάν επιθυμούμε
	// η νέα μονάδα να δημιουργηθεί αρχικά ως κλώνος της δοθείσης.

	public static function neamonada() {
		if (Globals::oxi_login())
		Globals::klise_fige();

		if (!array_key_exists("monada", $_POST))
		Globals::klise_fige();

		if (!array_key_exists("goneas", $_POST))
		Globals::klise_fige();

		$slogin = Globals::asfales_sql($_SESSION["login"]);
		$monada = intval($_POST["monada"]);
		$goneas = intval($_POST["goneas"]);
		$clone = array_key_exists("clone", $_POST);

		Globals::database();

		if (!($goniki = Bbska::get_monada($goneas)))
		Globals::klise_fige();

		if ($goniki->oxi_owner())
		Globals::klise_fige();

		$idiotikotita = $goniki->idiotikotita;

		if ($idiotikotita === "SYSTEM")
		$idiotikotita = "PUBLIC";

		$query = "SELECT `aa` FROM `organosi` " .
			"WHERE (`goneas` = " . $goneas . ") AND " .
			"(`tekno` = " . $monada . ")";
		$row = Globals::first_row($query, MYSQLI_NUM);

		if (!$row)
		Globals::klise_fige();

		$aa = intval($row[0]);

		Globals::autocommit(FALSE);

		$query = "UPDATE `organosi` SET `aa` = `aa` + 1 " .
			"WHERE (`goneas` = " . $goneas . ") AND " .
			"(`aa` > " . $aa . ")";
		Globals::query($query);

		if ($clone)
		$query = "INSERT INTO `monada` (`xristis`, `idiotikotita`) " .
			"SELECT " . $slogin . ", `idiotikotita` " .
			"FROM `monada` WHERE `kodikos` = " . $monada;

		else
		$query = "INSERT INTO `monada` (`xristis`, `idiotikotita`) VALUES " .
			"(" . $slogin . ", " . Globals::asfales_sql($idiotikotita) . ")";

		Globals::query($query);
		$kodikos = Globals::insert_id();

		if (!$kodikos)
		Globals::klise_fige();

		if ($clone) {
			$query = "INSERT INTO `attr` (`monada`, `aa`, `key`, `val`) " .
				"SELECT " . $kodikos . ", `aa`, `key`, `val` FROM `attr` " .
				"WHERE `monada` = " . $monada;
			Globals::query($query);
		}

		$query = "INSERT INTO `organosi` (`goneas`, `aa`, `tekno`) VALUES " .
			"(" . $goneas . ", " . ($aa + 1) . ", " . $kodikos . ")";
		Globals::query($query);

		if (Globals::affected_rows() !== 1)
		Globals::klise_fige();

		if (!($monada = Bbska::get_monada($kodikos)))
		Globals::klise_fige();

		Globals::commit();

		print Globals::json_encode($monada);
		Globals::klise_fige();
	}

	public static function diagrafi() {
		if (Globals::oxi_login())
		Globals::klise_fige();

		if (!array_key_exists("monada", $_POST))
		Globals::klise_fige();

		if (!array_key_exists("goneas", $_POST))
		Globals::klise_fige();

		$monada = intval($_POST["monada"]);
		$goneas = intval($_POST["goneas"]);

		Globals::database();

		if (!($goniki = Bbska::get_monada($goneas)))
		Globals::klise_fige();

		if ($goniki->oxi_owner())
		Globals::klise_fige();

		Globals::autocommit(FALSE);

		self::tekno_delete($goneas, $monada);
		self::orfana_cleanup();

		Globals::commit();
		Globals::klise_fige(OKRSP);
	}

	public static function apokopi() {
		if (Globals::oxi_login())
		Globals::klise_fige();

		if (!array_key_exists("monada", $_POST))
		Globals::klise_fige();

		if (!array_key_exists("goneas", $_POST))
		Globals::klise_fige();

		$monada = intval($_POST["monada"]);
		$goneas = intval($_POST["goneas"]);

		Globals::database();

		if (!($goniki = Bbska::get_monada($goneas)))
		Globals::klise_fige();

		if ($goniki->oxi_owner())
		Globals::klise_fige();

		$kalathi = self::kalathiget();
		$aa = self::teknocount($kalathi) + 1;

		Globals::autocommit(FALSE);

		self::tekno_delete($goneas, $monada);
		self::tekno_insert($kalathi, $aa, $monada);

		Globals::commit();
		Globals::klise_fige(OKRSP);
	}

	public static function sindesi() {
		if (Globals::oxi_login())
		Globals::klise_fige();

		if (!array_key_exists("monada", $_POST))
		Globals::klise_fige();

		$monada = intval($_POST["monada"]);

		Globals::database();

		$kalathi = self::kalathiget();
		$aa = self::teknocount($kalathi) + 1;

		Globals::autocommit(FALSE);

		self::tekno_insert($kalathi, $aa, $monada);

		Globals::commit();
		Globals::klise_fige(OKRSP);
	}

	public static function ensomatosi() {
		if (Globals::oxi_login())
		Globals::klise_fige();

		if (!array_key_exists("goneas", $_POST))
		Globals::klise_fige();

		$goneas = intval($_POST["goneas"]);

		Globals::database();

		if (!($goniki = Bbska::get_monada($goneas)))
		Globals::klise_fige();

		if ($goniki->oxi_owner())
		Globals::klise_fige();

		$kalathi = self::kalathiget();
		$count = self::teknocount($kalathi);

		if (!$count)
		Globals::klise_fige();

		Globals::autocommit(FALSE);

		$query = "UPDATE `organosi` SET " .
			"`aa` = `aa` + " . $count . " " .
			"WHERE `goneas` = " . $goneas;
		Globals::$db->query($query);

		$query = "UPDATE `organosi` SET " .
			"`goneas` = " . $goneas . " " .
			"WHERE `goneas` = " . $kalathi;
		Globals::$db->query($query);

		if (!Globals::affected_rows())
		Globals::klise_fige();

		Globals::commit();

		$query = "SELECT `tekno` FROM `organosi` " .
			"WHERE (`goneas` = " . $goneas . ") AND " .
			"(`aa` <= " . $count . ") ORDER BY `aa` DESC";
		$res = Globals::query($query);

		print "[";
		while ($row = $res->fetch_array(MYSQLI_NUM)) {
			$monada = new Monada();
			$monada->get_monada($row[0]);
			print Globals::json_encode($monada) . ",";
		}
		$res->free();
		print "]";

		Globals::klise_fige();
	}

	public static function epikolisi() {
		if (Globals::oxi_login())
		Globals::klise_fige();

		if (!array_key_exists("goneas", $_POST))
		Globals::klise_fige();

		if (!array_key_exists("pivot", $_POST))
		Globals::klise_fige();

		$goneas = intval($_POST["goneas"]);
		$pivot = intval($_POST["pivot"]);

		Globals::database();

		if (!($goniki = Bbska::get_monada($goneas)))
		Globals::klise_fige();

		if ($goniki->oxi_owner())
		Globals::klise_fige();

		$kalathi = self::kalathiget();
		$count = self::teknocount($kalathi);

		if (!$count)
		Globals::klise_fige();

		$query = "SELECT `aa` FROM `organosi` " .
			"WHERE (`goneas` = " . $goneas . ") AND " .
			"(`tekno` = " . $pivot . ")";
		$row = Globals::first_row($query, MYSQLI_NUM);

		if (!$row)
		Globals::klise_fige();

		$pivot_aa = intval($row[0]);

		Globals::autocommit(FALSE);

		$query = "UPDATE `organosi` SET `aa` = `aa` + " . $count . " " .
			"WHERE (`goneas` = " . $goneas . ") AND " .
			"(`aa` > " . $pivot_aa . ")";
		Globals::$db->query($query);

		$query = "UPDATE `organosi` SET " .
			"`goneas` = " . $goneas . ", " .
			"`aa` = `aa` + " . $pivot_aa . " " .
			"WHERE `goneas` = " . $kalathi;
		Globals::$db->query($query);

		if (!Globals::affected_rows())
		Globals::klise_fige();

		Globals::commit();

		$query = "SELECT `tekno` FROM `organosi` " .
			"WHERE (`goneas` = " . $goneas . ") AND " .
			"(`aa` > " . $pivot_aa . ") AND " .
			"(`aa` <= " . ($pivot_aa + $count) . ") ORDER BY `aa` DESC";
		$res = Globals::query($query);

		print "[";
		while ($row = $res->fetch_array(MYSQLI_NUM)) {
			$monada = new Monada();
			$monada->get_monada($row[0]);
			print Globals::json_encode($monada) . ",";
		}
		$res->free();
		print "]";

		Globals::klise_fige();
	}

	public static function save() {
		if (Globals::oxi_login())
		Globals::klise_fige();

		if (!array_key_exists("monada", $_POST))
		Globals::klise_fige();

		if (!array_key_exists("idio", $_POST))
		Globals::klise_fige();

		if (!array_key_exists("kdata", $_POST))
		Globals::klise_fige();

		if (!array_key_exists("vdata", $_POST))
		Globals::klise_fige();

		$kodikos = intval($_POST["monada"]);
		$idiotikotita = $_POST["idio"];

		$kdata = $_POST["kdata"];
		$vdata = $_POST["vdata"];

		$nattr = count($kdata);
		if (count($vdata) !== $nattr)
		Globals::klise_fige();

		Globals::database();
		Globals::autocommit(FALSE);

		$query = "UPDATE `monada` SET `idiotikotita` = " .
			Globals::asfales_sql($idiotikotita) .
			" WHERE `kodikos` = " . $kodikos;
		Globals::query($query);

		$query = "DELETE FROM `attr` WHERE `monada` = " . $kodikos;
		Globals::query($query);

		$query = "";
		$aa = 1;

		for ($i = 0; $i < $nattr; $i++) {
			$key = $kdata[$i];
			$val = $vdata[$i];

			if ((!$key) && (!$val))
			continue;

			if ($query === "")
			$query = "INSERT INTO `attr` (`monada`, `aa`, `key`, `val`) VALUES ";

			else
			$query .= ", ";

			$query .= "(" . $kodikos . ", " . $aa++ . ", " .
				Globals::asfales_sql($key) . ", " .
				Globals::asfales_sql($val) . ")";
		}

		if ($query) {
			Globals::query($query);
			if (!Globals::affected_rows())
			Globals::klise_fige();
		}

		Globals::commit();

		$monada = new Monada();
		$monada->get_monada($kodikos);
		unset($monada->kodikos);
		unset($monada->xristis);
		unset($monada->tekno);
		print Globals::json_encode($monada);

		Globals::klise_fige();
	}

	public static function reorder() {
		if (Globals::oxi_login())
		Globals::klise_fige();

		if (!array_key_exists("goneas", $_POST))
		Globals::klise_fige();

		if (!array_key_exists("tekno", $_POST))
		Globals::klise_fige();

		if (array_key_exists("proigoumeno", $_POST))
		$proigoumeno = intval($_POST["proigoumeno"]);

		elseif (array_key_exists("epomeno", $_POST))
		$epomeno = intval($_POST["epomeno"]);

		else
		Globals::klise_fige();

		$goneas = intval($_POST["goneas"]);

		if (!($goniki = Bbska::get_monada($goneas)))
		Globals::klise_fige();

		if ($goniki->oxi_owner())
		Globals::klise_fige();

		$tekno = intval($_POST["tekno"]);
		$count = count($goniki->tekno);
		$onket = array();

		if (isset($proigoumeno)) {
			for ($i = 0; $i < $count; $i++) {
				$kodikos = $goniki->tekno[$i]->kodikos;

				if ($kodikos === $tekno)
				continue;

				$onket[] = $kodikos;

				if ($kodikos == $proigoumeno)
				$onket[] = $tekno;
			}
		}

		else {
			for ($i = 0; $i < $count; $i++) {
				$kodikos = $goniki->tekno[$i]->kodikos;

				if ($kodikos === $tekno)
				continue;

				if ($kodikos === $epomeno)
				$onket[] = $tekno;

				$onket[] = $kodikos;
			}
		}

		Globals::database();
		Globals::autocommit(FALSE);

		self::tekno_delete($goneas);

		$query = "INSERT INTO `organosi` (`goneas`, `aa`, `tekno`) VALUES ";
		$enotiko = "";

		for ($i = 0, $aa = 1; $i < $count; $i++, $aa++) {
			$query .= $enotiko . "(" . $goneas . ", " . $aa . ", " . $onket[$i] . ")";
			$enotiko = ", ";
		}
		Globals::query($query);

		if (!Globals::affected_rows())
		Globals::klise_fige();

		Globals::commit();
		Globals::klise_fige(OKRSP);
	}

	public static function teknoget() {
		if (!array_key_exists("monada", $_POST))
		Globals::klise_fige();

		Globals::database();
		$query = "SELECT SQL_CACHE `tekno` FROM `organosi` WHERE `goneas` = " .
			intval($_POST["monada"]) . " ORDER BY `aa`";
		$res = Globals::query($query);

		print "[";
		while ($row = $res->fetch_array(MYSQLI_NUM)) {
			$monada = new Monada();
			$monada->get_monada($row[0]);

			if ($monada->oxi_prosvasi())
			continue;

			print Globals::json_encode($monada->prosvasima_tekna()) . ",";
		}
		$res->free();
		print "]";

		Globals::klise_fige();
	}

	private static function tekno_insert($goneas, $aa, $tekno) {
		$query = "INSERT INTO `organosi` (`goneas`, `aa`, `tekno`) VALUES " .
			"(" . $goneas . ", " . $aa . ", " . $tekno . ")";
		Globals::$db->query($query);

		if (Globals::affected_rows() !== 1)
		Globals::klise_fige();
	}

	private static function tekno_delete($goneas, $tekno = NULL) {
		$query = "DELETE FROM `organosi` WHERE (`goneas` = " . $goneas . ")";

		if ($tekno)
		$query .= " AND (`tekno` = " . $tekno . ")";

		Globals::$db->query($query);

		if (!Globals::affected_rows())
		Globals::klise_fige();
	}

	private static function orfana_cleanup() {
		$query = "DELETE FROM `monada` WHERE `kodikos` NOT IN " .
			"(SELECT `tekno` FROM `organosi`)";
		Globals::$db->query($query);
	}

	private static function kalathiget() {
		$query = "SELECT `kalathi` FROM `xristis` " .
			"WHERE `login` LIKE " . Globals::asfales_sql($_SESSION["login"]);
		$row = Globals::first_row($query, MYSQLI_NUM);

		if (!$row)
		Globals::klise_fige();

		return intval($row[0]);
	}

	private static function teknocount($monada) {
		$query = "SELECT COUNT(*) FROM `organosi` WHERE `goneas` = " . $monada;
		$row = Globals::first_row($query, MYSQLI_NUM);

		if (!$row)
		Globals::klise_fige();

		return intval($row[0]);
	}
}
?>
