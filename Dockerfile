FROM node:alpine

RUN apk add --no-cache make gcc g++ python

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 80

CMD [ "node", "server.js"]
