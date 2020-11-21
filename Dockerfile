FROM node:14-alpine

WORKDIR /app
COPY . .

WORKDIR /app/packages/backend
RUN yarn install

WORKDIR /app/packages/frontend
RUN yarn install
