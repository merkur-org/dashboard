FROM node:14-alpine AS BUILD_IMAGE

WORKDIR /app

COPY package.json yarn.* tsconfig.json ./

RUN yarn install

COPY src/ ./src/
COPY public/ ./public/

RUN yarn build

FROM nginx:1.17-alpine

ENV NGINX_PORT=8000
# copy from build image
COPY --from=BUILD_IMAGE /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
