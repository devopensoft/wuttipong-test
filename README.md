JENOSIZE TEST

Author : Wuttipong Oammun

Frontend : React
Bankend : Moleculer [Node.js]

Before Start

# Set you Google Place API Key in file
servics/jenosize.service.js
const googleApiKey = "" in line 7

# Install dpendencies for server
npm install 

# Install dpendencies for client
cd client <br />
npm install

## NPM scripts

- `npm run run-dev`: Start development mode (load all server and client) [Testin : localhost:3000]
- `npm run dc:up`: Start the stack with Docker Compose [Testin : localhost:3000] (Before start please install Docker-Desktop Application)
- `npm run dc:down`: Stop the stack with Docker Compose 
