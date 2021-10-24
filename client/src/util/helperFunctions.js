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
