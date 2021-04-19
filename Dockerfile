# Pull from the ubuntu:14.04 image
FROM ubuntu:14.04

# Update cache and install base packages
RUN apt-get update && apt-get -y install \
    software-properties-common \
    python-software-properties \
    debian-archive-keyring \
    wget \
    curl \
    vim \
    aptitude \
    dialog \
    net-tools \
    mcrypt \
    build-essential \
    tcl8.5 \
    git



# Install supervisor
RUN apt-get install -y supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

WORKDIR /home/node/app

# Install Yarn.
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get install -qq -y build-essential nodejs yarn --force-yes


# Set the current working directory
RUN chmod -R 777 /home/node/app
RUN chown -R root:users /home/node/app
#RUN mkdir /home/node/app 
RUN chown -R root:users /home/node/app



COPY package*.json ./

USER root

# install required packages
RUN yarn install

COPY --chown=root:users . .

# copy 404 file
COPY 404.html /var/www/html/new/

# copy landing file
#COPY landing /var/www/html/new/


ENV MONGO_HOST "host.docker.internal"

# Expose port 7000
EXPOSE 7000  
#CMD [ "yarn", "run", "start" ]
CMD ["/usr/bin/supervisord"]