/*
* Create and export configuration variables
*
*/

// Container for all of the environments
let environments = {};

// Default to staging environment
environments.staging = {
    'envName' : 'staging',
    'hashingSecret' : process.env.HASHING_SECRET,
    'prefix' : '!',
    'discord' : {
        'clientSecret' : process.env.DISCORD_CLIENT_SECRET,
        'botToken' : process.env.BOT_TOKEN
    }
};

// Production object
environments.production = {
    'envName' : 'production',
    'hashingSecret' : process.env.HASHING_SECRET,
    'prefix' : '!',
    'discord' : {
        'clientSecret' : process.env.DISCORD_CLIENT_SECRET,
        'botToken' : process.env.BOT_TOKEN
    }
};

// Determine which environemt was passed as a command-line arg
var selectedEnv = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : 'staging';

// Check that the currentEnv is valid
var envToExport = typeof(environments[selectedEnv]) == 'object' ? environments[selectedEnv] : environments.staging;

module.exports = envToExport;