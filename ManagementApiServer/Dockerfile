FROM node:12.18.1-alpine

RUN apk update &&\
    apk upgrade &&\
    mkdir /home/ManagementAPI

COPY ./ /home/ManagementAPI/

WORKDIR /home/ManagementAPI/

RUN npm update -g &&\
    npm install &&\
    sequelize db:create &&\
    sequelize db:migrate

ENTRYPOINT node run start

EXPOSE 80