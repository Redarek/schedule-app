module.exports = class UserDto {
    email;
    id;
    isActivated;
    role;
    name;
    spec;
    balance;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.role = model.role;
        this.name = model.name;
        this.spec = model.spec;
        this.balance = model.balance;
    }
}