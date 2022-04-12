<?php
require_once "../lib/standard.php";
Globals::session_init();

if ($_POST["robot"] !== $_POST["tobor"])
Signup::fatal("WA");

if ($_POST["kodikos"] !== $_POST["kodikos2"])
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

$query = "INSERT INTO `organosi` (`goneas`, `tekno`) VALUES " .
	"(1, " . $root . "), " .
	"(1, " . $kalathi . ");";
Globals::$db->query($query);
if (Globals::affected_rows() != 2)
Signup::fatal("FIO");

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
		$query = "INSERT INTO `monada` (`xristis`, `idiotikotita`) VALUES (" .
			self::$slogin . ", 'SYSTEM')";
		Globals::$db->query($query);

		if (Globals::affected_rows() != 1)
		Signup::fatal("FCU");

		return Globals::insert_id();
	}

	public static function fatal($msg = "ERROR") {
		Globals::klise_fige(ERRSEP . $msg);
	}
}
