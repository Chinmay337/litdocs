# Use the official Nginx image as the base image
FROM nginx:latest

# Copy the website's content to the default Nginx directory
COPY build/ /usr/share/nginx/html/

# Copy the custom Nginx configuration
COPY default.conf /etc/nginx/conf.d/default.conf
