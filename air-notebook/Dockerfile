FROM node:18 as build

WORKDIR /app

# 拷贝 package.json 和 package-lock.json
COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

# 使用 Nginx 作为静态服务器
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]