const notFound = (req, res) => {
    res.status(404).render('pages/error/404');
};

export default {
    notFound,
};
