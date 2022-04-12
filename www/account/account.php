<?php
require_once "../lib/standard.php";
Globals::session_init();

if ($_POST["kodikos1"] !== $_POST["kodikos2"])
Signup::fatal("WP");

Signup::login_check();

Globals::database();
Globals::autocommit(FALSE);

$query = "INSERT INTO `xristis` (`login`, `kodikos`) VALUES (" .
	Signup::$slogin . ", " . Globals::asfales_sql(sha1($_POST["kodikos"])) . ")";
Globals::$db->query($query);
if (Globals::affected_rows() != 1)
Signup::fatal("FCA");

$root = Signup::add_monada();
$kalathi = Signup::add_monada();

$query = "UPDATE `xristis` SET " .
	"`root` = " . $root . ", " .
	"`kalathi` = " . $kalathi . " " .
	"WHERE `login` LIKE " . Signup::$slogin;
Globals::$db->query($query);
if (Globals::affected_rows() != 1)
Signup::fatal("FUA");

Globals::commit();

$_SESSION["login"] = $_POST["login"];
Globals::klise_fige();

class Signup {
	public static $slogin;

	public static function login_check() {
		if (!array_key_exists("login", $_POST))
		Signup::fatal("LNM");

		self::$slogin = Globals::asfales_sql($_POST["login"]);
	}

	public static function add_monada() {
		$query = "INSERT INTO `monada` (`xristis`) VALUES (" . self::$slogin . ")";
		Globals::$db->query($query);

		if (Globals::affected_rows() != 1)
		Signup::fatal("FCU");

		return Globals::insert_id();
	}

	public static function fatal($msg = "ERROR") {
		Globals::klise_fige(ERRSEP . $msg);
	}
}
