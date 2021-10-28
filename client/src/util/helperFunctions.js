// import moment from 'moment';

export const randomHexColor = () => `#${Math.floor(Math.random() * 17677215).toString(16)}`;

export const updateObj = (obj, newData) => {
	return {
		...obj,
		...newData,
	};
};

export const handleOnEnter = (e, callback) => {
	if (e.key === 'Enter') {
		callback();
	}
};

export const slugToText = (slug) =>
	slug.replace(new RegExp(/\//gi), ' ').replace(new RegExp(/-/gi), ' ');

export const titleCaps = (sentence) =>
	sentence
		.split(' ')
		.map((word) => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`)
		.join(' ');
