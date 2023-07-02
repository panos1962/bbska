<?php
// Το παρόν  περιέχει PHP δομές και μεθόδους που αφορούν γενικά στην εφαρμογή
// και όχι μόνο στις σελίδες που παρέχονται στο διαδίκτυο.

// Η συμβολική σταθερά "KENTRO_IPOSTIRIXIS" περιέχει το URL του κέντρου υποστήριξης
// του «bbska». Πρόκειται για εξωτερική σελίδα που περιέχει χρήσιμες πληροφορίες
// και links.

define("KENTRO_IPOSTIRIXIS", "http://www.bbskablog.wordpress.com");

// Η συμβολική σταθερά "OWNER_ONOMA" περιέχει το ονοματεπώνυμο του κατέχοντος
// το copyright της εφαρμογής.

define("OWNER_ONOMA", "Panos I. Papadopoulos");

// Η συμβολική σταθερά "OWNER_EMAIL" περιέχει το email του κατέχοντος
// το copyright της εφαρμογής.

define("OWNER_EMAIL", "panos1962@gmail.com");

// Η συμβολική σταθερά "SUPPORT_EMAIL" περιέχει το email της τεχνικής
// υποστήριξης της εφαρμογής.

define("SUPPORT_EMAIL", "panos1962@gmail.com");

// Το directory "CERT" κάτω από το directory "site" της εφαρμογής υποδηλώνει ότι
// υπάρχει certification, ήτοι χρήση πρωτοκόλλου "https". Μέσα στο directory δεν
// είναι απαραίτητο να υπάρχει κάτι, αλλά μπορεί να χρειαστεί κάτι σχετικό στο μέλλον.
// Η συμβολική σταθερά "CERT_DIR" είναι το σχετικό pathname του εν λόγω directory.

define("CERT_DIR", preg_replace("/www.lib.standard.php$/", "", __FILE__) . "site/CERT");

// Η συμβολική σταθερά "PRODUCTION_URL" περιέχει αυτό καθεαυτό το URL της εφαρμογής.

define("PRODUCTION_URL", "http://www.bbska.info");

// Η συμβολική σταθερά "DEFAULT_ROOT" δείχνει τον κωδικό της default ριζικής μονάδας
// για τον ανώνυμο χρήστη.

define("ROOT_DEFAULT", 2);

// Η συμβολική σταθερά "FAVICON_DIR" περιέχει το directory των εσωτερικών
// εικονιδίων μπάμπουσκας.

define("FAVICON_DIR", "ikona/favicon/");

// Η συμβολική σταθερά "IMGDEPO" περιέχει το URL ιστοτόπου στον οποίο ο χρήστης
// μπορεί να ανεβάζει εικόνες μέσω της κάμερας που παρέχεται στο side panel.

define("IMGDEPO", "https://imgur.com");

// Η συμβολική σταθερά "ERRSEP" χρησιμοποιείται ως διαχωριστής τμημάτων της
// απάντησης που λαμβάνουμε από τον server μέσω κλήσεων Ajax. πρόκειται για
// string που δύσκολα θα το βρούμε στα δεδομένα.

define("ERRSEP", "_@@_");

// Η συμβολική σταθερά "OKRSP" χρησιμοποιείται ως απάντηση σε Ajax requests
// στα οποία δεν περιμένουμε data.

define("OKRSP", "_@OK@_");

// Η συμβολική σταθερά "CACHE_DIR" είναι το σχετικό pathname των cached image
// files. Ως directory βάσης νοείται το "www". Το directory πρέπει να είναι
// εγγράψιμο από τον web server daemon (apache). Μια εύκολη αλλά όχι καλή
// εναλλακτική λύση είναι να δώσουμε προσβάσεις read/write για όλους στο
// cache directory.

define("CACHE_DIR", "../site/cache/");

mb_internal_encoding("UTF-8");
mb_regex_encoding("UTF-8");

Globals::init();
register_shutdown_function("Globals::klise_fige");

// Η κλάση "Globals" χρησιμοποιείται κυρίως ως name space, οπότε δεν υπάρχουν properties
// και όλες οι μέθοδοι είναι static.

class Globals {
	// Η property "init_ok" δείχνει αν έτρεξε η μέθοδος "init".
	// Η μέθοδος πρέπει να τρέχει το πολύ μια φορά.

	private static $init_ok;

