import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const connection = new pg.Pool({
    connectionString: process.env.URL_DATABASE,
    password: process.env.PASSWORD_DATABASE,
    ssl: true
}) 

connection.query("SELECT NOW()", (err, res) => {
    if ( err ) {
        console.log("Ha ocuurrido un error durante la conexión a la base de datos", err)
    } else { 
        console.log("Conexión exitosa a la base de datos") 
    }
})
 
export default connection