#!/usr/bin/env bash

set -e

if [ ! -r ".envfile" ]; then
  echo "Please create and use the .envfile to set all variables"
  exit 1
fi

source .envfile

if [ -z "${SERVER_IP}" ]; then
  echo "Need to set SERVER_IP - can be a hostname as well"
  exit 1
fi
if [ -z "${USER_NAME}" ]; then
  echo "Need to set USER_NAME - to have a user to login into your server"
  exit 1
fi
if [ -z "${USER_PASS}" ]; then
  echo "Need to set USER_PASS - to have a password on the user"
  exit 1
fi
if [ -z "${GITHUB_USER}" ]; then
  echo "Need to set GITHUB_USER - to grab the ssh-key"
  exit 1
fi
if [ -z "${LETS_ENCRYPT_EMAIL}" ]; then
  echo "Need to set LETS_ENCRYPT_EMAIL - as contact for lets encrypt certificate"
  exit 1
fi
if [ -z "${TRAEFIK_DASHBOARD_USERS}" ]; then
  echo "Need to set TRAEFIK_DASHBOARD_USERS - as string compatible with docker-compose (escape dollar sign with dollar sign!)"
  exit 1
fi
if [ -z "${TRAEFIK_HOSTNAME}" ]; then
  echo "Need to set TRAEFIK_HOSTNAME - for traefik dashboard"
  exit 1
fi

cat <<PREPARATION > tmp_install_02.sh
set -e

echo "\$(date) - Continuing as user"
whoami

echo "\$(date) - Creating folder for platzhalterio"
mkdir -p "/home/${USER_NAME}/platzhalterio"

echo "\$(date) - Creating folder for traefik and letsencrypt"
mkdir -p "/home/${USER_NAME}/traefik"
mkdir -p "/home/${USER_NAME}/traefik/letsencrypt"
PREPARATION

cat <<EOF_DOCKER_COMPOSE > tmp_traefik_docker-compose.yml
version: '3'

networks:
  web:
    external: true

services:

  reverse-proxy:
    image: traefik:v2.2
    restart: unless-stopped
    command:
      - "--api=true"
      - "--api.dashboard=true"
      - "--api.insecure=false"
      # Enabling docker provider
      - "--providers.docker=true"
      # Do not expose containers unless explicitly told so
      - "--providers.docker.exposedbydefault=false"
      - "--providers.docker.network=web"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.web.http.redirections.entryPoint.to=websecure"
      - "--entrypoints.web.http.redirections.entryPoint.scheme=https"
      - "--entrypoints.web.http.redirections.entrypoint.permanent=true"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.leresolver.acme.tlschallenge=true"
      - "--certificatesresolvers.leresolver.acme.email=${LETS_ENCRYPT_EMAIL}"
      - "--certificatesresolvers.leresolver.acme.storage=/letsencrypt/acme.json"
    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=web"
      - "traefik.http.routers.apisecure.service=api@internal"
      - "traefik.http.routers.apisecure.rule=Host(\`${TRAEFIK_HOSTNAME}\`)"
      - "traefik.http.routers.apisecure.entrypoints=websecure"
      - "traefik.http.routers.apisecure.tls.certresolver=leresolver"
      - "traefik.http.routers.apisecure.middlewares=auth"
      - "traefik.http.middlewares.auth.basicauth.users=${TRAEFIK_DASHBOARD_USERS}"
      # global redirect to https
      - "traefik.http.routers.http-catchall.rule=HostRegexp(\`{host:.+}\`)"
      - "traefik.http.routers.http-catchall.entrypoints=web"
      - "traefik.http.routers.http-catchall.middlewares=redirect-to-https@docker"
      # middleware redirect
      - "traefik.http.middlewares.redirect-to-https.redirectscheme.scheme=https"
      - "traefik.http.middlewares.redirect-to-https.headers.sslProxyHeaders=X-Forwarded-Proto:https"
    networks:
      - web
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - "../traefik/letsencrypt:/letsencrypt"
      - "/var/run/docker.sock:/var/run/docker.sock:ro"
EOF_DOCKER_COMPOSE

cat <<EOF > tmp_install_03.sh
set -e

