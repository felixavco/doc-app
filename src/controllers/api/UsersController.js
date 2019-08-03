import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import db from '../../models';
import Mailer from '../../server/mailer/Mailer';
import { verificationEmail, passwordRecovery } from '../../server/mailer/templates/emailTemplates';
const { Clinic, User } = db;
const { SECRET, DOMAIN } = process.env;


class UsersController {

  /**
   * @Route '/api/user/register'
   * @Method POST
   * @Access Public
   * @Description Creates the clinic to asociate the user, then and assig admin rights by default and sends verification email, return jwt token;
   */
  register = () => async (req, res) => {
    try {
      const { name, domain, account_type, first_name, last_name, email, password, user_name } = req.body;
      const newClinic = { name, domain, account_type };
      const newUser = { first_name, last_name, email, password, user_name };

      //* Checks if the domain is already taken
      let clinic = await Clinic.findOne({ where: { domain } });
      if (clinic) {
        return res.status(409).json({ message: `El dominio '${domain}' ya esta en uso por otra cuenta, selecione uno diferente.` })
      }

      //* Checks if the email is already in use
      let user = await User.findOne({ where: { email } });
      if (user) {
        return res.status(409).json({ message: `El correo '${email}' ya esta en uso, selecione uno diferente.` })
      }

      //* Create a random verification token
      newClinic.verification_token = await crypto.randomBytes(32).toString('hex');
      //* Set expiration to verification token
      newClinic.exp_verification_token = Date.now() + 3600000; //* Token will expire in 1 Hour

      //* If the domain is available creates a new clinic.
      clinic = await Clinic.create(newClinic);

      //***** Creating User *****/
      //* Create the relation between the user and the clinic through the clinic Id.
      newUser.clinic_id = clinic.dataValues.id

      //* Assign user_type DOCTOR and role SUPER_ADMIN by default;
      newUser.role = "DOCTOR";
      newUser.permission = 3;

      //* Encrypt plain password
      const salt = await bcrypt.genSalt(12);
      newUser.password = await bcrypt.hash(newUser.password, salt);

      //* Insert new user in DB
      user = await User.create(newUser);

      if (user) {
        //* Send Verification email
        const msgData = {
          from: `Doc-App <no-reply-verification@${DOMAIN}>`,
          to: user.dataValues.email,
          subject: "Welcome to Doc-App, Please Verify Your Domain"
        }

        const data = {
          name: first_name + " " + last_name,
          token: newClinic.verification_token
        }

        Mailer.mailGun(msgData, verificationEmail(data));

        //* Creates a directory under '/uploads' to store clinic assets
        const clinicDir = await this.makeClinicDir(clinic.dataValues.id);

        if (!clinicDir.success) {
          return res.status(503).json(clinicDir);
        }

        console.log("clinic_directory: " + clinicDir.path);

        //* Creates the response with token jwt
        const response = await this.jwtToken(user.dataValues);

        if (!response.success) {
          return res.status(503).json(response);
        }

        res.status(201).json(response);

      } else {
        res.status(503).json({ msg: "Ha ocurrido un error al crear el usuario, vuelva a intentarlo mas tarde." });
      }

    } catch (error) {
      res.status(500).json({ ERROR: error.toString() });
    }
  }

  /**
   * @Route '/api/user/login'
   * @Method POST
   * @Access Public
   * @Description checks if user exists, if password matchs, returns jwt token
   */
  login = () => async (req, res) => {
    try {
      const { user_name, domain, password } = req.body;
      const msg = "El usuario o el password son incorrectos";

      //* Check if there is a clinic asociated with the domain
      const clinic = await Clinic.findOne({ where: { domain } });
      if (!clinic) {
        return res.status(404).json({ msg });
      }

      //* Find a user by user_name and clinic Id
      const { id } = clinic.dataValues;
      const user = await User.findOne({ where: { clinic_id: id, user_name } });

      if (!user) {
        return res.status(404).json({ msg });
      }

      //* Compare Password
      const isPassword = await bcrypt.compare(password, user.password);

      if (isPassword) {
        //* If password match, return jwt token 
        const response = await this.jwtToken(user.dataValues);

        if (!response.success) {
          return res.status(503).json(response);
        }

        res.status(201).json(response);

      } else {
        res.status(401).json({ msg });
      }
    } catch (error) {
      res.status(500).json({ ERROR: error.toString() });
    }
  }

