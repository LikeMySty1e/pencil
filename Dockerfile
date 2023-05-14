FROM node:16.19.0-alpine as build
RUN mkdir /app
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install
COPY . /app/
RUN yarn run build --max-old-space-size=4096 --verbose

CMD ["yarn", "serve", "-s", "build"]



