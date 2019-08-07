import { Router } from 'express';
import passport from 'passport';

import VisitsController from '../../controllers/api/VisitsController';

class Visit extends VisitsController {

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
            '/:visit_id',
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

const visit = new Visit();

export default visit.router;