import validator from 'validator';


class Validations {

    //* names min and max
    name_min = 2;
    name_max = 30;
    //* password min and max;
    pwd_min = 8;
    pwd_max = 25;
    //* clinic name min and max
    clinic_name_min = 5;
    clinic_name_max = 200

    errors = {};

    checkNames(name, attributName = "", allowEmpty = false) {
        if (this.isEmpty(name) || allowEmpty) {
            this.errors[attributName] = this.setResponse("Este campo es requerido", "This field is required");
        } else if (!validator.isLength(name, { min: this.name_min, max: this.name_max })) {
            this.errors[attributName] = this.setResponse(
                `Este campo debe contener entre ${this.name_min} a ${this.name_max} caracteres como maximo`,
                `This field must contain between ${this.name_min}  to ${this.name_max} characters max`
            );
        }
    }

    checkEmail(email, allowEmpty = false) {
        if (this.isEmpty(email) || allowEmpty) {
            this.errors.email = this.setResponse("Por favor ingrese un correo electronico", "Please enter a valid email address");
        } else if (!validator.isEmail(email)) {
            this.errors.email = this.setResponse("El formato del correo es incorrecto", "The email format is invalid");
        }
    }

    checkPwd(pwd) {
        if (this.isEmpty(pwd)) {
            this.errors.password = this.setResponse("Por favor ingrese una contraseña", "Please enter a password");
        } else if (!validator.isLength(pwd, { min: this.pwd_min, max: this.pwd_max })) {
            this.errors.password = this.setResponse(
                "La contraseña debe tener entre 8 a 25 caracteres",
                "The passoword must have between 8 to 25 characters"
            );
        }
    }

    comparePwds(pwd1, pwd2) {
        if (this.isEmpty(pwd2)) {
            this.errors.password2 = this.setResponse("Confirme la contraseña", "Confirm the password");
        } else if (!validator.equals(pwd1, pwd2)) {
            this.errors.password2 = this.setResponse("Las contraseñas no coinciden", "Passwords don't match");
        }
    }

    checkUserName(userName) {
        if (this.isEmpty(userName)) {
            this.errors.user_name = this.setResponse("Ingrese su nombre de usuario", "Please enter your user name");
        } else if (!validator.isLength(userName, { min: this.name_min, max: this.name_max })) {
            this.errors.user_name =
                this.setResponse(
                    `El nombre de usuario debe tener entre ${this.name_min} a ${this.name_max} caracteres`,
                    `The user name must have between ${this.name_min} to ${this.name_max} characters`
                )
        } else if (!this.isUserName(userName)) {
            this.errors.user_name = this.setResponse(
                "El nombre de usuario solo puede contener letras, numeros y guiones, sin espacios",
                "The user name can only contain letters, numbers and hyphen, no spaces"
            );
        }
    }

    checkPhone(number) {
        return validator.isNumeric(number);
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
    * Name: setError
    * Description: Creates a custom error object, {required fields: message: str, status:num}, {optional: field?: str instructions?: str}
    */
    setResponse(msgSpa, msgEng) {
        return [msgSpa, msgEng];
    }

    /**
    * Name: setError (static method)
    * Description: Creates a custom error object, {required fields: message: str, status:num}, {optional: field?: str instructions?: str}
    */
    static setResponse(msgSpa, msgEng) {
        return { msgSpa, msgEng }
    }

    /**
    * Name: is_Empty,
    * Description: Evaluates if an element is empty, returns boolean value
    */
    isEmpty(value) {
        return (
            value === undefined ||
            value === null ||
            (typeof value === 'object' && Object.keys(value).length === 0) ||
            (typeof value === 'string' && value.trim().length === 0)
        );
    }

    /**
    * Name: is_Empty (static method),
    * Description: Evaluates if an element is empty, returns boolean value
    */
    static isEmpty(value) {
        return (
            value === undefined ||
            value === null ||
            (typeof value === 'object' && Object.keys(value).length === 0) ||
            (typeof value === 'string' && value.trim().length === 0)
        );
    }

    /**
    * Name: isDomain,
    * Description: Evaluates if a string is valid domain name, returns boolean value
    */
    isDomain(domain) {
        const domain_regex = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g;
        return domain_regex.test(domain);
    }

    /**
    * Name: isDomain (static method),
    * Description: Evaluates if a string is valid domain name, returns boolean value
    */
    static isDomain(domain) {
        const domain_regex = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g;
        return domain_regex.test(domain);
    }

    /**
    * Name: isUserName,
    * Description: Evaluates if a string is a user name slug no spaces only alpha numeric, hyphen and underscore are allowed
    */
    isUserName(userName) {
        const _regex = /^[a-zA-Z0-9-._]+$/;
        return _regex.test(userName)
    }

    /**
    * Name: isUserName (static method),
    * Description: Evaluates if a string is a user name slug no spaces only alpha numeric, hyphen and underscore are allowed
    */
    static isUserName(userName) {
        const _regex = /^[a-zA-Z0-9-._]+$/;
        return _regex.test(userName)
    }

    /**
    * Name: isSlug,
    * Description: Evaluates if a string is a valid slug no spaces only alpha numeric and dashes are allowed, returns boolean value
    */
    isSlug(url) {
        const url_regex = /^[a-zA-Z0-9-]+$/;
        return url_regex.test(url);
    }

    /**
    * Name: isSlug (static method),
    * Description: Evaluates if a string is a valid slug no spaces only alpha numeric and dashes are allowed, returns boolean value
    */
    static isSlug(url) {
        const url_regex = /^[a-zA-Z0-9-_]+$/;
        return url_regex.test(url);
    }
}

export default Validations;