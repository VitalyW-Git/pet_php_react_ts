FROM php:8.1-fpm

RUN apt-get update && apt-get install -y \
    libpq-dev \
    wget \
    zlib1g-dev \
    libmcrypt-dev \
    libzip-dev \
    openssl \
    libpng-dev \
    libicu-dev \
    libfreetype6-dev \
    libjpeg-dev

RUN docker-php-ext-configure intl
RUN docker-php-ext-install mysqli pdo pdo_mysql intl
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

ADD config/docker-php-ext-xdebug.ini /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

WORKDIR /www
