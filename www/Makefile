%.min.js : %.js
	@echo "common/$@: JS compression"
	yui-compressor --verbose --line-break 70 --charset UTF-8 -o $@ $<

all: bbska.min.js
