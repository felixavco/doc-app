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

        if(this.isEmpty(blood_presure)){
            this.errors.blood_presure = this.setResponse("Este campo es requerido", "This field is required");
        }

        if(this.isEmpty(diagnose)){
             this.errors.diagnose = this.setResponse("Este campo es requerido", "This field is required");
        }
        if(this.isEmpty(notes)){
             this.errors.notes = this.setResponse("Este campo es requerido", "This field is required");
        }

        //*Check numeric values
        this.checkNumericValue(temperature);
        this.checkNumericValue(height);
        this.checkNumericValue(weight);
    }
}

export default VisitValidations