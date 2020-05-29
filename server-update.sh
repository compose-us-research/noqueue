#!/bin/sh

docker-compose build -t noqueue

FILENAME="platzhalterio.latest.tar"

echo "$(date) - Building docker image"
docker build -t composeus/platzhalterio:latest .

echo "$(date) - Exporting docker image"
docker save -o "${FILENAME}" composeus/platzhalterio:latest

echo "$(date) - Zipping file for easier transfer"
gzip "${FILENAME}"

echo "$(date) - Uploading $(du -m ${FILENAME}.gz | cut -f1) mb file to webserver"
scp -v "${FILENAME}.gz" "${USER_NAME}@${SERVER_IP}:/home/${USER_NAME}/platzhalterio"

echo "$(date) - Upload complete, removing local docker image"
rm "${FILENAME}.gz"

echo "$(date) - Deploying the new version"


ssh -l "${USER_NAME}" "${SERVER_IP}" <<EOF
cat <<DEPLOYMENT | bash
set -e

echo "\$(date) - Unzipping uploaded docker file"
gunzip "${FILENAME}.gz"

echo "\$(date) - Loading docker image"
docker load -i "${FILENAME}"

echo "\$(date) - Cleaning up downloaded image"
rm "${FILENAME}"

echo "Update of image complete. Will now restart the server!"

echo "$(date) - Stopping old platzhalterio server"
docker-compose down || echo "Container is not running"
docker rm "platzhalterio" || echo "Container could not be removed (most probably it wasn't running before)"

echo "$(date) - Create if docker volume exists"
if docker volume inspect platzhalterio-data; then
  echo "$(date) - Volume already exists, nothing to do"
else
  echo "$(date) - Creating volume"
  docker volume create platzhalterio-data
  echo "$(date) - Volume created"
fi

echo "$(date) - Start platzhalter.io server"
docker-compose up

DEPLOYMENT
EOF
