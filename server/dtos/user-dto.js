module.exports = class UserDto {
    email;
    _id;
    isActivated;
    roles;
    name;
    spec;
    balance;

    constructor(model) {
        this.email = model.email;
        this._id = model._id;
        this.isActivated = model.isActivated;
        this.roles = model.roles;
        this.name = model.name;
        this.spec = model.spec;
        this.balance = model.balance;
    }
}