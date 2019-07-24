import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import sequelize from './db_connection';
import db_sync from './db_sync';

class Server {
    constructor(PORT) {
        this.PORT = PORT;
        this.server = express();
        this.config();
        this.routes();
    }

    config() {
        this.server.use(morgan('dev'));
        this.server.use(cors());
        this.server.use(express.urlencoded({ extended: false }));
        this.server.use(express.json());
    }

    routes() {
        this.server.use('/', (req, res) => res.send("<h1>Hello World! :)</h1>"))
    }

    start() {
        sequelize
            .authenticate()
            .then(() => {
                console.log("Connected to DB");

                db_sync();

                this.server.listen(this.PORT, () => console.log('Server started on port ' + this.PORT));
            })
            .catch(err => console.error("Connection Error: " + err));
    }


}

export default Server;