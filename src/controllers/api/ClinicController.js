import db from '../../models';
const { Clinic } = db;

/**
 * @Route '/api/Clinic/list'
 * @Method GET
 * @Access Protected
 * @Description returns the list of all Clinics
 */
class ClinicController {
  getClinics = () => async (req, res) => {
    try {

      const clinic = await Clinic.findAll();

      res.json(clinic);
      
    } catch (error) {
      console.error("_catch: " + error);
      res.status(500).json({ ERROR: error });
    }
  }

}

export default ClinicController;

