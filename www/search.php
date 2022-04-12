<?php
require_once("lib/standard.php");
Globals::session_init();

Globals::database();

if (!array_key_exists("root", $_POST))
Globals::klise_fige("root missing");

$root = intval($_POST["root"]);

if (!($root = Bbska::get_monada($root)))
Globals::klise_fige();

if ((!array_key_exists("pattern", $_POST)) || (!$_POST["pattern"]))
Globals::klise_fige("pattern missing");

$pattern = $_POST["pattern"];

$success = FALSE;
$kameno = array();
$qcount = 0;

ob_start();
search_pattern($root, $pattern, array_key_exists("level", $_POST) ? intval($_POST["level"]) : 99999);

function search_pattern($root, $pattern, $level) {
	global $success;
	global $kameno;
	global $qcount;

	if (array_key_exists($root->kodikos, $kameno))
	return;

	$kameno[$root->kodikos] = TRUE;

	// Πολύ σημαντικό. Εδώ αποφεύγουμε κόμβους στους οποίους ο ερευνητής
	// δεν έχει πρόσβαση.

	if ($root->oxi_prosvasi())
	return;

	$ante1 = "{k:" . $root->kodikos;
	$post1 = "";

	$qcount++;

	$query = "SELECT SQL_CACHE `key`, `val` FROM `attr` WHERE `monada` = " . $root->kodikos;
	$res = Globals::query($query);

	while ($row = $res->fetch_array(MYSQLI_NUM)) {
		if ((mb_stripos($row[0], $pattern) === FALSE) &&
		(mb_stripos($row[1], $pattern) === FALSE))
		continue;

		$success = TRUE;
		print $ante1 . ",s:1";	// "s" means "success"

		$ante1 = "";
		$post1 = "},";
		break;
	}
	$res->free();

	$ante2 = ",t:[";
	$post2 = "";

	$qcount++;

	$query = "SELECT SQL_CACHE `tekno` FROM `organosi` WHERE `goneas` = " .
		$root->kodikos . " ORDER BY `aa`";
	$res = Globals::query($query);

	if ($res) {
		while ($row = $res->fetch_array(MYSQLI_NUM)) {
			if (!$monada = Bbska::get_monada($row[0]))
			continue;

			print $ante1 . $ante2;

			$ante1 = "";
			$post1 = "},";

			$ante2 = "";
			$post2 = "]";
			
			if ($level > 0)
			search_pattern($monada, $pattern, $level - 1);
		}

		$res->free();
	}

	print $post2 . $post1;
}

if ($success)
Globals::klise_fige();

while (@ob_end_clean());
Globals::klise_fige();
