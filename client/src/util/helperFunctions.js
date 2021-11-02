import { regex_FindSlashes, regex_FindDashes } from './regex.js';

export const randomHexColor = () => `#${Math.floor(Math.random() * 17677215).toString(16)}`;

export const updateObj = (obj, newData) => {
	return {
		...obj,
		...newData,
	};
};

export const handleOnEnter = (e, callback) => {
	if (e.key === 'Enter') {
		e.preventDefault();
		callback();
	}
};

export const slugToText = (slug) => {
	const returnString = slug.replace(regex_FindSlashes, ' ').replace(regex_FindDashes, ' ');
	return returnString[0] === ' ' ? returnString.slice(1) : returnString;
};

export const returnPathSegment = (path, segment = 0, removeSymbols = false) => {
	const text = path.split('/').filter((e) => e !== '/')[segment + 1];
	return removeSymbols ? slugToText(text) : text;
};

export const titleCaps = (sentence) =>
	sentence
		.split(' ')
		.map((word) => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`)
		.join(' ');

export const checkForKey = (obj, key) => {
	return Object.keys(obj).includes(key);
};
