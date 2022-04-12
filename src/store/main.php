<?php
$root = 1;
init();
walk($root);

function init() {
	$bbska = getenv("BBSKA");

	if (!isset($bbska))
	die("BBSKA: enviroment variable not defined\n");

	$lib = $bbska . "/www/lib/standard.php";
	if (!file_exists($lib))
	die($lib . ": file not found");

	require_once($lib);
	Globals::database();
}

function walk($root = 1) {
	$query = "SELECT * FROM `monada` WHERE `kodikos` = " . $root;
	$monada = Globals::first_row($query, MYSQLI_ASSOC);
	print Globals::json_encode($monada);

	$query = "SELECT * FROM `attr` WHERE `monada` = " . $root . " ORDER BY `aa`";
	$res = Globals::query($query);

	while ($row = $res->fetch_array(MYSQLI_ASSOC))
	print Globals::json_encode($row);

	$res->free(0);
}
?>
