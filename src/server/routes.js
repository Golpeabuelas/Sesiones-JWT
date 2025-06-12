import { Router } from "express"

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

export default routes