FROM ubuntu:16.04

ENV LANG="en_US.UTF-8" \
    LC_ALL="en_US.UTF-8" \
    LANGUAGE="en_US.UTF-8" \
    TERM="xterm" \
    DEBIAN_FRONTEND="noninteractive" \
    SYMFONY_ALLOW_APPDEV=1 \
    NODE_VERSION=6.9.4 \
    COMPOSER_ALLOW_SUPERUSER=1

EXPOSE 80
WORKDIR /app

RUN apt-get update -q && \
    apt-get install -qy software-properties-common language-pack-en-base && \
    export LC_ALL=en_US.UTF-8 && \
    export LANG=en_US.UTF-8 && \
    add-apt-repository ppa:ondrej/php && \
    apt-get update -q && \
    apt-get install --no-install-recommends -qy \
        ca-certificates \
        cron \
        curl \
        nano \
        vim \
        nginx \
        git \
        graphviz \
        mysql-client \
        php7.2 \
        php7.2-bcmath \
        php7.2-common \
        php7.2-curl \
        php7.2-dom \
        php7.2-fpm \
        php7.2-gd \
        php7.2-iconv \
        php7.2-intl \
        php7.2-json \
        php7.2-mbstring \
        php7.2-mysql \
        php7.2-pdo \
        php7.2-phar \
        php7.2-sqlite \
        php7.2-xdebug \
        php7.2-xml \
        php7.2-zip \
        php-apcu \
        php-uuid \
        supervisor \
        tzdata \
        wget && \

    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \

    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && \

    mkdir /run/php

COPY php.ini /etc/php/7.2/cli/conf.d/50-setting.ini
COPY pool.conf /etc/php/7.2/fpm/pool.d/www.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY symfony.conf /etc/nginx/symfony.conf
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]