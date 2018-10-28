DOCKER_COMPOSE?=docker-compose
RUN=$(DOCKER_COMPOSE) run --rm app
EXEC?=$(DOCKER_COMPOSE) exec app
COMPOSER=$(EXEC) composer
CONSOLE=bin/console
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

reset:          ## Reset the whole project
reset: stop start

clear:          ## Remove all the cache, the logs, the sessions and the built assets
clear: perm
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

build:
	$(DOCKER_COMPOSE) build

up:
	$(DOCKER_COMPOSE) up -d

perm:
	-$(EXEC) chmod -R 777 var

vendor:
	$(COMPOSER) install -n

ssh:
	$(DEBUG)