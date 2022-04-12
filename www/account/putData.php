<?php
require_once "../lib/standard.php";
Globals::session_init();

if ($_POST["login"] !== $_SESSION["login"])
Globals::klise_fige(ERRSEP . "UU");

if ($_POST["kodikos1"] !== $_POST["kodikos2"])
Globals::klise_fige(ERRSEP . "DP");

Globals::database();

$query = "UPDATE `xristis` SET " .
"`onoma` = " . Globals::asfales_sql($_POST["onoma"]) . ", ";

if ($_POST["kodikos1"])
$query .= "`kodikos` = " . Globals::asfales_sql(sha1($_POST["kodikos1"])) . ", ";

$query .=
"`email` = " . Globals::asfales_sql($_POST["email"]) . " " .
"WHERE (`login` LIKE " . Globals::asfales_sql($_POST["login"]) . ") " .
"AND (`kodikos` LIKE " . Globals::asfales_sql(sha1($_POST["kodikos"])) . ")";
Globals::query($query);

Globals::klise_fige(Globals::affected_rows() === 1 ? 0 : "Account not updated");

