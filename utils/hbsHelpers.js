import hbs_sections from 'express-handlebars-sections';

export const hbsHelpers = {
	fill_section: hbs_sections(),
	eq(a, b) {
		return a === b;
	},
	ne(a, b) {
		return a !== b;
	},
	gt(a, b) {
		return a > b;
	},
	lt(a, b) {
		return a < b;
	},
	lte(a, b) {
		return a <= b;
	},
	gte(a, b) {
		return a >= b;
	},
	truncate(str, length) {
		if (!str || str.length <= length) return str;
		return str.substring(0, length) + '...';
	},
	format_number(value) {
		return new Intl.NumberFormat('en-US').format(value);
	},
	format_currency(value) {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND'
		}).format(value);
	},
	format_date(date) {
		if (!date) return '';
		return new Intl.DateTimeFormat('vi-VN', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}).format(new Date(date));
	},
	repeat(txt, count) {
		return txt.repeat(count);
	},
	math(l, op, r) {
		const left = Number(l);
		const right = Number(r);
		switch (op) {
			case '+': return left + right;
			case '-': return left - right;
			case '*': return left * right;
			case '/': return right !== 0 ? left / right : 0;
			default: return 0;
		}
	},
	range(start, end) {
		const arr = [];
		for (let i = Number(start); i <= Number(end); i++) {
			arr.push(i);
		}
		return arr;
	},
};
export default hbsHelpers;