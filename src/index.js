import Server from './config/Server';

const server = new Server(process.env.SERVER_PORT);

server.start();

