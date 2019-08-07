import validator from 'validator';
import Validations from './Validations';

class PatientValidations extends Validations {
    
    createValidation = () => (req, res, next) => {

        let { first_name, middle_name, last_name, last_name2, email, phone, phone2 } = req.body;

        //Checking for names
        this.checkNames(first_name, "first_name");
        this.checkNames(middle_name, "middle_name", true);
        this.checkNames(last_name, "last_name");
        this.checkNames(last_name2, "last_name2", true);

        //* Check for a valid address, **Optional
        this.checkEmail(email, true);

        //*Check Phones
        this.checkPhone(phone);
        this.checkPhone(phone2);

        if (!this.isEmpty(this.errors)) {
            return res.status(400).json(this.errors)
        }

        next();
    }
}

export default PatientValidations