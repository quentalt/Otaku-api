require('dotenv').config();
const pg = require('pg');

module.exports = {
    development: {
        use_env_variable: 'POSTGRES_DATABASE',
        dialect: 'postgres',
        dialectModule: pg,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    },
    test: {
        use_env_variable: 'POSTGRES_DATABASE',
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    },
    production: {
        use_env_variable: 'POSTGRES_DATABASE',
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
};
