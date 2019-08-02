import { Router } from 'express';
import ClinicController from '../../controllers/api/ClinicController';

class Clinic extends ClinicController {

    constructor() {
        super();
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/list', this.getClinics());
        this.router.delete('/:id', this.delete());
    }

}

const clinic = new Clinic();

export default clinic.router;

