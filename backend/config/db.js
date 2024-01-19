import mysql from 'mysql2';
const conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:'',
    database:'quiz',
});
export default conn;