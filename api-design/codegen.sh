#!/bin/bash
API_FILE="$PWD/approval-system-openapi.yaml"
OUTPUT_DIR="$(dirname $PWD)/server"

buildServer() {
    
    docker run --rm -u $(id -u):$(id -g) \
     -v $OUTPUT_DIR:/output \
     -v $API_FILE:/openapi.yaml \
    openapitools/openapi-generator-cli generate \
    --global-property apiTests=false \
    --global-property modelTests=false \
    -i /openapi.yaml \
    -o /output \
    -g nodejs-express-server

    prettier --write $OUTPUT_DIR
}

buildServer
