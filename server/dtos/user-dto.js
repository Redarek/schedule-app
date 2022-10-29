module.exports = class UserDto {
    email;
    _id;
    isActivated;
    role;
    name;
    spec;
    balance;

    constructor(model) {
        this.email = model.email;
        this._id = model._id;
        this.isActivated = model.isActivated;
        this.role = model.role;
        this.name = model.name;
        this.spec = model.spec;
        this.balance = model.balance;
    }
}