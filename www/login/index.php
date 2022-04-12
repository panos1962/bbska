<?php
require_once("../lib/selida.php");
unset($_SESSION["login"]);

Selida::head();
Selida::stylesheet("login/login");
Selida::javascript("login/login");
Selida::body();
Selida::toolbar();
Selida::ofelimo();
Selida::telos();
?>
