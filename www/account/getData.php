<?php
require_once "../lib/standard.php";
Globals::session_init();

if ($_POST["login"] !== $_SESSION["login"])
Globals::klise_fige();

Globals::database();

$query = "SELECT `onoma`, `email`, `kodikos` FROM `xristis` WHERE (`login` LIKE " .
	Globals::asfales_sql($_POST["login"]) . ")";
$row = Globals::first_row($query);

if (!$row)
Globals::klise_fige();

print
"onoma: " . Globals::asfales_sql($row[0]) . "," .
"email: " . Globals::asfales_sql($row[1]) . "," ;
Globals::klise_fige();
