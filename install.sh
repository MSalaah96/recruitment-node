#!/bin/bash
mkdir -p ./gateway/certs
cd ./gateway/certs
mkcert carbon.local.com "*.carbon.local.com"

#TODO: Load and update hosts dynamically from docker-compose file
declare -a hosts=("182.39.0.3 carbon.database.local.com" "182.39.0.2 carbon.local.com" "182.39.0.4 carbon.api.local.com")

# get number of hosts
numberOfHosts=${#hosts[@]}

# use for loop to read all values and indexes
for (( i = 0; i < ${numberOfHosts}; i++ ));
do
  if ! grep -q "${hosts[$i]}" /etc/hosts; then
    echo "${hosts[$i]}" | sudo tee -a /etc/hosts > /dev/null
  fi
done

docker-compose up -d --build