# Build from inside service-a/, e.g.:
#   cd service-a && docker build -t service-a .

FROM node:22-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/index.js"]
