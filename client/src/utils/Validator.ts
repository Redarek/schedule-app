export class Validator {
    checkSymbols(string: string): boolean {
        const symbols = [' ', '<', '>', '(', ')', '[', ']', ',', ';', ':', '\\', '/', '"', '*', "'"];
        for (let i = 0; i < symbols.length; i++) {
            if (-1 !== string.indexOf(`${symbols[i]}`)) return true
        }
        return false
    }

    checkEmailSymbol(string: string): boolean {
        if (-1 === string.indexOf('@')) return true
        const localName = string.substring(0, string.indexOf('@'));
        const domainName = string.substring(string.indexOf('@') + 1);
        if (-1 === domainName.indexOf('.')) return true
        return false
    }

    checkMinLength(string: string, value: number): boolean {
        if (string.length < value) return true;
        else return false
    }

    checkMaxLength(string: string, value: number): boolean {
        if (string.length > value) return true;
        else return false
    }
}
