FROM node:18-alpine

RUN apk update && apk add postgresql-client

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
