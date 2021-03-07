import express from 'express'
import path from 'path'
//import {requestTime, logger} from './middlewares.js'
//import serverRoutes from './routes/servers.js'
import referenceRoutes from './routes/references.js';
import {getRandomString} from './controllers/references.js'
import {allowCrossDomain} from "./middlewares.js";

const __dirname = path.resolve()
const PORT = process.env.PORT ?? 3000;
const app = express()

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'ejs'))

//app.use(express.static(path.resolve(__dirname, 'static')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
//app.use(requestTime)
//app.use(logger)

app.use(allowCrossDomain);
/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});*/

//app.use(serverRoutes)
app.use(referenceRoutes)



app.get('/', (req, res) => {
    res.render('randomString', {title: 'RandomString', randomString: getRandomString()})
})

// app.get('/', (req, res) => {
//     res.render('index', {title: 'Main Page', active: 'main'})
// })
//
// app.get('/features', (req, res) => {
//     res.render('features', {title: 'Features Page', active: 'features'})
// })

// app.get('/', (req, res) => {
//     //res.send('<h1>Hello, Express!</h1>')
//     res.sendFile(path.resolve(__dirname, 'static', 'index.html'))
// })

// app.get('/features', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'static', 'features.html'))
// })

// app.get('/download', (req, res) => {
//     console.log(req.requestTime)
//     res.download(path.resolve(__dirname, 'static', 'index.html'))
// })

app.use(function(req, res, next) {
    res.status(404).send('404 Not Found');
});

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT} ...`)
})
