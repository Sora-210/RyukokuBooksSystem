FROM node:10.12.0-alpine

RUN NODE_ENV=production &&\
    export NODE_ENV &&\
    apk update &&\
    apk upgrade &&\
    apk add python pkgconfig giflib-dev cairo-dev jpeg-dev pango-dev make g++ &&\
    mkdir /home/ManagementAPI

COPY ./ /home/ManagementAPI/

WORKDIR /home/ManagementAPI/

RUN npm update -g &&\
    npm install -g sequelize-cli node-pre-gyp &&\
    npm install

ENTRYPOINT sh Start.sh

EXPOSE 80