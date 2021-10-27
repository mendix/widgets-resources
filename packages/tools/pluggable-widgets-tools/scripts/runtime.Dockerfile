FROM adoptopenjdk/openjdk11:jdk-11.0.3_7

ARG MENDIX_VERSION

ENV RUNTIME_PORT=8080 \
    ADMIN_PORT=8090 \
    LANG="C.UTF-8"

EXPOSE $RUNTIME_PORT $ADMIN_PORT

#install dependency -> git
RUN apt-get update -qqy && \
    apt-get install -qqy git wget && \
    # Install m2ee + dependencies
    # https://github.com/mendix/m2ee-tools
    git clone https://github.com/mendix/m2ee-tools.git /tmp/m2ee && \
    mkdir -p /var/log /var/opt/m2ee && \
    mv /tmp/m2ee/src/* /var/opt/m2ee && \
    chmod a=rwx /var/log/ /var/run/ && \
\
    apt-get install -qqy \
        python3 \
        python3-pip \
        unzip \
        libfontconfig1 && \
\
    pip3 install -q --upgrade pip && \
    pip install -q pyyaml httplib2 && \
\
    echo "Downloading runtime ${MENDIX_VERSION}..." && \
    wget -q https://cdn.mendix.com/runtime/mendix-${MENDIX_VERSION}.tar.gz -O /tmp/runtime.tar.gz && \
    mkdir /var/opt/runtime && \
    tar xfz /tmp/runtime.tar.gz --directory /var/opt/runtime && \
    rm /tmp/runtime.tar.gz && \
    chown -R root:root /var/opt/runtime && \
\
    apt-get -qqy remove --auto-remove git wget && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
\
    ln -s $JAVA_HOME/bin/* /usr/bin/ && \
\
    echo "#!/bin/bash -x" >/bin/m2ee && \
    echo "python3 /var/opt/m2ee/m2ee.py \$@" >>/bin/m2ee && \
    chmod +x /bin/m2ee

