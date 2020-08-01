#!/usr/bin/env bash


docker-compose build
# docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# docker-compose -f docker-compose.yml -f docker-compose.prod.yml up  --build --force-recreate php_websocket

docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build --force-recreate php_websocket
