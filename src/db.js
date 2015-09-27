import Sequelize from "sequelize";
import User from "models/User";

export default function() {
    var sequelize = new Sequelize(undefined, undefined, undefined, {
        dialect: 'sqlite',
        storage: './db/test.sqlite'
    });

    User(sequelize);
}