	// Η property "session_ok" δείχνει αν έτρεξε η μέθοδος "session".
	// Η μέθοδος πρέπει να τρέχει το πολύ μια φορά.

	private static $session_ok;

	// Η property "klise_fige_ok" δείχνει αν έτρεξε η μέθοδος "klise_fige".
	// Η μέθοδος πρέπει να τρέχει το πολύ μια φορά.

	private static $klise_fige_ok;

	// Η property "server" περιέχει το URL του home directory του server
	// στον οποίο «τρέχει» η εφαρμογή. Πρέπει να τελειώνει με "/", καθώς
	// θα κολλήσουμε subdirectories και file names προκειμένου να
	// προσπελάσουμε άλλα αρχεία και directories της εφαρμογής, π.χ.
	//
	//	https://www.bbska.info/
	// ή
	//
	//	http://127.0.0.1/bbska/

	public static $server;

	// Η property "skiser" περιέχει το URL του Node server στον οποίο
	// «τρέχει» η εφαρμογή. Πρόκειται για το URL του server ακολουθούμενο
	// από τον αριθμό της πόρτας στην οποία ο Node server ακούει αιτήματα
	// της εφαρμογής, π.χ.
	//
	//	https://www.bbska.info:8888
	// ή
	//	http://127.0.0.1:8888

	public static $skiser;

	// Η property "ip" περιέχει την IP του client που αιτείται
	// τις υπηρεσίες της PHP μέσω Apache.

	public static $ip;

	// Η property "dir" είναι το πλήρες pathname του βασικού directory της
	// εφαρμογής, π.χ. "/home/panos/apps/bbska/".

	public static $dir;

	// Η property "www" είναι το πλήρες pathname του directory της εφαρμογής
	// που εκτίθεται στον έξω κόσμο, π.χ. "/home/panos/apps/bbska/www/".

	public static $www;

	// Η property "db" είναι ο database handler μέσω του οποίου προσπελαύνουμε
	// την database της εφαρμογής.

	public static $db;

	// Η μέθοδος "init" δίνει τιμές στα properties της κλάσης "Globals" και
	// αρχικοποιεί τις μεθόδους της κλάσεις.

	public static function is_cert() {
		return is_dir(CERT_DIR);
	}

	public static function init() {
		if (self::$init_ok)
		self::klise_fige("init: reinitialization");
		self::$init_ok = TRUE;

		self::$session_ok = FALSE;
		self::$klise_fige_ok = FALSE;
		self::$server = NULL;
		self::$skiser = NULL;
		self::$ip = NULL;
		self::$dir = NULL;
		self::$www = NULL;
		self::$db = NULL;

		if (!isset($_SERVER))
		self::klise_fige("_SERVER: not set");

		if (!is_array($_SERVER))
		self::klise_fige("_SERVER: not an array");

		$http_host = array_key_exists("HTTP_HOST", $_SERVER) ? $_SERVER["HTTP_HOST"] : "localhost";
		self::$skiser = "http://" . $http_host;

		switch ($http_host) {
		case "127.0.0.1":
		case "localhost":
		case "www.opasopa.net":
		case "opasopa.net":
		case "www.prefadoros.win":
		case "prefadoros.win":
			self::$server = "http://" . $http_host . "/bbska/";
			break;
		case "www.bbska.info":
		case "bbska.info":
		case "bbska.opasopa.net":
			self::$server = (self::is_cert() ? "https://" : "http://") . $http_host . "/";
			break;
		default:
			if ($http_host) print $http_host . ": ";
			self::klise_fige("unknown server");	
		}

		self::get_client_ip();
		self::$dir = preg_replace("/www.lib.standard.php$/", "", __FILE__);
		self::$www = self::$dir . "www/";
	}

	// Με την μέθοδο "get_client_ip" βολιδοσκοπούμε την IP του client.

	private static function get_client_ip() {
		self::$ip = "";
		if (array_key_exists("REMOTE_ADDR", $_SERVER))
		self::$ip = $_SERVER["REMOTE_ADDR"];

		if (!array_key_exists("HTTP_X_FORWARDED_FOR", $_SERVER))
		return;

		$ipf = explode(",", $_SERVER["HTTP_X_FORWARDED_FOR"]);
		if (count($ipf))
		self::$ip = $ipf[0];
	}

