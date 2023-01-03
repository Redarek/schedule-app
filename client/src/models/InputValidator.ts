enum Errors {
    MIN_LENGTH_5_ERROR = 'Минимальная длина 5 символов',
    MIN_LENGTH_3_ERROR = 'Минимальная длина 3 символов',
    MAX_LENGTH_50_ERROR = 'Масимальная длина 50 символов',
    EMAIL_DOMAIN_ERROR = 'Пропушены символы @domain.com',
    INVALID_VALUE_ERROR = 'Недопустимые символы'
}

export enum InputNames {
    EMAIL = 'email',
    PASSWORD = 'password',
    NAME = 'name',
    DATE = 'date'
}

interface ErrorsStatus {
    checkedSymbols: boolean;
    checkedEmailSymbol: boolean;
    checkedMinLength3: boolean;
    checkedMinLength5: boolean;
    checkedMaxLength: boolean;
}

export class InputValidator {
    private inputName: InputNames;
    private inputStatus: boolean;
    private errorsStatus: ErrorsStatus
    private inputError: string | null;


    constructor(inputName: InputNames) {
        this.inputStatus = true;
        this.inputName = inputName;
        this.errorsStatus = {
            checkedSymbols: false,
            checkedEmailSymbol: false,
            checkedMinLength3: false,
            checkedMinLength5: false,
            checkedMaxLength: false,
        }
        this.inputError = null;
    }

    private checkSymbols(string: string) {
        const symbols = [' ', '<', '>', '(', ')', '[', ']', ',', ';', ':', '\\', '/', '"', '*', "'"];
        for (let i = 0; i < symbols.length; i++) {
            if (-1 !== string.indexOf(`${symbols[i]}`)) {
                this.errorsStatus.checkedSymbols = true;
            } else {
                this.errorsStatus.checkedSymbols = false;
            }
        }
    }

    private checkEmailSymbol(string: string) {
        const localName = string.substring(0, string.indexOf('@'));
        const domainName = string.substring(string.indexOf('@') + 1);
        if (-1 === string.indexOf('@')) {
            this.errorsStatus.checkedEmailSymbol = true;
        } else if (-1 === domainName.indexOf('.')) {
            this.errorsStatus.checkedEmailSymbol = true;
        } else {
            this.errorsStatus.checkedEmailSymbol = false;
        }
    }

    private checkMinLength(string: string, value: 3 | 5) {
        if (string.length < value) {
            switch (value) {
                case 5:
                    this.errorsStatus.checkedMinLength5 = true;
                    break;
                case 3:
                    this.errorsStatus.checkedMinLength3 = true;
                    break;
            }
        } else {
            this.errorsStatus.checkedMinLength3 = false;
            this.errorsStatus.checkedMinLength5 = false;
        }

    }

    private checkMaxLength(string: string, value: 50) {
        if (string.length > value) {
            this.errorsStatus.checkedMaxLength = true
        } else {
            this.errorsStatus.checkedMaxLength = false;
        }
    }

    private setInputError() {
        this.inputError = null;
        if (this.errorsStatus.checkedEmailSymbol) {
            this.inputError = Errors.EMAIL_DOMAIN_ERROR;
        }
        if (this.errorsStatus.checkedMaxLength) {
            this.inputError = Errors.MAX_LENGTH_50_ERROR
        }
        if (this.errorsStatus.checkedMinLength3) {
            this.inputError = Errors.MIN_LENGTH_3_ERROR
        }
        if (this.errorsStatus.checkedMinLength5) {
            this.inputError = Errors.MIN_LENGTH_5_ERROR
        }
        if (this.errorsStatus.checkedSymbols) {
            this.inputError = Errors.INVALID_VALUE_ERROR
        }

    }

    public checkInput(inputValue: string) {
        switch (this.inputName) {
            case InputNames.EMAIL:
                this.checkMinLength(inputValue, 5);
                this.checkSymbols(inputValue);
                this.checkMaxLength(inputValue, 50);
                this.checkEmailSymbol(inputValue);
                break;
            case InputNames.PASSWORD:
                this.checkMinLength(inputValue, 5);
                break;
            case InputNames.NAME:
                this.checkMinLength(inputValue, 3);
                break;
            case InputNames.DATE:
                break
            default:
                break;
        }
        this.setInputError();
        this.setInputStatus()
    }

    private setInputStatus() {
        this.inputStatus =
            this.errorsStatus.checkedMinLength5
            || this.errorsStatus.checkedMinLength3
            || this.errorsStatus.checkedSymbols
            || this.errorsStatus.checkedMaxLength
            || this.errorsStatus.checkedEmailSymbol
    }

    public getInputStatus(): boolean {
        return this.inputStatus
    }

    public getInputError(): string | null {
        return this.inputError;
    }

    public getInputName(): InputNames {
        return this.inputName
    }
}
