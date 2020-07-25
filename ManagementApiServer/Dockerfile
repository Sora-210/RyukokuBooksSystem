FROM node:10.12.0-alpine

RUN NODE_ENV=production &&\
    export NODE_ENV &&\
    apk update &&\
    apk upgrade &&\
    apk add --no-cache --virtual .buildtools python make g++ &&\
    apk add netcat-openbsd cairo-dev pkgconfig giflib-dev jpeg-dev pango-dev &&\
    mkdir /home/ManagementAPI

COPY ./ /home/ManagementAPI/

WORKDIR /home/ManagementAPI/

RUN npm update -g &&\
    npm install -g sequelize-cli node-pre-gyp &&\
    npm install &&\
    apk del .buildtools

ENTRYPOINT sh Start.sh

EXPOSE 80