import Server from './server';
const { SERVER_PORT } = process.env;

const server = new Server(SERVER_PORT);

server.start();

