FROM node:14-alpine

WORKDIR /app

COPY . .

RUN yarn install
