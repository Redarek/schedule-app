import {InputNames, InputValidator} from "./InputValidator";


export class FormValidator {
    formStatus: boolean;

    private inputs: InputValidator[]


    constructor(inputs: InputNames[]) {
        this.formStatus = false;
        this.inputs = inputs.map(input => new InputValidator(input));
    }


    private checkFormStatus() {
        let formStatus = false;
        for (let i = 0; i < this.inputs.length; i++) {
            formStatus = formStatus || this.inputs[i].getInputStatus()
        }
        this.formStatus = formStatus;
    }

    public getFormStatus(): boolean {
        this.checkFormStatus()
        return this.formStatus
    }

    public getInputs(): InputValidator[] {
        return this.inputs
    }

    public getInput(inputName:InputNames):InputValidator {
        let inputs = this.inputs;
        inputs = inputs.filter(input => input.getInputName() === inputName)
        //@ts-ignore
        return inputs[0];
    }
}
