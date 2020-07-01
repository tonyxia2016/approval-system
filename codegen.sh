#! /bin/bash

docker run --rm -v $PWD:/local -u $(id -u):$(id -g) \
swaggerapi/swagger-codegen-cli-v3 \
generate \
-i /local/approval-process-openapi.yaml \
-o /local/swagger/client \
-l javascript \
--additional-properties usePromises=true