  /**
   * @Route '/api/user/:user_id'
   * @Method GET
   * @Access Pivate
   * @Description return single user 
   */
  getOne = () => async (req, res) => {
    try {
      const { user_id } = req.params;
      const { clinic_id } = req.user;

      //* Checks if user_id is valid
      if (!user_id || (typeof parseInt(user_id) !== 'number')) {
        return res.status(404).json({ msg: "No se encontro el usuario!" });
      }

      //* find user by clinic_id and user_id, exclude sensitive data
      const user = await User.findOne({
        where: {
          clinic_id,
          id: user_id
        },
        attributes: {
          exclude: ['password', 'recovery_token', 'exp_recovery_token', 'ClinicId']
        }
      });

      if (!user) {
        return res.status(404).json({ msg: "No se encontro el usuario" });
      }

      res.json(user);

    } catch (error) {
      res.status(500).json({ ERROR: error.toString() });
    }
  }

  /**
   * @Route '/api/user/list/?page=1&limit=5&orderby=id&order=asc'
   * @Method GET
   * @Access Pivate
   * @Description return list of users in the clinic **default values: 'page = 1' 'limit = 5', 'orderby = id', 'order = ASC'
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
      if (!limit || limit < 5) {
        limit = 5
      }

      orderby = orderby !== undefined ? order.toLowerCase() : 'id';
      const options = ['id', 'first_name', 'last_name', 'middle_name', 'last_name2', 'user_name', 'createdAt', 'role']

      if (!options.includes(orderby)) {
        orderby = 'id'
      }

      order = order !== undefined ? order.toUpperCase() : 'ASC';

      if (!['ASC', 'DESC'].includes(order)) {
        order = 'ASC'
      }

      console.log(page, limit, orderby, order);

      //* find users by clinic_id and user_id, exclude sensitive data
      const users = await User.findAndCountAll({
        where: {
          clinic_id
        },
        limit: limit,
        offset: page - 1,
        order: [[orderby, order]],
        attributes: {
          exclude: ['password', 'recovery_token', 'exp_recovery_token', 'ClinicId']
        }
      });

      if (!users) {
        return res.status(404).json({ msg: "No se encontron los usuarios" });
      }

      //* Send list of users
      res.json(users);

    } catch (error) {
      res.status(500).json({ ERROR: error.toString() });
    }
  }

  /**
   * @Route '/api/user/create'
   * @Method POST
   * @Access private
   * @Description allows admins to create new users
   */
  create = () => async (req, res) => {
    try {
      //*Authenticated User
      const { clinic_id, permission } = req.user;
      const newUser = req.body;
      newUser.clinic_id = clinic_id;

      //* Only Admins and Super Admins can create new users 
      if (permission < 2) {
        return res.status(401).json({ msg: "Unauthorized" });
      }

      //* Checks if the user_name is already in use by another user in the same clinic
      let user = await User.findOne({ where: { clinic_id, user_name: newUser.user_name } });
      if (user) {
        return res.status(409).json({ msg: `El nombre de usuario "${newUser.user_name}" ya esta en uso, selecione uno diferente.` })
      }

      //* Encrypt plain password
      const salt = await bcrypt.genSalt(12);
      newUser.password = await bcrypt.hash(newUser.password, salt);

      //* Insert new user in DB
      user = await User.create(newUser);

      if (!user) {
        return res.status(503).json({ msg: "No se ha podido crear el usuario, intentelo mas tarde" });
      }

      res.json({ msg: "OK" });

    } catch (error) {
      res.status(500).json({ ERROR: error.toString() });
    }
  }

  /**
   * @Route '/api/user/:user_id'
   * @Method PUT
   * @Access Pivate
   * @Description update single user 
   */
  update = () => async (req, res) => {
    try {
      res.json({ msg: "this route is not ready yet...`" })
    } catch (error) {
      res.status(500).json({ ERROR: error.toString() });
    }
  }

