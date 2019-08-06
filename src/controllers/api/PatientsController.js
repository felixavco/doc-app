import PatientValidations from '../validations/PatientValidations';
import db from '../../models';
const { Patient } = db;

class PatientsController extends PatientValidations {

  /**
   * @Route '/api/patient/list/?page=1&limit=5&orderby=id&order=asc'
   * @Method GET
   * @Access Pivate
   * @Description returns the list of patients that belongs to a specific clinic
   */
  getList = () => async (req, res) => {
    try {
      const { clinic_id } = req.user;
      let { page, limit, orderby, order } = req.query;

      page = parseInt(page);
      if (!page || page < 1) {
        page = 1;
      }

      limit = parseInt(limit);
      if (!limit || limit < 10) {
        limit = 10
      }


      orderby = orderby !== undefined ? order.toLowerCase() : 'id';
      const options = ['id', 'first_name', 'last_name', 'middle_name', 'last_name2', 'createdAt']

      if (!options.includes(orderby)) {
        orderby = 'id'
      }

      order = order !== undefined ? order.toUpperCase() : 'ASC';

      if (!['ASC', 'DESC'].includes(order)) {
        order = 'ASC'
      }

      //* Find patients by clinic_id
      const patients = await Patient.findAndCountAll({
        where: {
          clinic_id
        },
        limit: limit,
        offset: page - 1,
        order: [[orderby, order]],
        attributes: {
          include: ['id', 'first_name', 'middle_name', 'last_name', 'last_name2']
        }
      });

      if (!patients) {
        return res.status(404).json({ msg: "No se encontron pacientes" });
      }

      //* Send list of users
      res.json(patients);

    } catch (error) {
      res.status(500).json({ ERROR: error.toString() });
    }
  }

  /**
   * @Route '/api/patient/:patient_id'
   * @Method GET
   * @Access Pivate
   * @Description return single user
   */
  getOne = () => async (req, res) => {
    try {
      const { patient_id } = req.params;
      const { clinic_id } = req.user;

      //* Checks if patient_id is valid..
      if (!patient_id || (typeof parseInt(patient_id) !== 'number')) {
        return res.status(404).json({ msg: "No se encontro el usuario!" });
      }

      //* find patient by clinic_id and patient_id, exclude sensitive data
      const patient = await Patient.findOne({
        where: {
          clinic_id,
          id: patient_id
        },
        attributes: {
          include: ['id', 'first_name', 'middle_name', 'last_name', 'last_name2']
        }
      });

      if (!patient) {
        return res.status(404).json({ msg: "No se encontro el paciente" });
      }

      res.json(patient);

    } catch (error) {
      res.status(500).json({ ERROR: error.toString() });
    }
  }

  /**
   * @Route '/api/patient/create'
   * @Method POST
   * @Access Pivate
   * @Description return single user
   */
  create = () => async (req, res) => {
    try {

      const { clinic_id } = req.user;

      let { 
        first_name, 
        last_name, 
        middle_name, 
        last_name2, 
        email
      } = req.body;


      //* Sanitizind input data
      first_name = this.capitalize(first_name.trim());
      middle_name = middle_name ? this.capitalize(middle_name.trim()) : null;
      last_name = this.capitalize(last_name.trim());
      last_name2 = last_name2 ? this.capitalize(last_name2.trim()) : null;
      email = email ? email.trim().toLowerCase() : null;

      const newPatient = {
        ...req.body, 
        first_name, 
        last_name, 
        middle_name, 
        last_name2, 
        email, 
        clinic_id 
      }

      const patient = await Patient.create(newPatient);

      if(!patient) { 
        return res.status(503).json({ msg: "No se ha podido crear al paciente, intentelo mas tarde" });
      }

      res.json({ msg: "OK"});

    } catch (error) {
      res.status(500).json({ ERROR: error.toString() });
    }
  }


}

export default PatientsController;