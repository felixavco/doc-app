import validator from 'validator';
import Validations from './Validations';

class VisitValidation extends Validations {

    createValidation = () => (req, res, next) => {

        let {
            temperature,
            blood_presure,
            height,
            weight,
            diagnose,
            notes,
        } = req.body;

        temperature = temperature ? temperature.trim() : "";
        blood_presure = blood_presure ? blood_presure.trim() : "";
        height = height ? height.trim() : "";
        weight = weight ? weight.trim() : "";
        diagnose = diagnose ? diagnose.trim() : "";
        notes = notes ? notes.trim() : "";


        //Checking for blood_presure, diagnose and notes

        this.isEmpty(blood_presure, "blood_presure", true);
        this.isEmpty(diagnose, "diagnose");
        this.isEmpty(notes, "notes");

        //*Check numeric values
        this.checkNumericValue(temperature);
        this.checkNumericValue(height);
        this.checkNumericValue(weight);
    }
}

export default VisitValidations