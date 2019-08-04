import validator from 'validator';
import Helper from '../../utils/Helpers';

class UserValidations extends Helper {

    //* names min and max
    name_min = 2;
    name_max = 50;
    // password min and max;
    pwd_min = 8;
    pwd_max = 25;
    errors = {};

    checkNames(name, allowEmpty = false) {
          if(this.isEmpty(name) || allowEmpty){
            this.errors[name] = this.setResponse("Este campo es requerido", "This field is required");
        } else if(validator.isLength(name, {min: this.name_min, max: this.name_max })) {
            this.errors[name] = this.setResponse(
                `Este campo debe contener entre ${this.name_min} a ${this.name_max} caracteres como maximo`,
                `This field must contain between ${this.name_min}  to ${this.name_max} characters max`
            )
        }
    }

    checkEmail(email, allowEmpty = false) {
          if(this.isEmpty(email) || allowEmpty) {
            this.errors.email = this.setResponse("Por favor ingrese un correo electronico", "Please enter a valid email address");
        } else if(!validator.isEmail(email)) {
            this.errors.email = this.setResponse("El formato del correo es incorrecto", "The email format is invalid");
        }
    }

    checkPwd(pwd) {
    if(this.isEmpty(pwd)) {
                this.errors.password = this.setResponse("Por favor ingrese una contraseña", "Please enter a password");
            } else if(validator.isLength(pwd, { min: this.pwd_min, max: this.pwd_max })) {
                this.errors.password = this.setResponse(
                    "La contraseña debe tener entre 8 a 25 caracteres",
                    "The passoword must have between 8 to 25 characters"
                    )
            }
    }

    comparePwds(pwd1, pwd2) {
    if(this.isEmpty(password2)) {
                this.errors.password2 = this.setResponse("Confirme la contraseña", "Confirm the password")
            } else if(!validator.equals(password, password2)) {
                this.errors.password2 = this.setResponse("Las contraseñas no coinciden", "Passwords don't match");
            }
    }

    checkUserName(userName) {
        if(this.isEmpty(userName)){
            this.errors.user_name = this.setResponse("Ingrese su nombre de usuario", "Please enter your user name");
        } else if(!this.isUserName(userName)) {
            this.errors.user_name = this.setResponse(
                "El nombre de usuario solo puede contener letras, numeros y guiones, sin espacios",
                "The user name can only contain letters, numbers and hyphen, no spaces"
                );
        }
    }

    //* POST Validators
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
            if(!validator.isFQDN(domain)) {
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
        this.checkNames(first_name.trim());


        //* checks if first_name is not empty and set min and max lenght
        this.checkNames(last_name.trim())

        //* checks if emails is not empty and if is valid
        this.checkEmail(email.trim());



        //* Checks if Password is not empty and set min and max lenght
        this.checkPwd(password.trim())

        //* Checks if passwrod2 is not empty and if is equals password
        this.comparePwds(password.trim(), password2.trim());


        //*Checks if user name is empty and if is valid
        this.checkUserName(user_name.trim());


        if(!this.isEmpty(this.errors)) {
            return res.status(400).json(this.errors)
        }

        next();
    }

    loginValidation = () => (req, res, next) => {
      const { user_name, domain, password } = req.body;

        //*Checks if password field is empty
      if(this.isEmpty(password.trim())) {
          this.errors.password = this.setResponse("Ingrese su contraseña", "Enter your password");
      }

        //* Checks if user name is not empty and if is valid
        user_name = user_name.trim();
        if(this.isEmpty(user_name)){
            this.errors.user_name = this.setResponse("Ingrese su nombre de usuario", "Please enter your user name");
        } else if(!this.isUserName(user_name)) {
            this.errors.user_name = this.setResponse(
                "El nombre de usuario incorrecto",
                "Invalid user name"
                );
        }

          domain = domain.trim();
        if(!this.isEmpty(domain)) {
            //* Checks if is a valid domain
            if(!validator.isFQDN(domain)) {
                //* if is not a valid domain, checks if is a valid slug
                if(!this.isSlug(domain)) {
                    this.errors.user_name = this.setResponse(
                        "El nombre de usuario incorrecto",
                        "Invalid user name"
                    )
                }
            }
        } else {
            this.errors.user_name = this.setResponse(
                "El nombre de usuario incorrecto",
                "Invalid user name"
                );
        }

        if(!this.isEmpty(this.errors)) {
            return res.status(400).json(this.errors)
        }

        next();

    }

    createValidation = () => (req, res, next) => {

        let { first_name, middle_name, last_name, last_name2, password, user_name, email } = req.body;

        //* Check if names are not empty and valid
        this.checkNames(first_name.trim());
        this.checkEmail(middle_name.trim(), true);
        this.checkNames(last_name.trim());
        this.checkNames(last_name2.trim(), true);

        //* Check if password is not empty and valid
        this.checkPwd(password.trim());

        //* Checks if user name is not empty and valid
        this.checkUserName(user_name.trim());

        //* Check if email is valid
        this.checkEmail(email.trim(), true);

        if(!this.isEmpty(this.errors)) {
            return res.status(400).json(this.errors)
        }

        next();
    }

    resetPwdReqValidation = () => (req, res, next) => {
        const { user_name, domain } = req.body;

           //* Checks if user name is not empty and if is valid
        user_name = user_name.trim();
        if(this.isEmpty(user_name)){
            this.errors.user_name = this.setResponse("Ingrese su nombre de usuario", "Please enter your user name");
        } else if(!this.isUserName(user_name)) {
            this.errors.user_name = this.setResponse(
                "El nombre de usuario incorrecto",
                "Invalid user name"
                );
        }

        domain = domain.trim();
        if(!this.isEmpty(domain)) {
            //* Checks if is a valid domain
            if(!validator.isFQDN(domain)) {
                //* if is not a valid domain, checks if is a valid slug
                if(!this.isSlug(domain)) {
                    this.errors.user_name = this.setResponse( "El nombre de usuario incorrecto", "Invalid user name" )
                }
            }
        } else {
            this.errors.user_name = this.setResponse("El nombre de usuario incorrecto", "Invalid user name");
        }

        if(!this.isEmpty(this.errors)) {
            return res.status(400).json(this.errors)
        }

        next();

    }

    resetPwdValidation = () => (req, res, next) => {
        const { token, newPassword, newPassword2 } = req.body;

        //* Checks if token is not empty
        if(this.isEmpty(token)) {
            this.errors.token = this.setResponse("El token es requerido", "token is requierd");
        }

        //* Checks passwords
        this.checkPwd(newPassword.trim());
        this.comparePwds(newPassword.trim(), newPassword2.trim());


        if(!this.isEmpty(this.errors)) {
            return res.status(400).json(this.errors)
        }

        next();
    }

    changePwdValidation = () => (req, res, next) => {
        let { currentPassword, newPassword, newPassword2 } = req.body;

        //* Checks if currentPassword is not empty
        if(this.isEmpty(currentPassword)) {
            this.errors.currentPassword = this.setResponse("Ingrese su contraseña", "Enter your password");
        }

        this.checkPwd(newPassword.trim());
        this.comparePwds(newPassword.trim(), newPassword2.trim());

        if(!this.isEmpty(this.errors)) {
            return res.status(400).json(this.errors)
        }

        next();

    }


}


export default UserValidations;