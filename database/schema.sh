#! /usr/bin/env sh

progname=`basename $0`

usage() {
	echo "usage: ${progname} [ -d database ] [ -e engine ] [ { -c client } ] [files...]

default database: bbska
default engine: INNODB
default client: cat" >&2
	exit 1
}

errs=
database="bbska"
engine="INNODB"
client="cat"
create=

while getopts ":d:e:c:" arg
do
	case "${arg}" in
	d)
		database="${OPTARG}"
		;;
	e)
		engine="${OPTARG}"
		;;
	c)
		client="${OPTARG}"
		;;
	?)
		echo "${progname}: ${OPTARG}: invalid option" >&2
		errs="yes"
		;;
	esac
done

[ -n "${errs}" ] && usage

shift `expr ${OPTIND} - 1`

if [ -n "${create}" ]; then
	[ $# -gt 0 ] && usage
	set -- schema.sql
fi

sed "/^\-\-/d
/^[ \t]*$/d
s;__DATABASE__;${database};g
s;__ENGINE__;${engine};g" $* | eval "${client}"
