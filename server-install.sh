#!/usr/bin/env bash

# Necessary environment variables to initialize the server
# # IP address of the server
# SERVER_IP=""
# # Username of the admin user
# USER_NAME=""
# # Password of the admin user
# USER_PASS=""
# # Get a key from GitHub for the admin user
# GITHUB_USER=""

set -e

if [ ! -r ".envfile" ]; then
  echo "Please create and use the .envfile to set all variables"
  exit 1
fi

source .envfile

if [ -z "${SERVER_IP}" ]; then
  echo "Need to set SERVER_IP"
  exit 1
fi
if [ -z "${USER_NAME}" ]; then
  echo "Need to set USER_NAME"
  exit 1
fi
if [ -z "${USER_PASS}" ]; then
  echo "Need to set USER_PASS"
  exit 1
fi
if [ -z "${GITHUB_USER}" ]; then
  echo "Need to set GITHUB_USER"
  exit 1
fi

ssh -l root "${SERVER_IP}" <<EOF
cat <<INSTALLATION | bash
set -e
echo "\$(date) - Hardening: Create user, add ssh key, remove direct root access"
echo "\$(date) - Creating administrative user"
useradd -m -G sudo "${USER_NAME}"
echo "${USER_NAME}:${USER_PASS}" | chpasswd
echo "\$(date) - Importing ssh key from GitHub"
su -c "ssh-import-id 'gh:${GITHUB_USER}'" "${USER_NAME}"
echo "\$(date) - Disable password authentication for SSH"
sed -i 's/^#\\?PasswordAuthentication\\s\\+yes/PasswordAuthentication no/g' /etc/ssh/sshd_config
sed -i 's/^#\\?PermitRootLogin\\s\\+yes/PermitRootLogin no/g' /etc/ssh/sshd_config
systemctl reload sshd
INSTALLATION
EOF

cat <<EOF > tmp_install.sh
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

echo "\$(date) - Checking for docker-compose"
if ! [ -x "\$(command -v docker-compose)" ]; then
  echo "docker-compose not installed. Trying to change that."
  curl -L "https://github.com/docker/compose/releases/download/1.25.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  chmod +x /usr/local/bin/docker-compose
fi

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

echo "\$(date) - Updating server"
apt-get update
apt-get upgrade -y

echo "\$(date) - Creating folder for platzhalterio"
mkdir -p "/home/${USER_NAME}/platzhalterio"

echo "\$(date) - Creating folder for traefik and letsencrypt"
mkdir -p "/home/${USER_NAME}/traefik"
mkdir -p "/home/${USER_NAME}/traefik/letsencrypt"

echo "\$(date) - Installation complete. Server can now be deployed, but first: We REBOOT!"
shutdown --reboot 0
EOF

scp tmp_install.sh "${USER_NAME}@${SERVER_IP}:/home/${USER_NAME}"
rm tmp_install.sh

ssh -t -l "${USER_NAME}" "${SERVER_IP}" "echo '${USER_PASS}' | sudo -S bash tmp_install.sh"
