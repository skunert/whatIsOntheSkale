#!/bin/sh

APP_ID=8eb9019d-46fc-4a26-848f-c011806cb2dc
USER_ID=diego@geeny.io

# Login
docker login -u "$USER_ID" registry.geeny.io
# Build your docker image:
docker build -t "registry.geeny.io/$APP_ID" -f Dockerfile .
# Push your image to Geeny registry:
docker push "registry.geeny.io/$APP_ID"
