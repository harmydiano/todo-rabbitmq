import '@babel/polyfill';
import config from 'config';
import http from 'http';
import loadRoutes from './routing';
import express from 'express';
import logger from 'morgan';
import initDatabase from './setup/database';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import Q from 'q';
import log from './setup/logging';
import session from 'express-session';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors({
    // exposedHeaders: ['ETag']
}));
app.use(session({
    secret: 's3cr3t',
    resave: true,
    saveUninitialized: true
}));

app.set('port', config.get('app.port'));

export default initDatabase()
    .then(() => {
        log.debug(`Database loaded - url - ${config.get('databases.mongodb.url')}`);
        return loadRoutes(app);
    })
    .then(async(app) => {
        const server = await http.createServer(app)
            .listen(config.get('app.port'));
        console.log(`\n
	\tApplication listening on ${config.get('app.baseUrl')}\n
	\tEnvironment => ${config.util.getEnv('NODE_ENV')} ${server}\n
    \tDate: ${new Date()}`);
        return Q.resolve(app);
    }, err => {
        console.log('There was an un catch error : ');
        console.error(err);
    });
