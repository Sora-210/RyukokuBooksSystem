# /bin/sh

IP="172.0.1.3"
PORT="3306"
WAITSET="2"

sleep 20
nc -vz ${IP} ${PORT} >> /dev/null
while :
do
    if [ "$?" = "0" ]; then
        echo "OK"
        break
    else
        echo "NG"
        echo "Waiting ${WAITSEC} seconds..."
        sleep ${WAITSEC}
        nc -vz ${IP} ${PORT}  >> /dev/null
    fi
done

echo "Start Application"
npm run start