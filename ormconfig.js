
module.exports = {
    "type": "postgres",
    "port": process.env.DB_PORT,
    "host": process.env.DB_HOST,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "entities": ["./src/modules/*/entities/*.ts"],
    "migrations": ["./src/database/migrations/*.ts"],
    "cli": {
        "migrationsDir": "./src/database/migrations"
    }
}