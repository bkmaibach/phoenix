const https = require('https');

lib = {}

lib.getJoke = () => {

    return new Promise( (resolve, reject) => {
        let requestDetails = {
            'protocol': 'https:',
            'hostname' : 'icanhazdadjoke.com',
            'method' : 'GET',
            'headers': {
                'Accept' : 'application/json',
            }
        };
    
        //Instantiate a request object
        let req = https.request(requestDetails, (res) => {
            //Grab the status of the sent request
            var status = res.statusCode;
    
            let buffer = '';

            res.on('data', (data)=>{
                buffer += data;
                debug(buffer);
                let joke = JSON.parse(buffer).joke;
                debug('JOKE OBTAINED: ' + joke);
                resolve(joke);
            });
    
            //Return success if the request went through
            if(status >= 200 && status < 300){
                debug('Joke successfully retrieved');
            } else {
                reject('No dad joke for you');
                debug(status);
            }
        });
        //Bind to the error event so it doesn't get thrown
        req.on('error', (error) => {
            reject(error);
        });

        //End the request
        req.end();
    });

};

module.exports = lib;