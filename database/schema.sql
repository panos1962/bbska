-- Data Dictionary

-- Στο παρόν script υπάρχουν παράμετροι που καθιστούν ευέλικτη την κατασκευή
-- της database. Πιο συγκεκριμένα:
--
--	__DATABASE__		Είναι το όνομα της database, π.χ. "bbska",
--				"matron" κλπ.
--
--	__ENGINE__		Είναι η default storage engine για τους πίνακες
--				της database, π.χ. "INNODB", "TOKUDB" κλπ. Πρέπει
--				να είναι transactional.

--------------------------------------------------------------------------------------------------------------

\! echo "\ncreating database…"

-- Πρώτο βήμα είναι η διαγραφή της database εφόσον αυτή υπάρχει ήδη.

DROP DATABASE IF EXISTS `__DATABASE__`
;

-- Με το παρόν κατασκευάζουμε την database.

CREATE DATABASE `__DATABASE__`
DEFAULT CHARSET = utf8
DEFAULT COLLATE = utf8_general_ci
;

\! echo "database created!"

-- Καθιστούμε τρέχουσα την database που μόλις κατασκευάσαμε.

USE `__DATABASE__`
;

-- Καθορίζουμε την default storage engine για τους πίνακες που θα δημιουργηθούν.

SET default_storage_engine = __ENGINE__
;

--------------------------------------------------------------------------------------------------------------

\! echo "\ncreating tables…"

-- Ο πίνακας "xristis" περιέχει τους εγγεγραμμένους χρήστες της εφαρμογής. Η εφαρμογή
-- λειτουργεί είτε ανώνυμα είτε επώνυμα. Κατά την ανώνυμη χρήση ο χρήστης έχει πρόσβαση
-- μόνο σε «δημόσιες» πληροφοριακές μονάδες, ενώ κατά την επώνυμη χρήση ο χρήστης έχει
-- επιπλέον πρόσβαση σε δικές του «ιδιωτικές» πληροφοριακές μονάδες, όπως επίσης έχει
-- το δικαίωμα δημουργίας νέων πληροφοριακών μονάδων και τροποποίησης των υφισταμένων
-- πληροφοριακών μονάδων.
--
-- Βασικό στοιχείο του χρήστη είναι το login name το οποίο αποτελεί και το primary key
-- του πίνακα. Το login name ξεκινά από λατινικό γράμμα και μπορεί να περιέχει λατινικά
-- γράμματα, αριθμητικά ψηφία και τα σύμβολα "_", "!", "@", "#", "=", ".", "+" και "-".
-- Κρατάμε την ημερομηνία εγγραφής, ένα email και το password κρυπτογραφημένο σε SHA1.

CREATE TABLE `xristis` (
	`login`		VARCHAR(128) NOT NULL COMMENT 'Login name',
	`egrafi`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Ημερομηνία εγγραφής',
	`onoma`		VARCHAR(128) NOT NULL DEFAULT '' COMMENT 'Πλήρες όνομα χρήστη',
	`email`		VARCHAR(128) NOT NULL DEFAULT '' COMMENT 'e-mail address',

	-- Το password αποθηκεύεται σε SHA1 κρυπτογραφημένη μορφή.

	`kodikos`	CHARACTER(40) COLLATE utf8_bin NOT NULL COMMENT 'Password',

	`root`		BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Αρχική μονάδα χρήστη',
	`kalathi`	BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Καλάθι χρήστη',

	PRIMARY KEY (
		`login`
	) USING BTREE
)

COMMENT = 'Πίνακας χρηστών'
;

-- Ο πίνακας "monada" είναι ο πλέον σημαντικός πίνακας της εφαρμογής και περιέχει τις
-- πληροφοριακές μονάδες της εφαρμογής. Η πληροφοριακή μονάδα αυτή καθαυτή περιέχει μόνο
-- τον κωδικό της μονάδας, το login name του δημιουργού, την ημερομηνία δημιουργίας και
-- το καθεστώς ιδωτικότητας. Το καθεστώς ιδιωτικότητας είναι "SYSTEM", "PRIVATE" και
-- "PUBLIC". Καθεστώς ιδιωτικότητας "SYSTEM" έχουν μόνον οι συστημικές μονάδες, ήτοι οι
-- μονάδες που δημιουργεί αυτόματα το σύστημα για κάθε χρήστη· ουσιαστικά πρόκειται για
-- τη ριζική μονάδα του χρήστη και το «καλάθι» του χρήστη. Όλες οι υπόλοιπες μονάδες
-- δημιουργούνται από τους χρήστες και χαρακτηρίζονται από το δημιουργό τους ως "PRIVATE",
-- ή ως "PUBLIC". Οι "PRIVATE" μονάδες είναι προσπελάσιμες μόνο σε επώνυμη χρήση και μόνο
-- από το δημιουργό τους, ενώ οι "PUBLIC" μονάδες είναι προσπελάσιμες είτε σε επώνυμη,
-- είτε σε ανώνυμη χρήση. Σε κάθε περίπτωση πάντως, τροποποίηση, επαναδιάταξη και διαγραφή
-- μονάδων μπορεί να γίνει μόνο από το δημιουργό, ενώ δημιουργία νέων μονάδων μπορεί να
-- γίνει μόνο από το δημιουργό της πατρικής μονάδας.

