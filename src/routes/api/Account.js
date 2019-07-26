import { Router } from 'express';
import AccountController from '../../controllers/api/AccountController';

class Account extends AccountController {

    constructor() {
        super();
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/list', this.getAccounts());
    }

}

const account = new Account();

export default account.router;

