import { Client, Pool } from 'pg';
//------------------------------------
//LOCALHOST
//------------------------------------
const connectionString = "postgres://postgres:postgres@localhost:5432/app_api";
//------------------------------------
//PRODUÇÃO
//------------------------------------
// const connectionString = "postgres://praiabrasil:8fnpx26L9zTr@postgres-1.server.b2ml.com.br:25060/praiabrasil";
//------------------------------------
console.log('URL postgres-> ', connectionString);

const client = new Client({
    connectionString: connectionString
});

const pool = new Pool({
    connectionString: connectionString
});

client.connect(function (err) {
    err ? console.log("Conexão com Cliente PostgreSQL => DESATIVADA") : console.log("Conexão com Cliente PostgreSQL => ATIVA [PORTA: 5432]");
});

pool.connect(function (err) {
    err ? console.log("Conexão com Pool PostgreSQL => DESATIVADA") : console.log("Conexão com Pool PostgreSQL => ATIVA [PORTA: 5432]");
});

export default { 
    client: client, 
    pool: pool, 
    connection: connectionString 
};