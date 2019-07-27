import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import passportJWT from './passportJWT';

//* Routes
import AccountRoutes from '../routes/api/Account';
import UserRoutes from '../routes/api/User';

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
        this.server.use(passport.initialize());
		passportJWT(passport);
    }

    routes() {
        this.server.use('/api/account', AccountRoutes);
        this.server.use('/api/user/', UserRoutes);
    }

    start() {
        this.server.listen(this.PORT, () => console.log('Server started on port ' + this.PORT));
    }


}

export default Server;