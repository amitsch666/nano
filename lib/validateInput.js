const Validator = require('validator');

const locales = [
  'en-US',
  'es-ES',
  'fr-FR',
  'de-DE',
  'pt-BR',
  'nb-NO',
  'nn-NO',
  'da-DK',
  'cs-CZ',
  'pl-PL',
  'sr-RS@latin',
  'tr-TR',
];

const isAlpha = (text) => {
  for (let i = 0; i < locales.length; i += 1) {
    if (Validator.isAlpha(text, locales[i])) return true;
  }
  return false;
};
const isAllowedCharacter = (ltr) => {
  const code = ltr.charCodeAt(0);
  if (!(code === 46) && // period
    !(code === 44) && // comma
    !(code === 32) && // space
    !(code === 39) && // apostrophe
    !(code === 45)) { // hyphen
    return false;
  }
  return true;
};
const isPrintableASCII = (text) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const i of text) {
    if ((text.charCodeAt(i) < 33) || (text.charCodeAt(i) > 126)) return false;
  }
  return true;
};
const isValidName = (name) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const i of name) {
    if (!isAlpha(i) && !isAllowedCharacter(i)) return false;
  }
  return true;
};

module.exports.validateemail = (value) => {
  if (Validator.isEmpty(value)) return 'Email cannot be blank.';
  if (!Validator.isEmail(value)) return 'Please enter a valid email.';
  return '';
};
module.exports.validatefirstName = (value) => {
  if (Validator.isEmpty(value)) return 'First name cannot be blank.';
  if (!isAlpha(value.charAt(0))) return 'Names may only start with a letter.';
  if (!isValidName(value)) return 'Only letters, spaces, hyphens, apostrophe, and periods allowed.';
  return '';
};
module.exports.validatelastName = (value) => {
  if (Validator.isEmpty(value)) return 'Last name cannot be blank.';
  if (!isAlpha(value.charAt(0))) return 'Names may only start with a letter.';
  if (!isValidName(value)) return 'Only letters, spaces, hyphens, apostrophe, and periods allowed.';
  return '';
};
module.exports.validateusername = (value) => {
  if (Validator.isEmpty(value)) return 'Username cannot be blank.';
  if (!Validator.isAlpha(value.charAt(0))) return 'Usernames must start with a letter.';
  if (Validator.contains(value, ' ')) return 'Usernames may not contain spaces.';
  if (!Validator.isAlphanumeric(value)) return 'Usernames may only have letters or numbers.';
  if (value.length < 6) return 'Usernames cannot be shorter than 6 characters.';
  if (value.length > 50) return 'Usernames cannot be longer than 50 characters.';
  return '';
};
module.exports.validateusernameoremail = (value) => {
  if (Validator.isEmail(value)) return '';
  if ((Validator.isEmpty(value)) ||
    (!Validator.isAlpha(value.charAt(0))) ||
    (Validator.contains(value, ' ')) ||
    (!Validator.isAlphanumeric(value)) ||
    (value.length < 6) ||
    (value.length > 50)) return 'You must enter a valid username or email.';
  return '';
};
module.exports.validatepassword = (value) => {
  if (Validator.isEmpty(value)) return 'Password is not optional.';
  if (value.length < 8) return 'Passwords must be at least 8 characters long.';
  if (!isPrintableASCII(value)) return 'Only letters, numbers, and common special characters allowed.';
  return '';
};
