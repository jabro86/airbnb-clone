#! /bin/bash
yarn build:server
docker build -t jabro86/abb:latest .
docker push jabro86/abb:latest
ssh root@46.101.194.52 "docker pull jabro86/abb:latest && docker tag jabro86/abb:latest dokku/abb:latest && dokku tags:deploy abb latest"