echo "\$(date) - Checking if docker is installed"
if ! [ -x "\$(command -v docker)" ]; then
  apt-get update
  apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
  apt-key fingerprint 0EBFCD88
  add-apt-repository \
    "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
    \$(lsb_release -cs) \
    stable"

  apt-get update
  apt-get install -y docker-ce
  echo "\$(date) - Adding docker group"
  groupadd docker || echo "Docker group exists already?"
  echo "\$(date) - Enable docker in systemd"
  systemctl enable docker
  echo "\$(date) - Start docker through systemd"
  systemctl start docker
fi

echo "\$(date) - Adding user $USER_NAME to docker group"
usermod -aG docker "$USER_NAME"

echo "\$(date) - Checking for wget"
if ! [ -x "\$(command -v wget)" ]; then
  echo "wget not installed. Trying to change that."
  apt-get update
  apt-get install -y wget
fi

echo "\$(date) - Checking for gunzip"
if ! [ -x "\$(command -v gunzip)" ]; then
  echo "gzip not installed. Trying to change that."
  apt-get update
  apt-get install -y gzip
fi

echo "\$(date) - Checking for docker-compose"
if ! [ -x "\$(command -v docker-compose)" ]; then
  echo "docker-compose not installed. Trying to change that."
  curl -L "https://github.com/docker/compose/releases/download/1.25.5/docker-compose-\$(uname -s)-\$(uname -m)" -o /usr/local/bin/docker-compose
  chmod +x /usr/local/bin/docker-compose
fi

echo "\$(date) - Updating server"
apt-get update
apt-get upgrade -y

echo "\$(date) - Setting up ufw"
if ! [ -x "\$(command -v ufw)" ]; then
  apt-get update
  apt-get install -y ufw
fi
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow http
ufw allow https
ufw limit ssh/tcp
echo "\$(date) - Enabling ufw"
yes | ufw enable

echo "\$(date) - Setting up traefik"
cd /home/${USER_NAME}/traefik
docker network create --driver=bridge --attachable --internal=false web
echo "\$(date) - Starting traefik"
docker-compose up -d

echo "\$(date) - Installation complete. Server can now be deployed, but first: We REBOOT!"
shutdown --reboot 0
EOF

echo "$(date) - Run installation script 1/3 (as root) - create user to work with"
ssh -t "root@${SERVER_IP}" <<EOF
cat <<HARDENING | bash
set -e
echo "\$(date) - Hardening: Create user, add ssh key, remove direct root access"
echo "\$(date) - Creating administrative user"
useradd -m --shell /bin/bash -G sudo "${USER_NAME}"
echo "${USER_NAME}:${USER_PASS}" | chpasswd
echo "\$(date) - Importing ssh key from GitHub"
su -c "ssh-import-id 'gh:${GITHUB_USER}'" "${USER_NAME}"
echo "\$(date) - Disable password authentication for SSH"
sed -i 's/^#\\?PasswordAuthentication\\s\\+yes/PasswordAuthentication no/g' /etc/ssh/sshd_config
sed -i 's/^#\\?PermitRootLogin\\s\\+yes/PermitRootLogin no/g' /etc/ssh/sshd_config
echo "\$(date) - Reloading sshd"
systemctl reload sshd
HARDENING
EOF

echo "$(date) - Copying installation scripts"
scp tmp_install_*.sh "${USER_NAME}@${SERVER_IP}:/home/${USER_NAME}"
rm tmp_install_*.sh

echo "$(date) - Run installation script 2/3 (as user) - generate user directories"
ssh -t "${USER_NAME}@${SERVER_IP}" "bash tmp_install_02.sh"

echo "$(date) - Copying files for traefik"
scp tmp_traefik_docker-compose.yml "${USER_NAME}@${SERVER_IP}:/home/${USER_NAME}/traefik/docker-compose.yml"
rm tmp_traefik_docker-compose.yml

echo "$(date) - Run installation script 3/3 (as root with sudo) - install necessary tools, setup firewall, ..."
ssh -t "${USER_NAME}@${SERVER_IP}" "echo '${USER_PASS}' | sudo -S bash tmp_install_03.sh"

while ! ssh -q "${USER_NAME}@${SERVER_IP}" "exit"; do
  echo "$(date) - Waiting for host to come up again"
  sleep 5
done

echo "$(date) - Cleaning up tmp_install.sh on server"
ssh -t "${USER_NAME}@${SERVER_IP}" "rm /home/${USER_NAME}/tmp_install_02.sh /home/${USER_NAME}/tmp_install_03.sh"

echo "$(date) - All done, server is installed and ready for deploying Platzhalter.io!"
