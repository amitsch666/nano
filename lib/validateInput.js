const isAlphaNumeric = str => {
	for(let i of str) {
		let code = i.charCodeAt(0);
		if(!(code > 47 && code < 58) && // 0-9
	    !(code > 64 && code < 91) && // A-Z
		  !(code > 96 && code < 123)) { // a-z
			return false;
		}
	}
	return true;
};
const isLetter = ltr => {
	const code = ltr.charCodeAt(0);
	if(!(code > 64 && code < 91) && // A-Z
	  !(code > 96 && code < 123) && // a-z
		!(code > 191 && code < 224) && // uppercase Latin 1
		!(code > 223 && code < 256)) { // lowercase Latin 1
		return false;
	}
	return true;
};
const isAllowedCharacters = ltr => {
	const code = ltr.charCodeAt(0);
	if(!(code === 46) && // period
	  !(code === 44) && // comma
		!(code === 32) && // space
		!(code === 39) && // apostrophe
		!(code === 45)) { // dash
		return false;
	}
	return true;
};
const isName = nameval => {
	for(let i of nameval) {
		if(!isLetter(i) && !isAllowedCharacters(i)) return false;
	}
	return true;
};
const startsWithNumber = str => {
	const first = str.charCodeAt(0);
	if(first > 47 && first < 58) return true;
	return false;
}
const isEmail = email => {
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(email);
};

export const validateusername = e => {
  if(e.target.value.length === 0) {
		return 'Username cannot be blank.';
	} else if(startsWithNumber(e.target.value)) {
		return 'Username may not start with a number.'
	} else if(e.target.value.indexOf(' ') >= 0) {
		return 'Username cannot contain spaces.';
	} else if(!isAlphaNumeric(e.target.value)) {
		return 'Username may only have letters or numbers';
	} else if(e.target.value.length < 6 || e.target.value.length > 20) {
		return 'Username must be 6-20 characters long.';
	} else {
		return '';
	}
};

export const validateemail = e => {
	if(e.target.value.length === 0) {
		return 'Email cannot be blank.';
	} else if(!isEmail(e.target.value)) {
		return 'Please enter a valid email.';
	}
	return '';
};

export const validatefirstName = e => {
	if(e.target.value.length === 0) {
		return 'First Name cannot be blank.';
	} else if(!isLetter(e.target.value)) {
		return 'Names can only start with a letter.'
	} else if(!isName(e.target.value)) {
		return 'Only letters, spaces, hyphens, apostrophe, and periods.';
	}
	return '';
};

export const validatelastName = e => {
	if(e.target.value.length === 0) {
		return 'Last Name cannot be blank.';
	} else if(!isLetter(e.target.value)) {
		return 'Names can only start with a letter.'
	} else if(!isName(e.target.value)) {
		return 'Only letters, spaces, hyphens, apostrophe, and periods.';
	}
	return '';
};

export const validatepassword = e => {
	if(e.target.value.length === 0) {
		return 'Password is not optional.';
	} else if(e.target.value.length < 6 || e.target.value.length > 20) {
		return 'Password must be 6-20 characters long.';
	}
	return '';
};
