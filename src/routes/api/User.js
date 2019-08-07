import { Router } from 'express';
import passport from 'passport';

import UsersController from '../../controllers/api/UsersController';

class User extends UsersController {

    constructor() {
        super();
        this.protectedRoute = passport.authenticate('jwt', { session: false });
        this.router = Router();
        this.routes();
    }

    routes() {
        //* GET ROUTES
        this.router.get(
            '/list',
            this.protectedRoute,
            this.getList()
        );

        //!BORRAR
        this.router.get(
            '/testUsers',
            this.testUsers()
        );

        this.router.get(
            '/:user_id',
            this.protectedRoute,
            this.getOne()
        );


        this.router.get(
            '/reset-password/:token',
            this.verificationRecoveryToken()
        );

        //* POST ROUTES
        this.router.post(
            '/register',
            this.registerValidation(),
            this.register()
        );

        this.router.post(
            '/login',
            this.loginValidation(),
            this.login()
        );

        this.router.post(
            '/create',
            this.protectedRoute,
            this.createValidation(),
            this.create()
        );

        this.router.post(
            '/reset-password-request',
            this.resetPwdReqValidation(),
            this.resetPasswordRequest()
        );

        this.router.post(
            '/reset-password',
            this.resetPwdValidation(),
            this.resetPassword()
        );

        this.router.post(
            '/change-password',
            this.protectedRoute,
            this.changePwdValidation(),
            this.changePassword()
        );

        //* PUT ROUTES
        this.router.put(
            '/:user_id',
            this.protectedRoute,
            this.update()
        );

        //* DELETE ROUTES
    }

}

const user = new User();

export default user.router;