import { Router } from "express"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

import connection from "./connection.js"

const methods = Router()
dotenv.config()
methods.get('/find-email-registered/:email', async (req, res) => {
    const email = req.params.email

    const result = await connection.query('SELECT * FROM sesiones WHERE correo = $1', [email])

    if ( result.rows.length > 0 ) {
        res.json({ status: 505 })
        console.log('hijodeperra ya entra')
    } if ( result.rows.length === 0 ) {
        res.json({ status: 201 })
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

methods.post('/login', async (req, res) => {
    const correo = req.body.correo
    const contraseña = req.body.contraseña

    const usuario = await connection.query('SELECT * FROM sesiones WHERE correo = $1', [correo])

    if ( usuario.rows.length === 0 ) {
        res.json({ status: 404 })
    } else if ( usuario.rows.length === 1 ) {
        const allowed = bcrypt.compareSync(contraseña, usuario.rows[0].contraseña)

        if ( !allowed ) {
            res.json({ status: 403 })
        }

        const token = jwt.sign({ 
            id: usuario.rows[0].id, usuario: usuario.rows[0].nombre, correo: usuario.rows[0].correo }, 
            process.env.SECRET_KEY_TOKEN, 
            { expiresIn: '12h'})
        console.log(jwt.verify(token, process.env.SECRET_KEY_TOKEN))
        res.json({ status: 200, token })
    }
})

methods.post('decrypt-jwt', (req, res) => {
    const token = req.body.token

    try {
        const data = jwt.verify(token, process.env.SECRET_KEY_TOKEN)
        console.log('token:', data)
        res.json(data)
    } catch (error) {
        console.log('efe efe papa yiyi')
        res.sendFile(join(__dirname, '../', 'public', 'web', 'sign_in.html'))
    }
})

export default methods