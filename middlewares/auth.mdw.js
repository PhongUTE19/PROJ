export function checkAuthenticated(req, res, next) {
    if (req.session.isAuthenticated) {
        next();
    } else {
        req.session.retUrl = req.originalUrl;
        res.redirect('/account/signin');
    }
}

export function checkAdmin(req, res, next) {
    if (req.session.authUser.permission === 1)
        next()
    else {
        res.render('vwAccount/403');
    }
}