FROM ubuntu:latest

RUN apt-get -y update && apt-get install -y openssh-server

RUN mkdir /var/run/sshd

RUN echo 'root:demo' | chpasswd

COPY sshd_config /etc/ssh/sshd_config

EXPOSE 22/tcp

CMD ["/usr/sbin/sshd", "-D"]