	// Η μέθοδος "database" μας συνδέει με την database και την καλούμε όποτε υπάρχει
	// ανάγκη συνδέσεως με την database.

	public static function database() {
		if (self::$db)
		return;

		//self::klise_fige("database: reconnection");

		$dbhost = "localhost";
		$dbname = "bbska";
		$dbuser = "bbska";

		switch (self::$server) {
		case "http://127.0.0.1/bbska/";
		case "http://localhost/bbska/";
		case "http://www.bbska.info/":
		case "http://bbska.info/":
		case "http://www.opasopa.net/bbska/":
		case "http://opasopa.net/bbska/":
		case "http://bbska.opasopa.net/":
		case "http://www.prefadoros.win/bbska/":
		case "http://prefadoros.win/bbska/":
			break;
		default:
			if (self::$server)
			print self::$server . ": ";

			self::klise_fige("unknown server (database)");	
		}

		$bekadb = preg_replace("/[^a-zA-Z0-9]/", "", @file_get_contents(self::$dir . "site/bekadb"));
		self::$db = @new mysqli($dbhost, $dbuser, $bekadb, $dbname);

		self::$db->connect_errno &&
		die("database connection failed (" . self::$db->connect_error . ")");

		@self::$db->set_charset("utf8") ||
		self::klise_fige("cannot set character set (database)");
	}

	// Η μέθοδος "session_init" ενεργοποιεί το session και είναι καλό να καλείται
	// στην αρχή του PHP script.

	public static function session_init() {
		if (self::$session_ok)
		return;

		self::$session_ok = TRUE;

		$evdomada = 24 * 7 * 3600;
		ini_set("session.gc_maxlifetime", $evdomada);
		ini_set("session.cookie_lifetime", $evdomada);
		session_set_cookie_params($evdomada);
		session_start();

		if (!isset($_SESSION))
		self::klise_fige("_SESSION: not set");

		if (!is_array($_SESSION))
		self::klise_fige("_SESSION: not an array");
	}

	// Η μέθοδος "session_set" δέχεται ως παράμετρο ένα key/value pair και θέτει
	// το σχετικό cookie.

	public static function session_set($tag, $val) {
		self::session_init();
		$_SESSION[$tag] = $val;
	}

	// Η μέθοδος "session_clear" δέχεται ως παράμετρο ένα string και διαγράφει
	// το σχετικό cookie.

	public static function session_clear($tag) {
		self::session_init();
		unset($_SESSION[$tag]);
	}

	// Η μέθοδος "is_session" δέχεται ως παράμετρο ένα string και επιστρέφει
	// TRUE εφόσον υπάρχει το αντίστοιχο session cookie.

	public static function is_session($tag) {
		self::session_init();
		return array_key_exists($tag, $_SESSION);
	}

	// Η μέθοδος "oxi_session" δέχεται ως παράμετρο ένα string και επιστρέφει
	// TRUE εφόσον ΔΕΝ υπάρχει το αντίστοιχο session cookie.

	public static function oxi_session($tag) {
		return !self::is_session($tag);
	}

	// Η μέθοδος "session" δέχεται ως παράμετρο ένα string και επιστρέφει
	// την τιμή του αντίστοιχου στοιχείου από το session array.

	public static function session($tag) {
		if (self::oxi_session($tag))
		return NULL;

		return $_SESSION[$tag];
	}

	public static function is_login() {
		return self::is_session("login");
	}

	public static function oxi_login() {
		return !self::is_login();
	}

	public static function user_must() {
		if (self::is_login())
		return;

		Globals::klise_fige("Διαπιστώθηκε ανώνυμη χρήση");
	}

	// Η μέθοδος "url" είναι ήσσονος σημασίας και σκοπό έχει τη διευκόλυνση στη γραφή
	// των ονομάτων αρχείων μέσω της πλήρωσης των ονομάτων αυτών με το όνομα του server,
	// π.χ. από "astra" σε "www.bbska.info/astra". Η μέθοδος εκτυπώνει, μάλλον, το
	// πλήρες όνομα, παρά το επιστρέφει, καθώς έτσι είναι πιο εύχρηστη στην PHP.

	public static function url($fname = "") {
		print self::$server . $fname;
	}

	// Η μέθοδος "diavase_arxio" είναι ήσσονος σημασίας καθώς υποκαθιστά την "require" και
	// μόνο σκοπό έχει την απλοποίηση των pathnames.

