all:
	@(cd www && make -s)

check:
	@find . -name '*.min.js' -type f -print

cleanup:
	@find . -name '*.min.js' -type f -print -exec rm {} \;
