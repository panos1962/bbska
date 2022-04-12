<?php
require_once "../lib/standard.php";
Globals::session_init();
unset($_SESSION["login"]);

if (!array_key_exists("login", $_POST))
Globals::klise_fige(ERRSEP . "Missing login name");

if (!array_key_exists("kodikos", $_POST))
Globals::klise_fige(ERRSEP . "Missing password");

Globals::database();

$query = "SELECT `login` FROM `xristis` WHERE (`login` LIKE " .
	Globals::asfales_sql($_POST["login"]) . ") AND (`kodikos` LIKE " .
	Globals::asfales_sql(sha1($_POST["kodikos"])) . ")";
$row = Globals::first_row($query);

if (!$row)
Globals::klise_fige(ERRSEP . "Access denied!");

$_SESSION["login"] = $_POST["login"];
Globals::klise_fige();
