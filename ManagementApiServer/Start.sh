# /bin/sh

IP="172.0.1.3"
PORT="3306"
WAITSET="10"

echo "Waiting 30 seconds..."
sleep 30
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