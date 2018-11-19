#!/usr/bin/env bash
echo "Running phpcs...";
./vendor/bin/phpcs --standard=PSR2 src --ignore=src/Migrations,src/DataFixtures
echo "Running phpstan...";
./vendor/bin/phpstan analyse -l 4 -c phpstan.neon src
echo "Running phpunit...";
./vendor/bin/simple-phpunit
echo "Running eslint"
./node_modules/.bin/eslint assets