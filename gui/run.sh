#!/bin/bash

docker build -t mifirefox .

docker run -it --rm -e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix mifirefox
