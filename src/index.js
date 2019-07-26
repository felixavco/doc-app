import Server from './server/server';

const server = new Server(process.env.SERVER_PORT || 5000);

server.start();

