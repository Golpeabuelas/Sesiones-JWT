import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

dotenv.config()

import routes from './src/server/routes.js';
import methods from './src/server/http.js';

app.set('port', process.env.PORT || 3000)

app.use(morgan('dev'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(join(__dirname, 'src', 'public', 'assets', 'images'))); 
app.use('/public', express.static(join(__dirname, 'src', 'public')))

app.use(routes)
app.use(methods)

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'src', 'public', 'web', 'index.html'));
});


app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
    console.log(process.env.WEBSITE_URL);
})
