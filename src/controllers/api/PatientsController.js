import PatientValidations from '../validations/PatientValidations';
import db from '../../models';
const { Patient } = db; 

class PatientsController extends PatientValidations {

  /**
   * @Route '/api/patient/list'
   * @Method GET
   * @Access Protected
   * @Description returns the list of patients that belongs to a specific clinic
   */
  getPatients = () => async (req, res) => {
    try {
 
      


    } catch (error) {
      console.error("_catch: " + error);
      res.status(500).json({ ERROR: error });
    }
  }

}

export default PatientsController;