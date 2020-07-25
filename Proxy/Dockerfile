FROM nginx:alpine

COPY proxy.conf /etc/nginx/conf.d/

RUN rm -fr /etc/nginx/conf.d/default.conf

ENTRYPOINT nginx -g 'daemon off;'

EXPOSE 80