FROM node:18
WORKDIR /app
COPY queue.js package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD ["node", "index.js"]
