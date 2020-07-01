#!/bin/bash
API_FILE="camunda-openapi.json"

docker run --rm -v $PWD:/local -u $(id -u):$(id -g) \
swaggerapi/swagger-codegen-cli-v3 generate \
-i /local/$API_FILE \
-o /local/client \
-l javascript \
--additional-properties usePromises=true
