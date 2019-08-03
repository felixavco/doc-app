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
        this.router.post('/register', this.register());
        this.router.post('/login', this.login());
        this.router.post('/create', this.protectedRoute, this.create());
    }

}

const user = new User();

export default user.router;