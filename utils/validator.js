const isEmpty = (value) => {
    return !value || value.toString().trim() === '';
};

const minLength = (value, min) => {
    return value && value.length >= min;
};

const isEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

export default {
    isEmpty,
    minLength,
    isEmail,
};