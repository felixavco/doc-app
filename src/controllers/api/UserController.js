import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import db from '../../models';
import Mailer from '../../server/mailer/Mailer';
const { Clinic, User } = db;
const { SECRET } = process.env;

class UserController {

  /**
   * @Route '/api/user/register'
   * @Method POST
   * @Access Public
   * @Description Creates the clinic to asociate the user, then and assig admin rights by default and sends verification email, return jwt token;
   */
  register = () => async (req, res) => {
    try {
      const { name, domain, firstName, lastName, email, password } = req.body;
      const newClinic = { name, domain };
      const newUser = { firstName, lastName, email, password };

      //* Checks if the domain is already taken
      let clinic = await Clinic.findOne({ where: { domain } });
      if (clinic) {
        return res.status(409).json({ message: `El dominio '${domain}' ya esta en uso por otra cuenta, selecione uno diferente.` })
      }

      //* If the domain is available creates a new clinic.  
      clinic = await Clinic.create(newClinic);

      //* Create the relation between the user and the clinic through the clinic Id.
      const clinicId = clinic.dataValues.id
      newUser.clinicId = clinicId;

      //* Checks if the email is already in use
      let user = await User.findOne({ where: { email } });
      if (user) {
        return res.status(409).json({ message: `El correo '${email}' ya esta en uso, selecione uno diferente.` })
      }

      //* Create a random verification token
      newUser.verificationToken = await crypto.randomBytes(32).toString('hex');
      //* Set expiration to verification token
      newUser.expVerificationToken = Date.now() + 3600000; //* Token will expire in 1 Hour

      //* Encrypt User password 
      bcrypt.genSalt(12, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          User.create(newUser)
            .then(user => {
              const { id, firstName, lastName, clinicId } = user.dataValues;

              //TODO MAILER 

              //* Prepare JWT Payload
              const payload = {
                id,
                firstName,
                middleName: user.dataValues.middleName || "",
                lastName,
                lastName2: user.dataValues.lastName2 || "",
                clinicId
              }
              //*Send JWT token
              jwt.sign(payload, SECRET, { expiresIn: '1d' }, (err, token) => {
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

  mailTester = () => (req, res) => {

    const mailer = new Mailer();

    const msgData = {
      from: "tica.email.team@gmail.com", 
      to: "felixavco@gmail.com",
      bcc: "hey@felixavelar.com", 
      replyTo: "tica.mail.team@gmail.com", 
      subject: "Hello this is a test from Mailer"
    }

    mailer.send(msgData, "<h1>Hello this a test message</h1>")

    res.send("Testing Mailer......");
  }

}

export default UserController;