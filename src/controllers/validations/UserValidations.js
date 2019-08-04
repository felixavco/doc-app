import validator from 'validator';
import Helper from '../../utils/Helpers';

class UserValidations extends Helper {

    errors = {};

    registerValidation = () => (req, res, next) => {

        const { name, domain, account_type, first_name, last_name, email, password, user_name } = req.body;

        if(this.isEmpty(email)) {
            this.errors.email = this.setResponse("Por favor ingrese un correo electronico", "Please enter a valid email address");
        }

        if(!this.isEmpty(this.errors)) {
            return res.status(400).json(this.errors)
        }

        next();
    }
}


export default UserValidations;