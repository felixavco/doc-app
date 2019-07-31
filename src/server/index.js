import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import passportJWT from './passportJWT';
import path from 'path';


//* Routes
import ClinicRoutes from '../routes/api/Clinic';
import UserRoutes from '../routes/api/User';
import PatientRoutes from '../routes/api/Patient';

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
        this.server.use(express.static(path.join(__dirname, '../public')));
        this.server.set('views', path.join(__dirname, '../views'))
        this.server.set('view engine', 'ejs');
    }

    routes() {
        this.server.use('/api/clinic', ClinicRoutes);
        this.server.use('/api/user', UserRoutes);
        this.server.use('/api/patient', PatientRoutes);
        this.server.use('/', (req, res) => {
            const title = "Doc-App";
            res.render('index', { title });
        })
    }

    start() {
        this.server.listen(this.PORT, () => console.log('Server started on port ' + this.PORT));
    }


}

export default Server;