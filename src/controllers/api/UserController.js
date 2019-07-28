import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import db from '../../models';
import Mailer from '../../server/mailer/Mailer';
import verificationEmail from '../../server/mailer/templates/verificationEmail';
const { Clinic, User } = db;
const { SECRET, DOMAIN } = process.env;


class UserController {

  /**
   * @Route '/api/user/register'
   * @Method POST
   * @Access Public
   * @Description Creates the clinic to asociate the user, then and assig admin rights by default and sends verification email, return jwt token;
   */
  register = () => async (req, res) => {
    try {
      const { name, domain, account_type, first_name, last_name, email, password, userName } = req.body;
      const newClinic = { name, domain, account_type };
      const newUser = { first_name, last_name, userName, email, password };

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
      const clinic_id = clinic.dataValues.id
      newUser.clinic_id = clinic_id;
      //* Assign user_type DOCTOR and role SUPER_ADMIN by default;
      newUser.user_type = "DOCTOR";
      newUser.role = "SUPER_ADMIN";

      //* Encrypt User password 
      bcrypt.genSalt(12, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          User.create(newUser)
            .then(user => {
              const { id, first_name, last_name, clinic_id } = user.dataValues;

              //* Send Verification email 
              const msgData = {
                from: `Doc-App <no-reply-verification@${DOMAIN}>`,
                to: user.dataValues.email,
                subject: "Welcome to Doc-App, Please Verify Your Domain"
              }

              const data = {
                name: first_name + " " + last_name,
                token: newUser.verification_token
              }

              Mailer.mailGun(msgData, verificationEmail(data));

              //* Prepare JWT Payload
              const payload = {
                id,
                first_name,
                middleName: user.dataValues.middleName || "",
                last_name,
                last_name2: user.dataValues.last_name2 || "",
                clinic_id
              }
              //*Send JWT token
              jwt.sign(payload, SECRET, { expiresIn: '1d' }, (err, token) => {
                if (err) throw err;
                res.status(201).json({
                  success: true,
                  token: `Bearer ${token}`
                });
              });
            }).catch(err => { throw err });
        });
      });

    } catch (error) {
      console.error("_catch: " + error);
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

    } catch (error) {
      console.error("_catch: " + error);
      res.status(500).json({ ERROR: error.toString() });
    }
  }

}

export default UserController;