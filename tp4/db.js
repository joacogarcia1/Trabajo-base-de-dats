import mysql from "mysql2/promise";

export const conn = await mysql.createConnection({
    // Completar con los datos de la conexión a la base de datos
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "spoticfy"
});
