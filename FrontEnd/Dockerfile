FROM sora210/alpine-nginx:node10.18.0
RUN mkdir /home/FrontEnd
COPY ./ /home/FrontEnd/
WORKDIR /home/FrontEnd/
RUN mv -fv /home/FrontEnd/dockerConfig/nginx.conf /etc/nginx/nginx.conf &&\
    rm -fr /home/FrontEnd/dockerConfig &&\
    npm update -g && \
    npm install && \
    npm run build
ENTRYPOINT nginx -g 'daemon off;'
EXPOSE 80