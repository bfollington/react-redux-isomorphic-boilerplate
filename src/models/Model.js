export default class Model {
    constructor(data) {
        if (this.validate(data)) {
            this.data = data;
        }
    }

    get(field) {
        return this.data[field];
    }

    clone(changes) {
        var data = Object.assign({}, this.data, changes);
        return new this.__proto__.constructor(data);
    }

    validate(data) {
        return true;
    }
}
