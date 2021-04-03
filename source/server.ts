import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import reportRoutes from './routes/report-routes';
import fileUploadRoutes from './routes/file-upload-routes';
import hbs from 'express-handlebars';
import path from 'path';

const router = express();

// // Sets our app to use the handlebars engine
// router.set('view engine', 'handlebars');
// //Sets handlebars configurations (we will go through them later on)
// router.engine('handlebars', hbs({
//     layoutsDir: __dirname + '/views/layouts',
// }));

router.set('view engine', 'hbs');
router.set('views', path.join(__dirname, 'views'));
router.engine('hbs', hbs({
    defaultLayout: 'index',
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views'),
}));

// router.use(express.static('public'))

/**  Routes */
router.get('/', (req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render('main', { layout: 'index' });
});

router.use('/report', reportRoutes);
router.use('/file', fileUploadRoutes);

/** Error handling */

router.use((req, res, next) => {

    const error = new Error('Not Found');

    return res.status(404).json({ message: error.message });

})

/** Create the server */
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => {
    console.log(`Server is listening on ${config.server.hostname}:${config.server.port}`);
})