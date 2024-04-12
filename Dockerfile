FROM node:16

# Install Oracle Instant Client
RUN apt-get update && apt-get install -y libaio1 && \
    mkdir /opt/oracle && \
    cd /opt/oracle && \
    curl -o instantclient-basic-linux.x64-19.13.0.0.0dbru.zip https://download.oracle.com/otn_software/linux/instantclient/1913000/instantclient-basic-linux.x64-19.13.0.0.0dbru.zip && \
    unzip instantclient-basic-linux.x64-19.13.0.0.0dbru.zip && \
    rm instantclient-basic-linux.x64-19.13.0.0.0dbru.zip && \
    sh -c "echo /opt/oracle/instantclient_19_13 > /etc/ld.so.conf.d/oracle-instantclient.conf" && \
    ldconfig

# Set environment variables
ENV LD_LIBRARY_PATH=/opt/oracle/instantclient_19_13:$LD_LIBRARY_PATH

# Set up your application
WORKDIR /app
COPY . .
RUN npm install

CMD ["npm", "start"]