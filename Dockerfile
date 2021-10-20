FROM node:14-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN if [ "$NODE_ENV" = "production" ]; then yarn build; fi

CMD yarn install --frozen-lockfile && yarn dev
