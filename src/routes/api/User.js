import { Router } from 'express';
import UserController from '../../controllers/api/UserController';

class User extends UserController {

    constructor() {
        super();
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.post('/register', this.register());
        this.router.post('/login', this.register());
        this.router.get('/mailTester', this.mailTester());
    }

}

const user = new User();

export default user.router;