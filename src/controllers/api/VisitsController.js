import VisitValidations from '../validations/VisitValidations';
import db from '../../models';
const { Visit } = db;

class VisitsController extends VisitValidations {

  /**
   * @Route '/api/visit/list/?page=1&limit=5&orderby=id&order=asc'
   * @Method GET
   * @Access Pivate
   * @Description returns the list of visit that belongs to a specific patient
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
      const options = ['id', 'temperature', 'blood_presure', 'height', 'weight', 'diagnose', 'notes']

      if (!options.includes(orderby)) {
        orderby = 'id'
      }

      order = order !== undefined ? order.toUpperCase() : 'ASC';

      if (!['ASC', 'DESC'].includes(order)) {
        order = 'ASC'
      }

      //* Find Visits by clinic_id
      const visits = await Visit.findAndCountAll({
        where: {
          clinic_id
        },
        limit: limit,
        offset: page - 1,
        order: [[orderby, order]],
        attributes: {
          include: ['id', 'temperature', 'blood_presure', 'height', 'weight', 'diagnose', 'notes']
        }
      });

      if (!visits) {
        return res.status(404).json({ msg: "No se encontron visitas" });
      }

      //* Send list of visits
      res.json(visits);

    } catch (error) {
      res.status(500).json({ ERROR: error.toString() });
    }
  }

  /**
   * @Route '/api/visit/:visit_id'
   * @Method GET
   * @Access Pivate
   * @Description return single visit
   */
  getOne = () => async (req, res) => {
    try {
      const { visit_id } = req.params;
      const { clinic_id } = req.user;

      //* Checks if visit_id is valid
      if (!visit_id || (typeof parseInt(visit_id) !== 'number')) {
        return res.status(404).json({ msg: "No se encontro la visita!" });
      }

      //* find visit by clinic_id and visit_id, exclude sensitive data
      const visit = await Visit.findOne({
        where: {
          clinic_id,
          id: visit_id
        },
        attributes: {
          include: ['id', 'temperature', 'blood_presure', 'height', 'weight', 'diagnose', 'notes']
        }
      });

      if (!visit) {
        return res.status(404).json({ msg: "No se encontro la visita" });
      }

      res.json(visit);

    } catch (error) {
      res.status(500).json({ ERROR: error.toString() });
    }
  }

  /**
   * @Route '/api/visit/create'
   * @Method POST
   * @Access Pivate
   * @Description return single visit
   */
  create = () => async (req, res) => {
    try {

      const { clinic_id } = req.user;

      let {
        temperature,
        blood_presure,
        height,
        weight,
        diagnose,
        notes
      } = req.body;


      //* Sanitizind input data
      blood_presure = this.capitalize(blood_presure.trim());
      diagnose = diagnose ? this.capitalize(diagnose.trim()) : null;
      notes = this.capitalize(notes.trim());


      const newVisit = {
        ...req.body,
        temperature,
        blood_presure,
        height,
        weight,
        diagnose,
        notes,
        clinic_id,
        patient_id
      }

      const visit = await Visit.create(newVisit);

      if(!visit) {
        return res.status(503).json({ msg: "No se ha podido crear la visita, intentelo mas tarde" });
      }

      res.json({ msg: "OK"});

    } catch (error) {
      res.status(500).json({ ERROR: error.toString() });
    }
  }


}

export default VisitsController;