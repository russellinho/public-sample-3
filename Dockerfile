# Common build stage
FROM node:16-alpine as common-build-stage

COPY . ./app

WORKDIR /app

ADD .env.production .env.local

RUN apk add --no-cache git openssh libc6-compat
RUN rm -f package-lock.json && rm -f yarn.lock && yarn install && yarn run build

EXPOSE 3000

# Production build stage
FROM common-build-stage as production-build-stage

CMD ["yarn", "run", "start"]