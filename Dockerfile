FROM nginx:1.27-alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/portfolio.conf

# Copy portfolio files
COPY . /usr/share/nginx/html/portfolio

# Remove Docker/deployment files from served directory
RUN rm -f /usr/share/nginx/html/portfolio/Dockerfile \
    /usr/share/nginx/html/portfolio/docker-compose.yml \
    /usr/share/nginx/html/portfolio/nginx.conf \
    /usr/share/nginx/html/portfolio/.gitignore \
    /usr/share/nginx/html/portfolio/instructions1.txt \
    /usr/share/nginx/html/portfolio/instructions2.txt

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
