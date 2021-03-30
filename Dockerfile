FROM node:12.18.1

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 5000

CMD [ "yarn", "start:dev" ]

