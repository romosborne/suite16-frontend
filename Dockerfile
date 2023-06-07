FROM node:18 as build

WORKDIR /src/build

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build

FROM caddy:2.6

COPY --from=build /src/build/dist /usr/share/caddy