import { Router } from 'express';
import passport from 'passport';

import UsersController from '../../controllers/api/UsersController';

// const authenticate = passport.authenticate('jwt', { session: false });



class User extends UsersController {
    
    constructor() {
        super();
        this.protectedRoute = passport.authenticate('jwt', { session: false });
        this.router = Router();
        this.routes();
    }

    routes() {
        //* GET ROUTES
        this.router.get('/list', this.protectedRoute, this.getList());

        this.router.get('/:user_id', this.protectedRoute, this.getOne());

        this.router.get('/reset-password/:token', this.verificationRecoveryToken());

        //* POST ROUTES
        this.router.post('/create', this.protectedRoute, this.create());

        this.router.post('/reset-password-request', this.resetPasswordRequest());

        this.router.post('/change-password', this.protectedRoute, this.changePassword());

        this.router.post('/register', this.register());

        this.router.post('/login', this.login());

        //* PUT ROUTES
        this.router.put('/:user_id', this.protectedRoute, this.update());

        //* DELETE ROUTES
    }

}

const user = new User();

export default user.router;