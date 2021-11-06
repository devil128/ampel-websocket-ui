FROM node:16-alpine3.11 AS build
# Create a Virtual directory inside the docker image
WORKDIR /dist/src/app
# Copy files to virtual directory
# COPY package.json package-lock.json ./
# Run command in Virtual directory
RUN npm cache clean --force
# Copy files from local machine to virtual directory in docker image
COPY . .
RUN npm install
RUN npm run build --prod


### STAGE 2:RUN ###
# Defining nginx image to be used
FROM nginx:latest AS ngi
# Copying compiled code and nginx config to different folder
# NOTE: This path may change according to your project's output folder
COPY --from=build /dist/src/app/dist/ampel-graphql-website /usr/share/nginx/html
COPY /nginx/nginx.conf  /etc/nginx/conf.d/default.conf
RUN chmod -R 755 /usr/share/nginx/html
# Exposing a port, here it means that inside the container
# the app will be using Port 80 while running
EXPOSE 80
