<?php
require_once("../lib/selida.php");
Selida::head();
Data::favicon();
Selida::stylesheet("dump/data");
Selida::javascript("dump/data");
Data::setup();
Selida::body();
Selida::telos();

class Data {
	public static function setup() {
		Selida::javascript_begin();
		?>
		Data.klist = [];
		Data.plist = [];
		Data.root = <?php print array_key_exists("root", $_REQUEST) ? intval($_REQUEST["root"]) : 2; ?>;<?php

		$klist = $_REQUEST["key"];
		$plist = $_REQUEST["pat"];

		$n = count($klist);
		for ($i = 0; $i < $n; $i++ ) {
			if (!$klist[$i])
			continue;

			?>
			Data.klist.push(<?php print Globals::asfales_json($klist[$i]); ?>);
			Data.plist.push(<?php print Globals::asfales_json($plist[$i]); ?>);
			<?php
		}

		Selida::javascript_end();
	}

	public static function favicon() {
		?>
		<link rel="icon" type="image/png" href="../ikona/misc/dump.png" />
		<?php
	}
}
?>
