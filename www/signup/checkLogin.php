<?php
require_once "../lib/standard.php";

if (!$_POST["login"])
Globals::klise_fige();

Globals::database();

$query = "SELECT `login` FROM `xristis` WHERE `login` LIKE " .
	Globals::asfales_sql($_POST["login"]);
Globals::klise_fige(Globals::first_row($query) ? "X" : 0);
