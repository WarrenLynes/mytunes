// import * as env from 'dotenv/config';
import App from './app';

require('dotenv').config({path: __dirname + '../.env'});

const app = new App();

app.listen();
