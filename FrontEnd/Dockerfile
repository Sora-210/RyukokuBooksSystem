FROM node:12.18.0

RUN curl http://nginx.org/keys/nginx_signing.key | apt-key add - &&\
    apt-get update &&\
    apt-get install nginx -y &&\
    mkdir /home/FrontEnd

COPY ./ /home/FrontEnd/

WORKDIR /home/FrontEnd/

RUN mv -fv /home/FrontEnd/dockerConfig/default /etc/nginx/sites-enabled/ &&\
    rm -fr /home/FrontEnd/dockerConfig &&\
    npm update -g && \
    npm install && \
    npm run build && \
    mv -fv /home/FrontEnd/dist/ /var/www/html/

ENTRYPOINT nginx -g 'daemon off;'

EXPOSE 80