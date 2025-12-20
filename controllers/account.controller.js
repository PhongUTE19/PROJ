import accountService from '../services/account.service.js';

const signupPage = (req, res) => {
    res.render('pages/account/signup');
};

const signinPage = (req, res) => {
    res.render('pages/account/signin', {
        error: false
    });
};

const profilePage = (req, res) => {
    res.render('pages/account/profile', {
        user: req.session.authUser
    });
};

const changePasswordPage = (req, res) => {
    res.render('pages/account/change-password', {
        user: req.session.authUser
    });
};

const isAvailable = async (req, res) => {
    const available = await accountService.isUsernameAvailable(req.query.username);
    res.json(available);
};

const signup = async (req, res) => {
    await accountService.register(req.body);
    res.render('pages/account/signup');
};

const signin = async (req, res) => {
    const result = await accountService.login(req.body);

    if (!result.success) {
        return res.render('pages/account/signin', {
            error: true
        });
    }

    req.session.isAuthenticated = true;
    req.session.authUser = result.user;

    const retUrl = req.session.retUrl || '/';
    delete req.session.retUrl;
    res.redirect(retUrl);
};

const signout = (req, res) => {
    req.session.isAuthenticated = false;
    req.session.authUser = null;
    res.redirect(req.headers.referer);
};

const updateProfile = async (req, res) => {
    const user = await accountService.updateProfile(req.body);
    req.session.authUser = { ...req.session.authUser, ...user };

    res.render('pages/account/profile', {
        user: req.session.authUser
    });
};

const changePassword = async (req, res) => {
    const success = await accountService.changePassword(req.body, req.session.authUser);

    if (!success) {
        return res.render('pages/account/change-password', {
            user: req.session.authUser,
            error: true
        });
    }

    res.render('pages/account/change-password', {
        user: req.session.authUser,
        success: true
    });
};

export default {
    signupPage,
    signinPage,
    profilePage,
    changePasswordPage,
    isAvailable,
    signup,
    signin,
    signout,
    updateProfile,
    changePassword
};
