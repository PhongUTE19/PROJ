import faqModel from '../models/faq.model.js';

const getAll = async () => {
    return faqModel.findAll();
};

export default {
    getAll,
};