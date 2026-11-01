CSS_HASH := $(shell GIT_DIR=mkdocs-amyy/amyy_theme/css/.git git rev-parse --short HEAD)

build:
	mkdocs build
	cp -r root/* site

serve:
	mkdocs serve

clean:
	rm -rf site

release: clean
	STATIC_LOCATION=/static/docs CSS_LOCATION=/static/amyy-css/$(CSS_HASH) JS_LOCATION=/static/amyy.me/js mkdocs build
	cp -r root/* site
