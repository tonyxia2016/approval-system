#!/bin/bash
API_FILE="approval-process-openapi.yaml"

buildServer() {
    docker run --rm -v $PWD:/local -u $(id -u):$(id -g) \
    swaggerapi/swagger-codegen-cli-v3 \
    generate \
    -i /local/${API_FILE} \
    -o /local/swagger/server \
    -l nodejs-server
}

buildClient() {
    docker run --rm -v $PWD:/local -u $(id -u):$(id -g) \
    swaggerapi/swagger-codegen-cli-v3 \
    generate \
    -i /local/${API_FILE} \
    -o /local/swagger/client \
    -l javascript \
    --additional-properties usePromises=true
}

if [ -z "$1" ]
then
  echo -e "Usage: \n${0##*/} all \n${0##*/} server \n${0##*/} client"
  exit 1
fi

if [ $1 == all ]
then
    buildServer
    buildClient
elif [ $1 == server ]
then
    buildServer
elif [ $1 == client ]
then
    buildClient
else
  echo -e "Usage: \n${0##*/} all \n${0##*/} server \n${0##*/} client"
  exit 1
fi

