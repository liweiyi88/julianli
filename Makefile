FIG=docker-compose
RUN=$(FIG) run --rm app
EXEC=$(FIG) exec app
CONSOLE=bin/console
DEBUG=docker exec -it app bash

.DEFAULT_GOAL := help
.PHONY: help start stop reset db db-diff db-migrate db-rollback db-load watch clear clean build up perm cc
help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

##
## Project setup
##---------------------------------------------------------------------------
start:          ## Install and start the project
start: build up db perm .env

stop:           ## Remove docker containers
	$(FIG) rm -v --force --stop

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

# Internal rules

build:
	$(FIG) build

up:
	$(FIG) up -d

perm:
	-$(EXEC) chmod -R 777 var

# Rules from files

vendor: composer.lock
	@$(RUN) composer install

composer.lock: composer.json
	@echo compose.lock is not up to date.

.env: .env.dist
	@$(RUN) composer run-script post-install-cmd
##
## Tests
##---------------------------------------------------------------------------
ssh:
	$(DEBUG)
##