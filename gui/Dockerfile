FROM ubuntu:latest

RUN apt-get update && apt-get install -y \
		firefox

RUN adduser --home /home/demo --uid 1000 demo

USER demo

CMD ["firefox"]
