#!/bin/bash

echo $1
branch=$1
echo $branch

eval $(ssh-agent)
ssh-add ~/.ssh/ed25519

ppref="$branch"
ppref+="."
cpref="$branch"
cpref+="_"

export PATHPREFIX="$ppref"
export CONTAINERPREFIX="$cpref"
export COMPOSE_FILE=docker-compose.caddy.yml
echo $PATHPREFIX
echo $CONTAINERPREFIX
echo $COMPOSE_FILE

if [ -d "git/$branch" ]; then
        echo "going to git/$branch"
        cd git/$branch
        sudo -E docker-compose down
        git pull
else
        git clone -b $branch git@github.com:4IT580/joinme.git git/$branch
        cd git/$branch
fi

#cp /var/www/docker-compose.override.yml docker-compose.override.yml

if [ "$branch" = "master" ]; then
        export PATHPREFIX=""
        echo $PATHPREFIX
        echo "I AM MASTER"
        sudo -E docker-compose up -d
else
        sudo -E docker-compose up -d
fi