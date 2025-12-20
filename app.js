import express from 'express';
import { engine } from 'express-handlebars';
import session from 'express-session';
import helpers from './views/helpers.js';

import homeRouter from './routes/home.route.js';
import accountRouter from './routes/account.route.js';
import courseRouter from './routes/course.route.js';
import adminCourseRouter from './routes/admin/course.route.js';
import adminCategoryRouter from './routes/admin/category.route.js';

import authMiddleware from './middlewares/auth.middleware.js';
import errorMiddleware from './middlewares/error.middleware.js';
import viewMiddleware from './middlewares/view.middleware.js';

// 1. Core setup: Place these at the start of the file
// const __dirname = import.meta.dirname;
const app = express();
const port = 3000;

app.set('trust proxy', 1) // trust first proxy

// 2. Static + middleware provided by libraries: Place these before routes
app.use('/public', express.static('public'));

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
app.use(viewMiddleware.injectGlobals);
app.use(viewMiddleware.injectAuthState);

// 6. Routers
app.use('/', homeRouter);
app.use("/account", accountRouter);
app.use("/course", courseRouter);
app.use("/admin/course", authMiddleware.requireAuth, authMiddleware.requireAdmin, adminCourseRouter);
app.use("/admin/category", authMiddleware.requireAuth, authMiddleware.requireAdmin, adminCategoryRouter);

// 8. Error handling middleware
app.use(errorMiddleware.notFound);

// 9. Start the server: Place this at the end of the file.
app.listen(port, function () {
    console.log(`Server is running on port ${port}`);
});