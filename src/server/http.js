import { Router } from "express"
import connection from "./connection.js"
import bcrypt from 'bcrypt'
const methods = Router()

methods.get('/find-email-registered/:email', async (req, res) => {
    const email = req.params.email
    console.log(email)
    const result = await connection.query('SELECT * FROM sesiones WHERE correo = $1', [email])

    if ( result.rows.length > 0 ) {
        res.json({ status: 505 })
        console.log('hijodeperra ya entra')
    } if ( result.rows.length === 0 ) {
        console.log('el lenk es: ' + result.rows.length)
    }
})

methods.post('/create-session', (req, res) => {
    const nombre = req.body.nombre 
    const correo = req.body.correo
    const contraseña = req.body.contraseña

    const hashedPassword = bcrypt.hashSync(contraseña, 10)

    const result = connection.query('INSERT INTO sesiones(nombre, correo, contraseña) VALUES($1, $2, $3)', [nombre, correo, hashedPassword])

    res.json({status: 202})
})

export default methods