FROM node:14-alpine

ARG dir=/app

WORKDIR $dir

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

CMD yarn install --frozen-lockfile && yarn dev
