const getIcon = require('./getIcon');

const getText = (info) => {
  return (
    getIcon(info.weather[0].main) +
    '' +
    'Current temperature in ' +
    info.name +
    ' is ' +
    info.main.temp +
    '°C with wind speed of ' +
    info.wind.speed +
    ' and humidity level is of ' +
    info.main.humidity +
    ' .'
  );
};

module.exports = getText;