	public static function diavase_arxio($file) {
		require self::$www . $file;
	}

	// Η μέθοδος "query" δέχεται ως πρώτη παράμετρο ένα SQL query και το εκτελεί.
	// Αν υπάρξει οποιοδήποτε δομικό πρόβλημα (όχι σχετικό με την επιτυχία ή μη
	// του query), τότε εκτυπώνεται μήνυμα λάθους και το πρόγραμμα σταματά.

	public static function query($query) {
		$result = self::$db->query($query);
		if ($result)
		return $result;

		print "SQL ERROR: " . $query . ": " . self::sql_error();
		self::klise_fige(2);
	}

	public static function sql_errno() {
		return self::$db->errno;
	}

	public static function sql_error() {
		return self::$db->error;
	}

	// Η μέθοδος "first_row" τρέχει ένα query και επιστρέφει την πρώτη γραμμή των
	// αποτελεσμάτων απελευθερώνοντας τυχόν άλλα αποτελέσματα.

	public static function first_row($query, $idx = MYSQLI_BOTH) {
		$result = self::query($query);
		while ($row = $result->fetch_array($idx)) {
			$result->free();
			break;
		}

		return $row;
	}

	public static function insert_id() {
		return self::$db->insert_id;
	}

	public static function affected_rows() {
		return self::$db->affected_rows;
	}

	public static function autocommit($on_off) {
		self::$db->autocommit($on_off) ||
		self::klise_fige("autocommit failed");
	}

	public static function commit() {
		self::$db->commit() ||
		self::klise_fige("commit failed");
	}

	public static function rollback() {
		self::$db->rollback() ||
		self::klise_fige("rollback failed");
	}

	// Η μέθοδος "klise_fige" κλείνει τη σύνδεση με την database και διακόπτει
	// το πρόγραμμα. Μπορούμε να περάσουμε μήνυμα το οποίο θα εκτυπωθεί πριν τη
	// διακοπή του προγράμματος. Μπορούμε, ακόμη, να περάσουμε ως παράμετρο μια
	// αριθμητική τιμή η οποία θα χρησιμοποιηθεί ως exit status.

	public static function klise_fige($msg = NULL) {
		if (Globals::$klise_fige_ok)
		return;

		Globals::$klise_fige_ok = TRUE;

		if (isset(self::$db)) {
			self::$db->kill(self::$db->thread_id);
			self::$db->close();
		}

		if (!isset($msg)) {
			$stat = 0;
		}
		elseif (is_int($msg)) {
			$stat = (int)$msg;
		}
		else {
			print $msg;
			$stat = 2;
		}

		while (@ob_end_flush());

		die($stat);
	}

	public static function fatal($msg = "generic error") {
		Globals::klise_fige("ERROR: " . $msg);
	}

	// Η μέθοδος "perastike" δέχεται ως παράμετρο ένα string και επιστρέφει
	// TRUE εφόσον έχει περαστεί αντίστοιχη GET/POST παράμετρος.

	public static function perastike($key) {
		return(isset($_REQUEST) && is_array($_REQUEST) && array_key_exists($key, $_REQUEST));
	}

	public static function den_perastike($key) {
		return !self::perastike($key);
	}

	// Η μέθοδος "perastike_must" επιτάσσει να έχει περαστεί η GET/POST παράμετρος που
	// περνάμε ως πρώτη παράμετρο. Αν έχει περαστεί η παράμετρος, τότε επιστρέφεται η
	// τιμή της παραμέτρου, αλλιώς το πρόγραμμα σταματά.

	public static function perastike_must($key, $msg = NULL) {
		if (self::perastike($key))
		return $_REQUEST[$key];

		print isset($msg) ? $msg : $key . ": δεν περάστηκε παράμετρος";
		self::klise_fige(2);
	}

	// Η μέθοδος "asfales_sql" δέχεται ένα string και επιστρέφει το ίδιο string
	// αλλά τροποποιημένο ώστε να μην τίθεται θέμα SQL injection. Γίνεται επίσης
	// και διαφυγή των quotes. Το string επιστρέφεται μαζί με τα quotes που το
	// περικλείουν, εκτός και αν περάσουμε δεύτερη (false) παράμετρο.

