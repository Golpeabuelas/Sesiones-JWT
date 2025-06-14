import { Router } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const routes = Router() 

routes.get('/sign-up', (req, res) => {
    res.sendFile(join(__dirname, '../','public', 'web', 'sign_up.html'));
})

routes.get('/sign-in', (req, res) => {
    res.sendFile(join(__dirname, '../', 'public', 'web', 'sign_in.html'));
})

routes.get('/protectedd', (req, res) => {
    res.sendFile(join(__dirname, '../','public', 'web', 'welcome.html'));
    
})

routes.post('/protected', async (req, res) => {
    const token = req.body.token

    const data = jwt.verify(token, process.env.SECRET_KEY_TOKEN)

    console.log(data)
    res.json(data)
});


export default routes