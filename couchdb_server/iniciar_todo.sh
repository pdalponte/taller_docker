#!/bin/bash

COUCH1=$(docker container run -d -p 5984 -v couchdb-data:/var/lib/couchdb shykes/couchdb)
HOST=localhost
URL="http://$HOST:$(docker port $COUCH1 5984 | grep -o '[1-9][0-9]*$')/_utils/"
echo "Navigate to $URL in your browser, and use the couch interface to add data"
COUCH2=$(docker run -d -p 5984 --volumes-from $COUCH1 shykes/couchdb)
HOST=localhost
URL="http://$HOST:$(docker port $COUCH2 5984 | grep -o '[1-9][0-9]*$')/_utils/"
echo "Navigate to $URL in your browser. You should see the same data as in the first database"'!'
