FROM node:10.12.0-alpine

ARG API_ROOT_PASSWORD=pass

RUN NODE_ENV=production &&\
    export NODE_ENV &&\
    apk update &&\
    apk upgrade &&\
    apk add --no-cache --virtual .buildtools python make g++ &&\
    apk add netcat-openbsd cairo-dev pkgconfig giflib-dev jpeg-dev pango-dev &&\
    mkdir /home/ManagementAPI &&\
    mkdir /home/ManagementAPI/Qrcode

COPY ./ /home/ManagementAPI/

WORKDIR /home/ManagementAPI/

RUN npm update -g &&\
    npm install -g node-pre-gyp &&\
    npm install &&\
    npm run build &&\
    cp -r /home/ManagementAPI/src/config /home/ManagementAPI/build/ &&\
    apk del .buildtools

ENTRYPOINT sh Start.sh

EXPOSE 80