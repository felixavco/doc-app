import { Router } from 'express';
import passport from 'passport';
import multer from 'multer';

import UsersController from '../../controllers/api/UsersController';

class User extends UsersController {

    storage;
    fileFilter;

    constructor() {
        super();
        this.protectedRoute = passport.authenticate('jwt', { session: false });
        this.router = Router();
        this.multerStorage();
        this.multerFileFilter();
        this.routes();
    }

    //* Multer Storage Configuration
    multerStorage() {
        this.storage = multer.diskStorage({
            destination: (req, file, cb) => {
                let path;
                process.env.NODE_ENV === 'production' ? path = 'uploads' : path = 'src/uploads';
                cb(null, `${path}/${req.user.clinic_id}/avatars`)
            },
            filename: (req, file, cb) => {
                cb(null, `u_${req.user.id}_${file.originalname}`);
            }
        });
    }

    multerFileFilter() {
        this.fileFilter = (req, file, cb) => {
            try {
                const validExts = ['image/png', 'image/jpg', 'image/jpeg'];
                if (validExts.includes(file.mimetype)) {
                    cb(null, true);
                } else {
                    cb(null, false);
                    throw new Error("invalid mimetype");
                }
            } catch (error) {
                console.log(error.toString());
                this.errors.avatar = this.setResponse(
                    "Solamente las extensiones 'jpg','jpeg','png', son validas",
                    "Only file extensions 'jpg','jpeg','png', are valid"
                )
            }

        }
    }

    routes() {
        //* GET ROUTES
        this.router.get(
            '/list',
            this.protectedRoute,
            this.getList()
        );

        //!BORRAR
        // this.router.get(
        //     '/testUsers',
        //     this.testUsers()
        // );
        //!BORRAR

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

        this.router.post(
            '/profile-img',
            this.protectedRoute,
            multer({
                storage: this.storage,
                fileFilter: this.fileFilter
            }).single('avatar'),
            this.profileImg()
        )

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