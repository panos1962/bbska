<?php
require_once("../lib/selida.php");
unset($_SESSION["login"]);

Selida::head();
Selida::stylesheet("signup/signup");
Selida::javascript("signup/signup");
Selida::body();
Selida::toolbar();
Selida::ofelimo();
Selida::telos();
?>
