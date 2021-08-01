FROM node:14-alpine AS BUILD_IMAGE

WORKDIR /app

COPY package.json yarn.* ./

RUN yarn install --production

COPY src/ ./src/
COPY public/ ./public/

RUN yarn build

FROM nginx:1.17-alpine

# copy from build image
COPY --from=BUILD_IMAGE /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
