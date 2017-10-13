#!/bin/sh

# Login
docker login -u diego@geeny.io registry.geeny.io
# Build your docker image:
docker build -t "registry.geeny.io/8eb9019d-46fc-4a26-848f-c011806cb2dc" -f Dockerfile .
# Push your image to Geeny registry:
docker push "registry.geeny.io/8eb9019d-46fc-4a26-848f-c011806cb2dc"