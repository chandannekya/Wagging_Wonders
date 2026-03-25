const fs = require('fs');
const path = require('path');

const services = [
  { name: 'donation-service', port: 5004 },
  { name: 'grooming-service', port: 5005 },
  { name: 'vet-service', port: 5006 },
  { name: 'training-service', port: 5007 },
  { name: 'blog-service', port: 5008 },
  { name: 'store-service', port: 5009 },
];

const basePath = path.join(__dirname, 'services');

services.forEach(service => {
  const servicePath = path.join(basePath, service.name);
  
  // Create folders
  ['', 'controllers', 'models', 'routes', 'config'].forEach(dir => {
    fs.mkdirSync(path.join(servicePath, dir), { recursive: true });
  });

  // Create .env
  fs.writeFileSync(path.join(servicePath, '.env'), `PORT=${service.port}\nMONGO_URI=mongodb://localhost:27017/wagging_wonders_${service.name.replace('-', '_')}\n`);

  // Create Dockerfile
  fs.writeFileSync(path.join(servicePath, 'Dockerfile'), `FROM node:18\nWORKDIR /usr/src/app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE ${service.port}\nCMD ["npm", "start"]\n`);

  // Create package.json
  const packageJson = {
    name: service.name,
    version: "1.0.0",
    main: "server.js",
    scripts: {
      "start": "node server.js",
      "dev": "nodemon server.js"
    },
    dependencies: {
      "cors": "^2.8.5",
      "dotenv": "^16.4.7",
      "express": "^4.21.2",
      "mongoose": "^8.10.0"
    },
    devDependencies: {
      "nodemon": "^3.1.9"
    }
  };
  fs.writeFileSync(path.join(servicePath, 'package.json'), JSON.stringify(packageJson, null, 2));

  // Create server.js
  const serverJs = `const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok', service: '${service.name}' }));

const PORT = process.env.PORT || ${service.port};
app.listen(PORT, () => console.log(\`🚀 ${service.name} running on port \${PORT}\`));
`;
  fs.writeFileSync(path.join(servicePath, 'server.js'), serverJs);
});

console.log("Scaffolding complete!");
