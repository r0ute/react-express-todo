let config;

try {
    // actual settings must be put into settings.js file
    config = require('./settings');
} catch (e) {
    console.warn("Cannot load settings file. Using defaults.");
    config = require('./default')
}

module.exports = config;