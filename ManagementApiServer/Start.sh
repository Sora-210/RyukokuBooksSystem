# /bin/sh

/bin/ping 172.0.0.3 -c 1 >> /dev/null
while [$? == 1]
do
    /bin/ping 172.0.0.3 -c 1 >> /dev/null
done


sequelize db:create
sequelize db:migrate


npm start