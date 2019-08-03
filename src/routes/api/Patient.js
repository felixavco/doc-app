import { Router } from 'express';
import PatientsController from '../../controllers/api/PatientsController';

class Patient extends PatientsController {

    constructor() {
        super();
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/list', this.getPatients());
    }

}

const patient = new Patient();

export default patient.router;