  /**
   * @Route '/api/user/change-password'
   * @Method POST
   * @Access Pivate
   * @Description change user password ** user must know confirm the current password
   */
  changePassword = () => async (req, res) => {
    try {
      let { currentPassword, newPassword } = req.body;
      const { user_name, clinic_id } = req.user;

      //* Checks if corrent pwd and new pwd are the same
      if (currentPassword === newPassword) {
        return res.status(409).json({ msg: "La nueva contraseña no debe ser igual a la actual" });
      }

      //* Find user by user_name and clinic_id
      const user = await User.findOne({ where: { user_name, clinic_id } });
      if (!user) {
        return res.status(409).json({ msg: "Unauthorized" });
      }

      //* check if current password matches
      const isPassword = await bcrypt.compare(currentPassword, user.password);
      if (!isPassword) {
        return res.status(409).json({ msg: "Incorrect Password" });
      }

      //* Encrypt new Password
      const salt = await bcrypt.genSalt(12);
      newPassword = await bcrypt.hash(newPassword, salt);
      //* update new user password 
      user.password = newPassword

      const isUpdated = await User.update(user.dataValues, { where: { id: user.id } });

      if (!isUpdated[0]) {
        res.status(503).json({ msg: " Ha ocurrido un error, intentelo mas tarde " });
      }

      res.json({ msg: "OK" });

    } catch (error) {
      res.status(500).json({ ERROR: error.toString() });
    }
  }

  /**
  * @Route '/api/user/reset-password-request'
  * @Method POST
  * @Access public
  * @Description Receives user email address via form, checks if there is a user associated with the email, 
  *              if so creates and store in DB a token and expiration date, and finally sends an email with the token
  */
  resetPasswordRequest = () => async (req, res) => {
    try {
      const { user_name, domain } = req.body;

      //* Check if there is a clinic asociated with the domain
      const clinic = await Clinic.findOne({ where: { domain } });
      if (!clinic) {
        return res.status(404).json({ msg: "Verifique que el usuario sea correcto." });
      }

      //* Find a user by user_name and clinic Id
      const { id } = clinic;
      const user = await User.findOne({ where: { clinic_id: id, user_name } });

      if (!user) {
        return res.status(404).json({ msg: "Verifique que el usuario sea correcto" });
      }

      //* Assign new Password Recovery Token to the user and expiration
      user.recovery_token = await crypto.randomBytes(32).toString('hex') + "_prt_" + user.id;
      user.exp_recovery_token = Date.now() + 3600000; //* Token will expire in 1 Hour

      //* Store updated user in DB
      const isUpdated = await User.update(user.dataValues, { where: { id: user.id } });

      if (!isUpdated[0]) {
        return res.status(503).json({ msg: "Se produjo un problema, intentelo mas tarde." });
      }

      //* Send Password Recovery email
      const msgData = {
        from: `Doc-App - PRT <no-reply-prt@${DOMAIN}>`,
        to: user.email,
        subject: `Recuperacion de contraseña`
      }

      const data = {
        name: user.first_name + " " + user.last_name,
        token: user.recovery_token
      }

      Mailer.mailGun(msgData, passwordRecovery(data));

      res.json({ msg: `El codigo de verificacion se envio a ${user.email}, revise su bandeja principal o de spam` });

    } catch (error) {
      res.status(500).json({ ERROR: error.toString() });
    }
  }

  /**
  * @Route '/api/user/reset-password/:token'
  * @Method GET
  * @Access public
  * @Description Checks if recovery token is associated with a user, and if has not expired, returns an Object
  */
  resetPassword = () => (req, res) => {
    try {

    } catch (error) {
      res.status(500).json({ ERROR: error.toString() });
    }
  }


  /**
   * @Description Returns jwtToken or error 
   */
  jwtToken = async ({ id, first_name, last_name, avatar, user_type, role, is_active, clinic_id }) => {
    try {
      const payload = { id, first_name, last_name, avatar, user_type, role, is_active, clinic_id };

      const token = await jwt.sign(payload, SECRET, { expiresIn: '1d' });

      return { success: true, token: `Bearer ${token}` };

    } catch (error) {
      return { success: false, error }
    }
  }

  /**
  * @Description Creats a directory for the clinic in the uploads folder
  */
  makeClinicDir = async (id) => {
    try {
      const newPath = path.join(__dirname, '../../uploads', id.toString());
      await fs.mkdirSync(newPath);
      //* sub directories
      const avatars = path.join(newPath, 'avatars');
      const clinic_imgs = path.join(newPath, 'clinicImgs');
      const patients_imgs = path.join(newPath, 'patientsImg');
      await fs.mkdirSync(avatars);
      await fs.mkdirSync(clinic_imgs);
      await fs.mkdirSync(patients_imgs);

      return { success: true, path: newPath }

    } catch (error) {
      return { success: false, error }
    }

  }

}

export default UsersController;