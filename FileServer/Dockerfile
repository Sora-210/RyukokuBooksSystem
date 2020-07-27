FROM nginx:alpine

COPY ./* /opt/

RUN rm -fr /etc/nginx/conf.d/default.conf &&\
    mkdir /opt/Qrcode &&\
    mv -fv /opt/file.conf /etc/nginx/conf.d/file.conf

ENTRYPOINT nginx -g 'daemon off;'

EXPOSE 80