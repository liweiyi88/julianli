DOCKER_COMPOSE?=docker-compose
RUN=$(DOCKER_COMPOSE) run --rm app
EXEC?=$(DOCKER_COMPOSE) exec app
COMPOSER=$(EXEC) composer
CONSOLE=bin/console
PHPSTAN=$(EXEC) vendor/bin/phpstan analyse -l 4 -c phpstan.neon src
PHPCS=$(EXEC) vendor/bin/phpcs --standard=PSR2 src --ignore=src/Migrations,src/DataFixtures
PHPUNIT=$(EXEC) vendor/bin/simple-phpunit
ESLINT=$(EXEC) node_modules/.bin/eslint assets
DEBUG=docker exec -it app bash

.DEFAULT_GOAL := help
.PHONY: help start stop reset db clear clean build up perm cc vendor
help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

##
## Project setup
##---------------------------------------------------------------------------
start:          ## Install and start the project
start: build up db perm vendor

stop:           ## Remove docker containers
	$(DOCKER_COMPOSE) rm -v --force --stop

assets:
assets-prod: node_modules
	$(EXEC) yarn encore production

reset:          ## Reset the whole project
reset: stop start

clear:          ## Remove all the cache, the logs, the sessions and the built assets
clear: perm rm-docker-dev.lock
	-$(EXEC) rm -rf var/cache/*
	-$(EXEC) rm -rf var/sessions/*
	-$(EXEC) rm -rf supervisord.log supervisord.pid npm-debug.log .tmp
	-$(EXEC) $(CONSOLE) redis:flushall -n
	rm -rf var/logs/*

clean:          ## Clear and remove dependencies
clean: clear
	rm -rf vendor node_modules

cc:             ## Clear the cache in dev env
cc:
	$(RUN) $(CONSOLE) cache:clear --no-warmup
	$(RUN) $(CONSOLE) cache:warmup
##
## Database
##---------------------------------------------------------------------------

db:             ## Reset the database and load fixtures
db: vendor
	$(RUN) php -r "for(;;){if(@fsockopen('db',3306)){break;}}" # Wait for MySQL
	$(RUN) $(CONSOLE) doctrine:database:create --if-not-exists
	$(RUN) $(CONSOLE) doctrine:migrations:migrate --no-interaction
	$(RUN) $(CONSOLE) doctrine:fixtures:load --no-interaction -q

build: docker-dev.lock

docker-dev.lock: $(DOCKER_FILES)
	$(DOCKER_COMPOSE) pull --ignore-pull-failures
	$(DOCKER_COMPOSE) build --force-rm --pull
	touch docker-dev.lock

rm-docker-dev.lock:
	rm -f docker-dev.lock

up:
	$(DOCKER_COMPOSE) up -d --remove-orphans

perm:
	-$(EXEC) chmod -R 777 var

vendor:
	$(COMPOSER) install -n

node_modules: yarn.lock
	$(EXEC) yarn install

ssh:
	$(DEBUG)

##
## CI Pipeline
##---------------------------------------------------------------------------
ci: eslint test-phpunit phpcs phpstan

eslint:
	$(ESLINT)

test-phpunit:
	$(PHPUNIT)

phpstan:
	$(PHPSTAN)

phpcs:
	$(PHPCS)