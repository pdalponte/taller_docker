#!/bin/bash

# ver creacion de la red
# se asume que ya esta creada

docker container run \
--rm \
-d \
-p 27017:27017 \
-v mongo-data:/data/db \
-v mongo-config:/data/configdb \
--name db_server \
--network mired \
db_server

docker container run \
--rm \
-d \
-p 8000:8000 \
-e DB_HOST=db_server \
--name application_server \
--network mired \
application_server

docker container run \
--rm \
-d \
-p 8080:80 \
-v $PWD/.htpasswd:/srv/www/html/.htpasswd \
--name web_server \
--network mired \
web_server
