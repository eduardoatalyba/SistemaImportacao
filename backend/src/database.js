const { Sequelize } = require("sequelize");

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.db = new Sequelize({
            database: "inventory",
            username: "postgres",
            password: "4t4lyb4h",
            host: "localhost",
            port: 5432,
            dialect: "postgres",
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            logging: false // Desativa logs SQL no console (opcional)
        });
    }
}

module.exports = new Database();