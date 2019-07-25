import Server from './server/Server';

const server = new Server(process.env.SERVER_PORT);

server.start();

