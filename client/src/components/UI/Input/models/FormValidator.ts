import {InputNames, InputValidator} from "./InputValidator";


export class FormValidator {
    formStatus: boolean;

    protected inputs: InputValidator[]

    constructor(inputs: InputNames[]) {
        this.formStatus = false;
        this.inputs = inputs.map(input => new InputValidator(input));
    }


    private checkFormStatus() {
        let formStatus = false;
        for (let i = 0; i < this.inputs.length; i++) {
            // if (this.inputs[i].getInputStatus()) console.log(this.inputs[i].getInputName())
            if (this.inputs[i].getInputStatus()) console.log(i)
            formStatus = formStatus || this.inputs[i].getInputStatus()
        }
        this.formStatus = formStatus;
    }

    public getFormStatus(): boolean {
        this.checkFormStatus()
        return !this.formStatus
    }

    public getInputs(): InputValidator[] {
        return this.inputs
    }

    public getInputByName(inputName: InputNames): InputValidator {
        let inputs = this.inputs;
        inputs = inputs.filter(input => input.getInputName() === inputName)
        //@ts-ignore
        return inputs[0];
    }

    public getInputByIndex(index: number): InputValidator {
        return this.inputs[index]
    }
}