	public static function asfales_sql($s, $string = TRUE) {
		if (get_magic_quotes_gpc())
		$s = stripslashes($s);

		if (isset(self::$db))
		$s = self::$db->real_escape_string($s);

		return($string ? "'" . $s . "'" : $s);
	}

	// Η μέθοδος "asfales_json" δέχεται ως παράμετρο ένα string και το επιστρέφει
	// τροποποιημένο ώστε να μπορεί με ασφάλεια να ενταχθεί ως rvalue σε json objects
	// μαζί με τα quotes.

	public static function asfales_json($s) {
		$s = str_replace("\\", "\\\\", $s);

		return "'" . str_replace("'", "\'", $s) . "'";
	}

	public static function json_encode($x) {
		switch (self::$server) {
		case "http://www.opasopa.net/bbska/":
		case "https://www.opasopa.net/bbska/":
		case "http://opasopa.net/bbska/":
		case "https://opasopa.net/bbska/":
			return json_encode($x);
		default:
			return json_encode($x, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
		}
	}

	// Η μέθοδος "akirosi_script" χρησιμοποιείται για να ακυρώσει τυχόν
	// ενσωματωμένο javascript κώδικα σε μηνύματα και συζητήσεις, και
	// το επιτυγχάνει εισάγοντας χαρακτήρα μηδενικού πλάτους πριν τη
	// λέξη script.

	public static function akirosi_script($s) {
		return preg_replace("/script/i", "&#8203;script", $s);
	}

	public static function email_check($email) {
		return(filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : NULL);
	}

	public static function header_data() {
		header("Content-type: text/plain; charset=utf-8");
	}

	public static function header_json() {
		header("Content-Type: application/json; charset=utf-8");
	}

	public static function header_html() {
		header("Content-type: text/html; charset=utf-8");
	}

	// Η μέθοδος "random_string" επιστρέφει ένα string συγκεκριμένου μήκους, αποτελούμενο
	// από χαρακτήρες που λαμβάνονται από παλέτα.

	public static function random_string($mikos, $paleta =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789") {
		$n = strlen($paleta) - 1;

		for ($s = "", $i = 0; $i < $mikos; $i++)
		$s .= $paleta[mt_rand(0, $n)];

		return $s;
	}
}

class Bbska {
	public static function get_xristis($login) {
		$xristis = new Xristis();
		$xristis->get_xristis($login);
		return($xristis->login === $login ? $xristis : NULL);
	}

	public static function get_monada($kodikos, $opts = NULL) {
		$kodikos = intval($kodikos);
		$monada = new Monada();
		$monada->get_monada($kodikos);
		return($monada->kodikos === $kodikos ? $monada : NULL);
	}
}

class Xristis {
	public function __construct() {
		$this->reset_xristis();
	}

	private function reset_xristis() {
		$this->login = NULL;
		$this->onoma = NULL;
		$this->email = NULL;
		$this->kodikos = NULL;
		$this->root = NULL;
		$this->kalathi = NULL;

		return $this;
	}

	public function get_xristis($login = NULL) {
		$this->reset_xristis();

		if (!$login)
		return $this;

		Globals::database();

		$query = "SELECT `login`, `onoma`, `email`, `kodikos`, `root`, `kalathi` " .
			"FROM `xristis` WHERE `login` LIKE " . Globals::asfales_sql($login);
		$row = Globals::first_row($query, MYSQLI_ASSOC);

		if (!$row)
		return $this;

		$this->login = $row["login"];
		$this->onoma = $row["onoma"];
		$this->email = $row["email"];
		$this->kodikos = $row["kodikos"];
		$this->root = intval($row["root"]);
		$this->kalathi = intval($row["kalathi"]);

		return $this;
	}
}

class Monada {
	public function __construct() {
		$this->reset_monada();
	}

	private function reset_monada() {
		$this->kodikos = NULL;
		$this->xristis = NULL;
		$this->idiotikotita = NULL;
		$this->alist = array();
		$this->tekno = array();

		return $this;
	}

