import { Router } from 'express';
import PatientController from '../../controllers/api/PatientController';

class Patient extends PatientController {

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