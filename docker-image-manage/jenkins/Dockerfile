# jenkins version 2.416
FROM jenkins/jenkins:latest

LABEL maintainer="wangdongbing"
LABEL name="jenkins"
LABEL version="latest"

USER root

# 换源
RUN sed -i -e 's/deb.debian.org/mirrors.aliyun.com/g' -e 's/security.debian.org/mirrors.aliyun.com/g' /etc/apt/sources.list

# Install apt packages
RUN apt update         && \
	apt upgrade -y -o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold"  && \
	apt install -y -o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold"     \
	openssl               \
	ssh                   \
	wget                  \
	sudo                  \
	vim                   \
	build-essential       \
	bash-completion       && \
	apt-get clean

# 下载地址：https://cdn.npmmirror.com/binaries/node/v14.18.1/node-v14.18.1-linux-x64.tar.gz
# ADD命令会自动解压
ADD node-v14.18.1-linux-x64.tar.gz /usr/local/

# 加入环境变量
RUN echo 'NODE_HOME=/usr/local/node-v14.18.1-linux-x64'               >> "$HOME/.bashrc"
RUN echo 'PATH=$NODE_HOME/bin:$PATH'                                  >> "$HOME/.bashrc"
RUN echo 'export NODE_HOME PATH'                                      >> "$HOME/.bashrc"