	public function get_monada($kodikos = NULL, $opts = NULL) {
		$this->reset_monada();

		if (!$kodikos)
		return $this;

		Globals::database();

		if ($opts === NULL)
		$opts = array();

		$query = "SELECT `kodikos`, `xristis`, `idiotikotita` " .
			"FROM `monada` WHERE `kodikos` = " . $kodikos;
		$row = Globals::first_row($query, MYSQLI_ASSOC);

		if (!$row)
		return $this;

		$this->kodikos = intval($row["kodikos"]);
		$this->xristis = $row["xristis"];
		$this->idiotikotita = $row["idiotikotita"];

		if (!array_key_exists("alist", $opts))
		$opts["alist"] = TRUE;

		if ($opts["alist"])
		$this->get_monada_alist();

		if (!array_key_exists("tekno", $opts))
		$opts["tekno"] = TRUE;

		if ($opts["tekno"])
		$this->get_monada_tekno();

		return $this;
	}

	public function get_monada_alist() {
		$this->alist = array();

		$query = "SELECT `key`, `val` FROM `attr` WHERE `monada` = " .
			$this->kodikos . " ORDER BY `aa`";
		$res = Globals::query($query);
		if (!$res)
		return $this;

		while ($row = $res->fetch_array(MYSQLI_ASSOC))
		$this->alist[] = new Attribute($row["key"], $row["val"]);

		$res->free();

		return $this;
	}

	public function get_monada_tekno() {
		$this->tekno = array();

		$query = "SELECT `tekno` FROM `organosi` WHERE `goneas` = " .
			$this->kodikos . " ORDER BY `aa`";
		$res = Globals::query($query);
		if (!$res)
		return $this;

		while ($row = $res->fetch_array(MYSQLI_NUM)) {
			$tekno = new Monada();
			$tekno->get_monada($row[0], array(
				"alist" => FALSE,
				"tekno"	=> FALSE,
			));
			$this->tekno[] = $tekno;
		}

		$res->free();

		return $this;
	}

	public function is_prosvasi($login = NULL) {
		if ($this->idiotikotita === "PUBLIC")
		return TRUE;

		if ($login === NULL)
		$login = Globals::session("login");

		return ($login === $this->xristis);
	}

	public function oxi_prosvasi($login = NULL) {
		return !$this->is_prosvasi($login);
	}

	public function prosvasima_tekna($login = NULL) {
		$onket = array();
		$count = count($this->tekno);

		for ($i = 0; $i < $count; $i++) {
			$monada = $this->tekno[$i];

			if ($monada->oxi_prosvasi())
			continue;

			$onket[] = $monada;
		}

		$this->tekno = $onket;
		return $this;
	}

	public function onket_set() {
		$this->onket = array();

		for ($i = count($this->tekno) - 1; $i >= 0; $i--)
		$this->onket[$this->tekno[$i]->kodikos] = $i + 1;

		return $this;
	}

	public function is_terminal() {
		foreach ($this->alist as $attr) {
			if ($attr->key === "_block_")
			return TRUE;
		}

		return FALSE;
	}

	public function is_owner($login = NULL) {
		if ($login === NULL)
		$login = Globals::session("login");

		return ($login === $this->xristis);
	}

	public function oxi_owner($login = NULL) {
		return !$this->is_owner($login);
	}

