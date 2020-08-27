FROM nginx:alpine
COPY ./* /opt/
RUN rm -fr /etc/nginx/conf.d/default.conf &&\
    mkdir /etc/nginx/sslkey &&\
    mv -fv /opt/proxy.conf /etc/nginx/conf.d/proxy.conf &&\
    mv -fv /opt/fullchain.pem /etc/nginx/sslkey/fullchain.pem &&\
    mv -fv /opt/privkey.pem /etc/nginx/sslkey/privkey.pem
ENTRYPOINT nginx -g 'daemon off;'
EXPOSE 80