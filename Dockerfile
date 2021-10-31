FROM node:14-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

CMD yarn install --frozen-lockfile && yarn dev
