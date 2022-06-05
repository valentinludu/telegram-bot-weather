const isString = (string) => {
  if (typeof string !== 'string') {
    return false;
  }

  return string.split('').every((char) => {
    if (typeof char !== 'string') {
      return false;
    }

    return Boolean(/^[a-zA-Z]+$/.test(char));
  });
};

module.exports = isString;
