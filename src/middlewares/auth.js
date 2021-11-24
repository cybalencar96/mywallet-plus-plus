import jwt from "jsonwebtoken";
import * as userService from '../services/userService.js';

async function auth(req, res, next) {
    try {
        const authorization = req.headers.authorization || "";
        const token = authorization.split('Bearer ')[1];

        if (!token) {
            return res.sendStatus(401);
          }

        const user = jwt.verify(token, process.env.JWT_SECRET);

        res.locals.user = user;
        res.locals.token = token;
        next();
    } catch (error) {
        res.sendStatus(401);
    }
}

export {
    auth,
}