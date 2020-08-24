import { verify, VerifyOptions } from 'jsonwebtoken';
const KEY = require(__dirname + '../config/api_rsa');

function checkAuth(token: string):boolean {
    try {
        const options: VerifyOptions = {
            algorithms: ["HS256"]
        };
        const decode = verify(token, KEY, options);
        return true;
    } catch (e) {
        return false;
    };
};

export {
    checkAuth
}