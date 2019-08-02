import db from '../../models';
const { Clinic } = db;


class ClinicController {

  /**
 * @Route '/api/Clinic/list'
 * @Method GET
 * @Access Protected
 * @Description returns the list of all Clinics
 */
  getClinics = () => async (req, res) => {
    try {

      const clinic = await Clinic.findAll();

      res.json(clinic);

    } catch (error) {
      console.error("_catch: " + error);
      res.status(500).json({ ERROR: error });
    }
  }

  delete = () => async (req, res) => {
    try {
      const { id } = req.params;
      const clinic = await Clinic.destroy({ where: { id }});

      if(!clinic) {
        throw new Error(`No se ha encontrado una clinica con el ID=${id}`)
      }

      res.json({ msg: "La clinica se ha eliminado con exito" });

    } catch (error) {
      console.error("_catch: " + error);
      res.status(500).json({ server_error: error.toString() });
    }

  }

}

export default ClinicController;

