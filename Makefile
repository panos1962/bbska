all:
	@(cd www && make -s)

status:
	git status

diff:
	git diff

pull:
	git pull

commit:
	git commit -m "modifications" . ; true

push:
	git push

check:
	@find . -name '*.min.js' -type f -print

cleanup:
	@find . -name '*.min.js' -type f -print -exec rm {} \;
