#!/bin/bash

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
echo $PATHPREFIX
echo $CONTAINERPREFIX

if [ -d "git/$branch" ]; then
        echo "going to git/$branch"
        cd git/$branch
        docker-compose down
        git pull
else
        git clone -b $branch git@github.com:4IT580/joinme.git git/$branch
        cd git/$branch
fi

cp /var/www/docker-compose.override.yml docker-compose.override.yml

if [ "$branch" = "master" ]; then
        export PATHPREFIX=""
        echo $PATHPREFIX
        echo "I AM MASTER"       
fi

docker-compose -f docker-compose.caddy.yml -f docker-compose.override.yml -f docker-compose.prod.yml up -d --build