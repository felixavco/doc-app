import { Router } from 'express';
import passport from 'passport';

import PatientsController from '../../controllers/api/PatientsController';

class Patient extends PatientsController {

    constructor() {
        super();
        this.protectedRoute = passport.authenticate('jwt', { session: false });
        this.router = Router();
        this.routes();
    }

    routes() {
        //* GET Routes
        this.router.get(
            '/list',
            this.protectedRoute,
            this.getList()
        );

        this.router.get(
            '/:patient_id',
            this.protectedRoute,
            this.getOne()
        );

        //* POST Routes
        this.router.post(
            '/create',
            this.protectedRoute,
            this.create()
        )
    }

}

const patient = new Patient();

export default patient.router;