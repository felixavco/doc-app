import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import db from '../../models';
const { Account, User } = db;
const { SECRET } = process.env;

class UserController {

  /**
   * @Route '/api/user/register'
   * @Method POST
   * @Access Public
   * @Description Creates the account to asociate the user, then and assig admin rights by default and sends verification email, return jwt token;
   */
  register = () => async (req, res) => {
    try {
      const { name, domain, firstName, lastName, email, password } = req.body;
      const newAccount = { name, domain };
      const newUser = { firstName, lastName, email, password };

      //* Checks if the domain is already taken
      let account = await Account.findOne({ where: { domain } });
      if (account) {
        return res.status(409).json({ message: `El dominio '${domain}' ya esta en uso por otra cuenta, selecione uno diferente.` })
      }

      //* If the domain is available creates a new account.  
      account = await Account.create(newAccount);

      //* Create the relation between the user and the account through the account Id.
      const accountId = account.dataValues.id
      newUser.accountId = accountId;

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
              const { id, firstName, lastName, accountId } = user.dataValues;

              //TODO SEND VERIFICATIO TOKEN VIA EMAIL

              //* Prepare JWT Payload
              const payload = {
                id,
                firstName,
                middleName: user.dataValues.middleName || "",
                lastName,
                lastName2: user.dataValues.lastName2 || "",
                accountId
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

}

export default UserController;