	//////////////////////////////////////////////////////////////////////////////////@
	//
	// Ακολουθούν μέθοδοι σχετικές με το image caching. Επειδή είναι ασύμφορο
	// κάθε φορά που επισκέπτεται κανείς κάποια μονάδα να τρέχουν όλα τα σχετικά
	// SQL queries, εφαρμόζουμε image caching σε κάθε μονάδα που επισκεπτόμαστε.
	// Αυτό παρακτικά σημαίνει ότι όταν επισκέπτεται κανείς μια μονάδα, το image
	// που θα παραλάβει δεν θα είναι προϊόν SQL queries, αλλά το περιεχόμενο ενός
	// αρχείου στο οποίο έχει κρατηθεί το image από προηγούμενη παρόμοια κλήση.
	//
	// Ο ιδιοκτήτης έχει επιπλέον την ευχέρεια να «μηδενίζει» το cache μέσω του
	// πλήκτρου [Recache] στο επάνω δεξιά μέρος της σελίδας. Οι αλλαγές που κάνει
	// ο ιδιοκτήτης δεν θα γίνουν φανερές στους υπόλοιπους χρήστες εφόσον υπάρχουν
	// ήδη cached images των αιτουμένων μονάδων. Για να «αναγκάσουμε» το πρόγραμμα
	// να παράξει ενημερωμένα cahce image files θα πρέπει να μηδενίσουμε το cache.
	// Ο μηδενισμός του cache δεν είναι τίποτε άλλο παρά η διαγραφή ολοκλήρου του
	// cache directory του συγκεκριμένου χρήστη.
	//
	// Το diretory βάσης όλων των cache files βρίσκεται ένα βήμα πίσω από το www
	// ώστε να μην είναι απευθείας προσβάσιμο από τον έξω κόσμο. Πιο συγκεκριμένα
	// το directory βάσης των cache files βρίσκεται στο ../site/cache. Σ' αυτό το
	// directory δημιουργούνται αυτόματα από το πρόγραμμα subdirectories που φέρουν
	// τα ονόματα των χρηστών και σε κάθε τέτοιο subdirectory δημιουργούνται cache
	// files που φέρουν ως όνομα τον κωδικό της εκάστοτε ριζικής μονάδας. Αν, π.χ.
	// κάποιος χρήστης αιτηθεί την μονάδα 2289111 το χρήστη panos, τότε θα παραλάβει
	// το περιεχόμενο του αρχείου ../site/cache/panos/2289111.public. Αν το αρχείο
	// αυτό δεν υπάρχει, τότε θα εκτελεστούν όλα τα σχετικά SQL queries και ο χρήστης
	// θα παραλάβει απευθείας το αποτέλεσμα αυτών των queries, το οποίο μάλιστα θα
	// κρατηθεί στο cache image file ώστε την επόμενη φορά που κάποιος χρήστης
	// ζητήσει τη συγκεκριμένη μονάδα, να παραλάβει το αποτέλεσμα από το εν λόγω
	// cache file.
	//
	// Αν ο χρήστης που αιτείται κάποια μονάδα είναι ταυτόχρονα και ο ιδιοκτήτης
	// της συγκεκριμένης μονάδας, τότε το όνομα του image cache file έχει παρέκταμα
	// "private" αντί του "public". Ο διαχωρισμός αυτός κρίθηκε αναγκαίος καθώς άλλο
	// image παραλμβάνει ο ιδικοτήτης κάποιας μονάδας και άλλο οι υπόλοιποι χρήστες
	// ή οι ανώνυμοι clients. Αυτό οφείλεται στην ιδιωτικότητα των μονάδων.
	//
	//////////////////////////////////////////////////////////////////////////////////@

	// Η μέθοδος "image_file" επιστρέφει το όνομα του cache file για το image της
	// ανά χείρας μονάδας. Το όνομα του cache file αποτελείται από το cache file
	// directory, το subdirectory που φέρει το login name του ιδιοκτήτη της μονάδας
	// και, τέλος, τον κωδικό της μονάδας ως όνομα του file, ενώ στο τέλος προστίθεται
	// το παρέκταμα ".private" ή ".public" ανάλογα με το αν ο αιτών είναι ο ιδιοκτήτης
	// της μονάδας ή όχι,  π.χ. η μονάδα 2288901 του χρήστη panos θα δώσει ως όνομα του
	// image cache file το:
	//
	//	../site/cache/panos/2288901.public
	//
	// ενώ αν ο αιτών είναι ο ίδιος ο χρήστης panos, το όνομα του image cache file θα
	// είναι το:
	//
	//	../site/cache/panos/2288901.private

	private function image_file() {
		$idiotikotita = $this->is_owner() ? "private" : "public";
		return CACHE_DIR . $this->xristis . "/" . $this->kodikos . "." . $idiotikotita;
	}

	// Η μέθοδος "image_exists" επιστρέφει TRUE εφόσον υπάρχει ήδη cache file για
	// το image της ανά χείρας μονάδας.

	public function image_exists() {
		return file_exists($this->image_file());
	}

	// Η μέθοδος "image_print" αποστέλλει στον client το image της ανά χείρας
	// μονάδας ως περιεχόμενο του σχετικού cache file.

	public function image_print() {
		@readfile($this->image_file());
	}

	// Η μέθοδος "image_create" δημιουργεί το cache file για το image της ανά
	// χείρας μονάδας.

	public function image_create() {
		$dir = CACHE_DIR . $this->xristis;

		if (!is_dir($dir))
		@mkdir($dir);

		if (is_dir($dir))
		@file_put_contents($this->image_file(), ob_get_contents());
	}
}

class Attribute {
	public function __construct($key, $val) {
		$this->key = $key;
		$this->val = $val;

		return $this;
	}
}
?>
