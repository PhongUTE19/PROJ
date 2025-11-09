import express from 'express';
import bcrypt from 'bcryptjs';
import userModel from '../models/user.model.js';
import { checkAuthenticated } from '../middlewares/auth.mdw.js';

const router = express.Router();

router.get('/signup', function (req, res) {
    res.render('vwAccount/signup');
});

router.get('/is-available', async function (req, res) {
    const username = req.query.username;
    const user = await userModel.findByUsername(username);
    if (!user) {
        return res.json(true);
    }
    return res.json(false);
});

router.get('/signin', function (req, res) {
    res.render('vwAccount/signin', {
        error: false,
    });
});

router.get('/profile', checkAuthenticated, function (req, res) {
    res.render('vwAccount/profile', {
        user: req.session.authUser
    });
});

router.get('/change-password', checkAuthenticated, function (req, res) {
    res.render('vwAccount/change-password', {
        user: req.session.authUser
    });
});

router.post('/signup', async function (req, res) {
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const user = {
        username: req.body.username,
        password: hashPassword,
        name: req.body.name,
        email: req.body.email,
        dob: req.body.birthdate,
        permission: 0,
    }

    await userModel.add(user);
    res.render('vwAccount/signup')
    // res.send(JSON.stringify(user))
});

router.post('/signin', async function (req, res) {
    const user = await userModel.findByUsername(req.body.username);
    if (!user) {
        return res.render('vwAccount/signin', {
            error: true
        });
    }

    const passwordMatch = bcrypt.compareSync(req.body.password, user.password)
    if (passwordMatch === false) {
        return res.render('vwAccount/signin', {
            error: true
        });
    }

    req.session.isAuthenticated = true;
    req.session.authUser = user;

    const retUrl = req.session.retUrl || '/';
    delete req.session.retUrl;
    res.redirect(retUrl);

    // res.redirect('/');
});

router.post('/signout', function (req, res) {
    req.session.isAuthenticated = false;
    req.session.authUser = null;
    // res.redirect('/signin');
    res.redirect(req.headers.referer);
});

router.post('/profile', checkAuthenticated, async function (req, res) {
    const id = req.body.id;
    const user = {
        name: req.body.name,
        email: req.body.email,
    };
    await userModel.patch(id, user);

    req.session.authUser.name = req.body.name;
    req.session.authUser.email = req.body.email;

    res.render('vwAccount/profile', {
        user: req.session.authUser
    });
});

router.post('/change-password', checkAuthenticated, async function (req, res) {
    const id = req.body.id;
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;

    const ret = bcrypt.compareSync(currentPassword, req.session.authUser.password);
    if (ret === false)
        return res.render('vwAccount/change-password', {
            user: req.session.authUser,
            error: true
        });

    const hashPassword = bcrypt.hashSync(newPassword, 10);
    const user = {
        password: hashPassword
    };

    await userModel.patch(id, user);
    req.session.authUser.password = hashPassword;

    res.render('vwAccount/change-password', {
        user: req.session.authUser,
        success: true
    });
});

export default router;