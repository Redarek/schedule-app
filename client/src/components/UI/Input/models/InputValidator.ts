enum InputErrors {
    MIN_LENGTH_5_ERROR = 'Минимальная длина 5 символов',
    MIN_LENGTH_3_ERROR = 'Минимальная длина 3 символов',
    MAX_LENGTH_50_ERROR = 'Масимальная длина 50 символов',
    EMAIL_DOMAIN_ERROR = 'Пропушены символы @domain.com',
    INVALID_VALUE_ERROR = 'Недопустимые символы',
    INVALID_DATE_ERROR = 'Дата не может быть меньше предыдущей',
    MIN_VALUE = 'Минимум',
}

export enum InputNames {
    EMAIL = 'email',
    PASSWORD = 'password',
    NAME = 'name',
    TASK_TITLE = 'task-title',
    DATE_START = 'date-start',
    DATE_FIRST_END = 'date-first-end',
    DATE_SECOND_END = 'date-secondEnd',
    TASK_REWARD = 'task-reward',

    FILE_NAME = 'file-name',
}

interface ErrorsStatus {
    checkedSymbols: boolean;
    checkedEmailSymbol: boolean;
    checkedMinLength3: boolean;
    checkedMinLength5: boolean;
    checkedMaxLength: boolean;
    checkedDate: boolean;
    checkedMinimumValue: boolean
}

export class InputValidator {
    protected inputName: InputNames;
    private inputValue: string;
    private inputStatus: boolean;
    private errorsStatus: ErrorsStatus
    private inputError: string | null;
    private minNumberValue: number


    constructor(inputName: InputNames) {
        this.inputValue = ''
        this.inputStatus = true;
        this.inputName = inputName;
        this.errorsStatus = {
            checkedSymbols: false,
            checkedEmailSymbol: false,
            checkedMinLength3: false,
            checkedMinLength5: false,
            checkedMaxLength: false,
            checkedDate: false,
            checkedMinimumValue: false,
        }
        this.minNumberValue = 0;
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

    private checkMinValue(str: string) {
        const value = Number(str)
        if (value >= this.minNumberValue) {
            this.errorsStatus.checkedMinimumValue = false
        } else {
            this.errorsStatus.checkedMinimumValue = true
        }
    }

    private checkPreviousDate(inputValue: string, previousInputValue: string) {
        const prevDate = new Date(previousInputValue)
        const inputDate = new Date(inputValue)
        switch (this.inputName) {
            case InputNames.DATE_FIRST_END:
                if (prevDate.getTime() < inputDate.getTime()) {
                    this.errorsStatus.checkedDate = false;
                } else {
                    this.errorsStatus.checkedDate = true;
                }
                break;
            case InputNames.DATE_SECOND_END:
                if (prevDate.getTime() <= inputDate.getTime()) {
                    this.errorsStatus.checkedDate = false;
                } else {
                    this.errorsStatus.checkedDate = true;
                }
                break;
            default:
                break;
        }
    }

    private setInputError() {
        this.inputError = null;
        if (this.errorsStatus.checkedEmailSymbol) {
            this.inputError = InputErrors.EMAIL_DOMAIN_ERROR;
        }
        if (this.errorsStatus.checkedMaxLength) {
            this.inputError = InputErrors.MAX_LENGTH_50_ERROR
        }
        if (this.errorsStatus.checkedMinLength3) {
            this.inputError = InputErrors.MIN_LENGTH_3_ERROR
        }
        if (this.errorsStatus.checkedMinLength5) {
            this.inputError = InputErrors.MIN_LENGTH_5_ERROR
        }
        if (this.errorsStatus.checkedSymbols) {
            this.inputError = InputErrors.INVALID_VALUE_ERROR
        }
        if (this.errorsStatus.checkedDate) {
            this.inputError = InputErrors.INVALID_DATE_ERROR
        }
        if (this.errorsStatus.checkedMinimumValue) {
            this.inputError = InputErrors.MIN_VALUE + ` ${this.minNumberValue}`
        }

    }

    public checkInput(inputValue: string) {
        this.inputValue = inputValue
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
            case InputNames.TASK_TITLE:
                this.checkMinLength(inputValue, 3);
                break;
            case InputNames.TASK_REWARD:
                this.minNumberValue = 0
                this.checkMinValue(inputValue)
                break;
            default:
                break;
        }
        this.setInputError();
        this.setInputStatus()
    }

    public checkDateInput(inputValue: string, previousInputValue: string) {
        this.inputValue = inputValue;
        switch (this.inputName) {
            case InputNames.DATE_START:
                break;
            case InputNames.DATE_FIRST_END:
                this.checkPreviousDate(inputValue, previousInputValue)
                break;
            case InputNames.DATE_SECOND_END:
                this.checkPreviousDate(inputValue, previousInputValue)
                break;
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
            || this.errorsStatus.checkedDate
            || this.errorsStatus.checkedMinimumValue
    }

    public getInputValue(): string {
        return this.inputValue;
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
