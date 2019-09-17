FROM ubuntu:latest

RUN apt-get -y update && apt-get install -y openssh-server

RUN mkdir /var/run/sshd

RUN echo 'root:demo' | chpasswd

RUN adduser --disabled-login otrousuario && echo 'otrousuario:demo' | chpasswd

COPY sshd_config /etc/ssh/sshd_config

COPY sshd /etc/pam.d/sshd

EXPOSE 22/tcp

CMD ["/usr/sbin/sshd", "-D"]
