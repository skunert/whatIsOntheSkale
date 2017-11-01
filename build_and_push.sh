#!/bin/sh

APP_ID=<your app id>
USER_ID=<your-id>

# Login
docker login -u "$USER_ID" registry.geeny.io
# Build your docker image:
docker build -t "registry.geeny.io/$APP_ID" -f Dockerfile .
# Push your image to Geeny registry:
docker push "registry.geeny.io/$APP_ID"
