import { Router } from 'express';
import ClinicsController from '../../controllers/api/ClinicsController';

class Clinic extends ClinicsController {

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

