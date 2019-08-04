import validator from 'validator';
import Helper from '../../utils/Helpers';

class UserValidations extends Helper {

    errors = {};

    registerValidation = () => (req, res, next) => {

        let { name, domain, account_type, first_name, last_name, email, password, password2, user_name } = req.body;

        //* Checks if clinic Name is Empty
        if(this.isEmpty(name.trim())) {
            this.errors.name = this.setResponse("Este campo es requerido", "This field is required");
        }

        //*Checks if domain field is Emtpy
        domain = domain.trim();
        if(!this.isEmpty(domain)) {
            //* Checks if is a valid domain
            if(!this.isDomain(domain)) {
                //* if is not a valid domain, checks if is a valid slug
                if(!this.isSlug(domain)) {
                    this.errors.domain = this.setResponse(
                        "El dominio o url son invalidos, solo se permiten letras numeros y guiones, sin espacios",
                        "The domain or url are invalid, only letters, numbers and hyphen are allowed, no spaces"
                    )
                }
            }
        } else {
            this.errors.domain = this.setResponse(
                "Selecione un dominio o cree una url unica para su cuenta",
                "Select a domain or create a unique url for your account"
                );
        }

        //* Checks if account_type is empty
        if(this.isEmpty(account_type.trim())) {
            this.errors.account_type = this.setResponse("Este campo es requerido", "This field is required");
        }

        //* checks if first_name is not empty and set min and max lenght
        first_name = first_name.trim();
        if(this.isEmpty(first_name)){
            this.errors.first_name = this.setResponse("Este campo es requerido", "This field is required");
        } else if(validator.isLength(first_name, {min: 2, max: 50 })) {
            this.errors.first_name = this.setResponse(
                "Este campo debe contener entre 2 a 50 caracteres como maximo",
                "This field must contain between 2 to 50 characters max"
            )
        }

        //* checks if first_name is not empty and set min and max lenght
        last_name = last_name.trim();
        if(this.isEmpty(last_name)){
            this.errors.last_name = this.setResponse("Este campo es requerido", "This field is required");
        } else if(validator.isLength(last_name, {min: 2, max: 50 })) {
            this.errors.last_name = this.setResponse(
                "Este campo debe contener entre 2 a 50 caracteres como maximo",
                "This field must contain between 2 to 50 characters max"
            )
        }

        //* checks if emails is not empty and if is valid
        email = email.trim()
        if(this.isEmpty(email)) {
            this.errors.email = this.setResponse("Por favor ingrese un correo electronico", "Please enter a valid email address");
        } else if(!validator.isEmail(email)) {
            this.errors.email = this.setResponse("El formato del correo es incorrecto", "Invalid Email format")
        }


        //* Checks if Password is not empty and set min and max lenght
        password = password.trim();
        if(this.isEmpty(password)) {
            this.errors.password = this.setResponse("Por favor ingrese una contraseña", "Please enter a password");
        } else if(validator.isLength(password, { min: 8, max: 25 })) {
            this.errors.password = this.setResponse(
                "La contraseña debe tener entre 8 a 25 caracteres",
                "The passoword must have between 8 to 25 characters"
                )
        }

        password2 = password2.trim();
        if(this.isEmpty(password2)) {
            this.errors.password2 = this.setResponse("Confirme la contraseña", "Confirm the password")
        } else if(!validator.equals(password, password2)) {
            this.errors.password2 = this.setResponse("Las contraseñas no coinciden", "Passwords don't match");
        }



        user_name = user_name.trim();
        if(this.isEmpty(user_name)){
            this.errors.user_name = this.setResponse("Ingrese su nombre de usuario", "Please enter your user name");
        } else if(!this.isSlug(user_name)) {
            this.errors.user_name = this.setResponse(
                "El nombre de usuario solo puede contener letras, numeros y guiones, sin espacios",
                "The user name can only contain letters, numbers and hyphen, no spaces"
                );
        }

        if(!this.isEmpty(this.errors)) {
            return res.status(400).json(this.errors)
        }

        next();
    }
}


export default UserValidations;