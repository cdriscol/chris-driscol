lint: yarn lint

local:
	yarn && yarn update-schema && yarn relay-compiler && yarn start

.PHONY: lint
