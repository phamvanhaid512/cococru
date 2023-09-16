import { promisify } from 'util';
import { sign, verify } from 'jsonwebtoken';
import AppError from '../utils/appError';
import { to, ReE, ReS } from '../utils/util.service';
import { jwt_secret, jwt_expires_in, host, port } from '../config/config';
import { User } from '../models';

import { errorCode } from '../utils/util.helper';
import CONFIG from '../config/config';
import { log } from 'console';
import { __ } from 'i18n';

const request = require('request');

const createToken = (id) => {
    return sign(
        {
            id
        },
        jwt_secret,
        {
            expiresIn: jwt_expires_in
        }
    );
};

export async function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}
export async function protect(req, res, next) {
    try {
        // 1) check if the token is there
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return next(new AppError(401, 'fail', 'You are not logged in! Please login in to continue'), req, res, next);
        }

        // 2) Verify token
        const decode = await promisify(verify)(token, jwt_secret);
        // console.log("decode", decode)
        // 3) check if the user is exist (not deleted)
        // const user = await User.findByPk(decode.id);
        const user = await User.findByPk(decode.id, {
            raw: true,
            nest: true
            // include: ['role']
            // through: { attributes: ["title","description"] },
            // attributes: ['email'],
        });
       
        if (!user) {
            return next(new AppError(401, 'fail', 'This user is no longer exist'), req, res, next);
        }
        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
}