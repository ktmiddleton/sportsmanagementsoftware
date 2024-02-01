# Start your image with a node base image
FROM node:18-alpine

# The /frontend directory should act as the main application directory
WORKDIR /usr/src/frontend/

# Copy React files into container
COPY /public /usr/src/frontend/public
COPY /src /usr/src/frontend/src
COPY package.json /usr/src/frontend/

# Install requirements
RUN npm install

EXPOSE 3000
CMD ["npm", "run", "start"]
