<?php
require_once "../lib/standard.php";
Globals::session_init();

foreach ($_POST as $tag => $val) {
	Globals::session_set($tag, $val);
}
?>
