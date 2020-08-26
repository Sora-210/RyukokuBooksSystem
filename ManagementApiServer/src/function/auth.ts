import { verify, VerifyOptions, sign ,SignOptions } from 'jsonwebtoken';
import { DB } from '../database/index';
import { LoginError, UnkownError } from '../error/index';
import { readFileSync } from 'fs';
import { Router } from 'express';
const checkAuthRouter = Router();

const KEY = readFileSync(__dirname + '/../config/api_rsa');
const PUBKEY = readFileSync(__dirname + '/../config/api_rsa.pub');

async function createUser(name: string, password_hash: string) {
    const createT = await DB.Sequelize.transaction();
    try {
        const dbData = {
            name: name,
            password_hash: password_hash
        };
        const dbOptions = {
            transaction: createT
        };
        const createRes = await DB.Users.create(dbData, dbOptions);
        createT.commit();
    } catch(e) {
        createT.rollback();
    }
};

async function createToken(name: string, password_hash: string) {
    try {
        const getT = await DB.Sequelize.transaction();
        const dbOptions = {
            where: {
                name: name,
                password_hash: password_hash
            },
            transaction: getT
        };
        const getRes = await DB.Users.count(dbOptions);
        if (getRes !== 1) {
            throw new LoginError('WrongNameOrPassword');
        };
        getT.commit();
        // 署名処理
        const signOptions: SignOptions = {
            algorithm: 'RS256',
            expiresIn: '30m'
        };
        const payload = {
            name: name
        };
        const token = await sign(payload, KEY, signOptions);
        return token;
    } catch (e) {
        if (e instanceof LoginError) {
            throw new LoginError('WrongNameOrPassword');
        } else {
            throw new UnkownError('');
        };
    };
};
async function checkAuth(token:string) {
    try {
        const options: VerifyOptions = {
            algorithms: ["RS256"]
        };
        await verify(token, PUBKEY, options);
        return true;
    } catch (e) {
        return false;
    };
};

checkAuthRouter.use(async(req, res, next) => {
    const isCheckToken = await checkAuth(String(req.headers['token']))
    if (isCheckToken) {
        next();
    } else {
        res.status(403).json();
    }
})

export {
    checkAuth,
    createToken,
    createUser,
    checkAuthRouter
}