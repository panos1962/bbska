<?php
require_once("../lib/selida.php");
Selida::head();
Dump::favicon();
Selida::stylesheet("dump/dump");
Selida::javascript("dump/dump");
Selida::body();
Selida::toolbar();
Selida::ofelimo();
Selida::telos();

class Dump {
	public static function favicon() {
		?>
		<link rel="icon" type="image/png" href="../ikona/misc/dump.png" />
		<?php
	}
}
?>
