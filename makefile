test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require should \
		--reporter spec \
		--harmony \
		--bail \
		api/*/test.js
start:
	@NODE_ENV=development
	rethinkdb --http-port 9090 &
	forever -w -c "node --harmony" app.js

.PHONY: test
.PHONY: start
