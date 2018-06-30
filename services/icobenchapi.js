const request = require('request');
const CryptoJS = require('crypto-js');
const keys = require('../config/dev');

class ICObench {
    constructor(){
        this.publicKey = keys.icoBenchPublic;
        this.privateKey = keys.icoBenchPrivate;
        this.apiUrl = 'https://icobench.com/api/v1/';

        this.get = this.get.bind(this);
    }

    get(action, callback, data = {}) {
        let dataJSON = JSON.stringify(data);
        let sign = CryptoJS.HmacSHA384(dataJSON, this.privateKey);
        sign = CryptoJS.enc.Base64.stringify(sign);
        request.post(this.apiUrl + action, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-ICObench-Key': this.publicKey,
                'X-ICObench-Sig': sign,
            },
            forever: true,
            json: data
        }, function (error, response, body){
            if (error) {
                console.log('Error!');
            } else {
                console.log('Success!');
                callback(body);
                }
            }
        );
    }
}


module.exports = ICObench;