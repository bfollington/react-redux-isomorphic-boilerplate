import Sequelize from "sequelize";
import * as models from 'models';

export default function() {
    var sequelize = new Sequelize(undefined, undefined, undefined, {
        dialect: 'sqlite',
        storage: './db/test.sqlite',
        logging: false
    });

    global.db = global.db || {};

    for (var model in models) {
        models[model](sequelize);
    }

    return sequelize;
}

export var settings = {
    force: false
};
