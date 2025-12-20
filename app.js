import express from 'express';
import { engine } from 'express-handlebars';
import session from 'express-session';
import helpers from './views/helpers.js';

import accountRouter from './routes/account.route.js';
import adminCourseRouter from './routes/admin/course.route.js';
import adminCategoryRouter from './routes/admin/category.route.js';
import courseRouter from './routes/course.route.js';

import categoryModel from './models/category.model.js';
import courseModel from './models/course.model.js';
import { checkAuthenticated, checkAdmin } from './middlewares/auth.middleware.js';
import { CONST } from './utils/constant.js';

// 1. Core setup: Place these at the start of the file
// const __dirname = import.meta.dirname;
const app = express();
const port = 3000;

app.set('trust proxy', 1) // trust first proxy

// 2. Static + middleware provided by libraries: Place these before routes
app.use('/static', express.static('static'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // set true if we had https certificate, set false temporarily for practicing
}));

// 3. View engine setup: Place these before rendering
app.engine('hbs', engine({
    extname: '.hbs',
    layoutsDir: "views/layouts",
    partialsDir: "views/partials",
    helpers: helpers,
}));
app.set('view engine', 'hbs');
app.set('views', './views');

// 4. Body parsers: Place these before routes to parse into req.body
app.use(express.urlencoded({
    extended: true
}));

// 5. Global middleware: Place these before routes to create global data
app.use(async function (req, res, next) {
    res.locals.global_categories = await categoryModel.findAll();
    next();
});

app.use(function (req, res, next) {
    if (req.session.isAuthenticated) {
        res.locals.isAuthenticated = true;
        res.locals.authUser = req.session.authUser;
    }

    next();
});

// 6. Routers
app.use("/admin/course", checkAuthenticated, checkAdmin, adminCourseRouter);
app.use("/admin/category", checkAuthenticated, checkAdmin, adminCategoryRouter);
app.use("/course", courseRouter);
app.use("/account", accountRouter);

// 7. Normal routes
app.get('/', async function (req, res) {
    if (req.session.isAuthenticated) {
        console.log(req.session.authUser);
    }

    const courses = await courseModel.findAll();
    const coursesToShow = courses.slice(0, CONST.CAROUSEL_ITEMS);
    res.render('pages/common/home', {
        courses: coursesToShow,
    });
});

// 8. Error handling middleware
app.use(function (req, res) {
    res.status(404).render('pages/error/404');
});

// 9. Start the server: Place this at the end of the file.
app.listen(port, function () {
    console.log(`Server is running on port ${port}`);
});