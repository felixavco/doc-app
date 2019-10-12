import validator from 'validator';
import Validations from './Validations';

class UserValidations extends Validations {

    //* POST Validators
    registerValidation = () => (req, res, next) => {

        let { name, domain, account_type, first_name, last_name, email, password, password2, user_name } = req.body;

        password = password.trim(); 
        password2 = password2.trim(); 

        //* Checks if clinic Name is Empty
        if (this.isEmpty(name)) {
            this.errors.name = "Este campo es requerido";
        } else if (!validator.isLength(name, {min: this.clinic_name_min, max: this.clinic_name_max })) {
            this.errors.name = `El nombre de su clinica debe de tener entre ${this.clinic_name_min} a ${this.clinic_name_max} caracteres`;
        }

        //*Checks if domain field is Emtpy
        if (!this.isEmpty(domain)) {
            //* Checks if is a valid domain
            if (!validator.isFQDN(domain)) {
                //* if is not a valid domain, checks if is a valid slug
                if (!this.isSlug(domain)) {
                    this.errors.domain = "El dominio o el ID de su cuenta son invalidos, solo se permiten letras numeros y guiones, sin espacios";
                }
            }
        } else {
            this.errors.domain = "Selecione un dominio o cree una url unica para su cuenta";
        }

        //* Checks if account_type is empty
        if (this.isEmpty(account_type)) {
            this.errors.account_type = "Este campo es requerido";
        }

        //* checks if first_name is not empty and set min and max lenght
        this.checkNames(first_name, 'first_name');


        //* checks if first_name is not empty and set min and max lenght
        this.checkNames(last_name, 'last_name');

        //* checks if emails is not empty and if is valid
        this.checkEmail(email);

        //* Checks if Password is not empty and set min and max lenght
        this.checkPwd(password);

        //* Checks if passwrod2 is not empty and if is equals password
        this.comparePwds(password, password2);

        //*Checks if user name is empty and if is valid
        this.checkUserName(user_name);

        if (!this.isEmpty(this.errors)) {
            return res.status(400).json(this.errors)
        }

        next();
    }

    loginValidation = () => (req, res, next) => {
        let { user_name, domain, password } = req.body;

        user_name = user_name ? user_name.trim() : '';
        domain = domain ? domain.trim() : '';
        password = password ? password.trim() : '';

        //*Checks if password field is empty
        if (this.isEmpty(password)) {
            this.errors.password = "Ingrese su contraseña";
        }

        //* Checks if user name is not empty and if is valid
        if (this.isEmpty(user_name)) {
            this.errors.user_name = "Ingrese su nombre de usuario";
        } else if (!this.isUserName(user_name)) {
            this.errors.user_name = "El nombre de usuario es incorrecto";
        }

        if (!this.isEmpty(domain)) {
            //* Checks if is a valid domain
            if (!validator.isFQDN(domain)) {
                //* if is not a valid domain, checks if is a valid slug
                if (!this.isSlug(domain)) {
                    this.errors.user_name = "El nombre de usuario incorrecto";
                }
            }
        } else {
            this.errors.user_name = "El nombre de usuario incorrecto";
        }

        if (!this.isEmpty(this.errors)) {
            return res.status(400).json(this.errors)
        }

        next();

    }

    createValidation = () => (req, res, next) => {

        let { first_name, middle_name, last_name, last_name2, password, user_name, email } = req.body;

        first_name = first_name ? first_name.trim() : "";
        middle_name = middle_name ? middle_name.trim() : "";
        last_name = last_name ? last_name.trim() : "";
        last_name2 = last_name2 ? last_name2.trim() : "";
        password = password ? password.trim() : "";
        user_name = user_name ? user_name.trim() : "";
        email = email ? email.trim() : "";

        //* Check if names are not empty and valid
        this.checkNames(first_name, 'first_name');
        this.checkEmail(middle_name, 'middle_name', true);
        this.checkNames(last_name, 'last_name');
        this.checkNames(last_name2, 'last_name2', true);

        //* Check if password is not empty and valid
        this.checkPwd(password);

        //* Checks if user name is not empty and valid
        this.checkUserName(user_name);

        //* Check if email is valid
        this.checkEmail(email, true);

        if (!this.isEmpty(this.errors)) {
            return res.status(400).json(this.errors)
        }

        next();
    }

    resetPwdReqValidation = () => (req, res, next) => {
        let { user_name, domain } = req.body;

        user_name = user_name ? user_name.trim() : '';
        domain = domain ? domain.trim() : '';

        //* Checks if user name is not empty and if is valid
        if (this.isEmpty(user_name)) {
            this.errors.user_name = "Ingrese su nombre de usuario";
        } else if (!this.isUserName(user_name)) {
            this.errors.user_name = "El nombre de usuario incorrecto";
        }

        if (!this.isEmpty(domain)) {
            //* Checks if is a valid domain
            if (!validator.isFQDN(domain)) {
                //* if is not a valid domain, checks if is a valid slug
                if (!this.isSlug(domain)) {
                    this.errors.user_name = "El nombre de usuario incorrecto";
                }
            }
        } else {
            this.errors.user_name = "El nombre de usuario incorrecto";
        }

        if (!this.isEmpty(this.errors)) {
            return res.status(400).json(this.errors)
        }

        next();

    }

    resetPwdValidation = () => (req, res, next) => {
        let { token, newPassword, newPassword2 } = req.body;

        token = token ? token.trim() : '';
        newPassword = newPassword ? newPassword.trim() : '';
        newPassword2 = newPassword2 ? newPassword2.trim() : '';

        //* Checks if token is not empty
        if (this.isEmpty(token)) {
            this.errors.token = "El token es requerido";
        }

        //* Checks passwords
        this.checkPwd(newPassword);
        this.comparePwds(newPassword, newPassword2);


        if (!this.isEmpty(this.errors)) {
            return res.status(400).json(this.errors)
        }

        next();
    }

    changePwdValidation = () => (req, res, next) => {
        let { currentPassword, newPassword, newPassword2 } = req.body;

        currentPassword = currentPassword ? currentPassword.trim() : '';
        newPassword = newPassword ? newPassword.trim() : '';
        newPassword2 = newPassword2 ? newPassword2.trim() : '';

        //* Checks if currentPassword is not empty
        if (this.isEmpty(currentPassword)) {
            this.errors.currentPassword = "Ingrese su contraseña";
        }

        this.checkPwd(newPassword);
        this.comparePwds(newPassword, newPassword2);

        if (!this.isEmpty(this.errors)) {
            return res.status(400).json(this.errors)
        }

        next();

    }


}


export default UserValidations;