#!/bin/bash
API_FILE="approval-system-openapi.yaml"

buildServer() {
    rm -rf server
    docker run --rm -v $PWD:/local -u $(id -u):$(id -g) \
    openapitools/openapi-generator-cli generate \
    --global-property apiTests=false \
    --global-property modelTests=false \
    -i /local/${API_FILE} \
    -o /local/server \
    -g nodejs-express-server \
    --additional-properties serverPort=3001
}

buildServer

# buildClient() {
#     docker run --rm -v $PWD:/local -u $(id -u):$(id -g) \
#     openapitools/openapi-generator-cli generate \
#     --global-property apiTests=false \
#     --global-property modelTests=false \
#     -i /local/${API_FILE} \
#     -o /local/client \
#     -g javascript \
#     --additional-properties usePromises=true
# }

# if [ -z "$1" ]
# then
#   echo -e "Usage: \n${0##*/} all \n${0##*/} server \n${0##*/} client"
#   exit 1
# fi

# if [ $1 == all ]
# then
#     buildServer
#     buildClient
# elif [ $1 == server ]
# then
#     buildServer
# elif [ $1 == client ]
# then
#     buildClient
# else
#   echo -e "Usage: \n${0##*/} all \n${0##*/} server \n${0##*/} client"
#   exit 1
# fi