CREATE TABLE `monada` (
	`kodikos`	BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary key',
	`xristis`	VARCHAR(128) NULL DEFAULT NULL COMMENT 'Login name χρήστη',
	`idiotikotita`	ENUM (
		'SYSTEM',
		'PRIVATE',
		'PUBLIC'
	) NOT NULL DEFAULT 'PUBLIC' COMMENT 'Ιδιωτικότητα μονάδας',
	`cmtime`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp δημιουργίας/τροποποίησης',

	PRIMARY KEY (
		`kodikos`
	) USING HASH
)

COMMENT = 'Πίνακας μονάδων'
;

-- Ο πίνακας "attr" περιέχει αυτή καθαυτή την πληροφορία κάθε μονάδας, τουτέστιν διατεταγμένα
-- σύνολα key/value pairs τα οποία κατασκευάζει ο χρήστης. Με τον τρόπο αυτό δημιουργούνται
-- δυναμικές εγγραφές (records/rows) όπου μια μονάδα μπορεί να έχει τα Α πεδία, ενώ μια άλλη
-- μονάδα μπορεί να έχει τα Β πεδία, μια τρίτη μονάδα τα Γ πεδία κοκ.

CREATE TABLE `attr` (
	`monada`	BIGINT UNSIGNED NOT NULL COMMENT 'Κωδικός μονάδας',
	`aa`		SMALLINT UNSIGNED NOT NULL COMMENT 'Ordinal number',
	`key`		VARCHAR(10000) NOT NULL COMMENT 'Attribute key',
	`val`		VARCHAR(10000) NOT NULL COMMENT 'Attribute value',

	-- Δεν χρησιμοποιούμε UNIQUE ή PRIMARY KEY σε συνδυασμό με το πεδίο "aa",
	-- προκειμένου να μην έχουμε δυσκολίες στην επαναρίθμηση.

	INDEX (
		`monada`,
		`aa`
	) USING BTREE
)

COMMENT = 'Πίνακας στοιχείων μονάδας'
;

-- Ο πίνακας "organosi" περιέχει τα στοιχεία εκείνα που οργανώνουν τις μονάδες σε δενδροειδείς
-- δομές, δημιουργώντας την αίσθηση ότι κάθε μονάδα έχει «παιδιά», ήτοι μονάδες που «κρέμονται»
-- κάτω από «γονικές» μονάδες, οι οποίες με τη σειρά τους «κρέμονται» κάτω από άλλες «γονικές»
-- μονάδες κοκ.

CREATE TABLE `organosi` (
	`goneas`	BIGINT UNSIGNED NOT NULL COMMENT 'Πατρική μονάδα',
	`aa`		SMALLINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Ordinal number',
	`tekno`		BIGINT UNSIGNED NOT NULL COMMENT 'Κωδικός μονάδας',

	PRIMARY KEY (
		`goneas`,
		`tekno`
	) USING BTREE,

	INDEX (
		`tekno`
	) USING HASH
)

COMMENT = 'Πίνακας συσχετισμού μονάδων'
;

COMMIT WORK;

\! echo "tables created!"

--------------------------------------------------------------------------------------------------------------

\! echo "\ncreating relations…"

ALTER TABLE `monada` ADD FOREIGN KEY (
	`xristis`
) REFERENCES `xristis` (
	`login`
) ON UPDATE CASCADE ON DELETE CASCADE
;

ALTER TABLE `attr` ADD FOREIGN KEY (
	`monada`
) REFERENCES `monada` (
	`kodikos`
) ON UPDATE CASCADE ON DELETE CASCADE
;

ALTER TABLE `organosi` ADD FOREIGN KEY (
	`goneas`
) REFERENCES `monada` (
	`kodikos`
) ON UPDATE CASCADE ON DELETE CASCADE
;

ALTER TABLE `organosi` ADD FOREIGN KEY (
	`tekno`
) REFERENCES `monada` (
	`kodikos`
) ON UPDATE CASCADE ON DELETE CASCADE
;

COMMIT WORK;

\! echo "database relations created!"

--------------------------------------------------------------------------------------------------------------

\! echo "\ninserting data…"

INSERT INTO `xristis` (`login`, `onoma`, `kodikos`, `root`, `kalathi`) VALUES
('bbska', 'System account', 'b60d121b438a380c343d5ec3c2037564b82ffef3', 2, 3);

INSERT INTO `monada` (`kodikos`, `xristis`, `idiotikotita`) VALUES
-- Η μονάδα "1" είναι ο γονέας όλων των συστημικών μονάδων.
(1, 'bbska', 'SYSTEM'),
-- Η μονάδα "2" είναι η αρχική μονάδα του system account "bbska".
(2, 'bbska', 'PUBLIC'),
-- Η μονάδα "3" είναι το καλάθι του system account "bbska".
(3, 'bbska', 'SYSTEM');

-- Εντάσσουμε τις μέχρι στιγμής συστημικές μονάδες στη μονάδα "1"
-- με μηδενικό αριθμό ταξινόμησης (default).

INSERT INTO `organosi` (`goneas`, `tekno`) VALUES
(1, 1),
(1, 2),
(1, 3);

COMMIT WORK;
