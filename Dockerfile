FROM node:14-alpine

ARG production
ARG dir=/app

WORKDIR $dir

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN if [[ -n "$production" ]]; then yarn build; fi

CMD yarn install --frozen-lockfile && yarn dev
