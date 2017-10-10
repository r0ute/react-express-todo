let config;

try {
    config = require('./settings');
} catch (e) {
    console.warn("Cannot load settings file. Using defaults.");
    config = require('./default')
}

module.exports = config;