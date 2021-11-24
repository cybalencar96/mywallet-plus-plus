import * as userRepository from '../repositories/userRepository.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function getByEmail(email) {
    const user = await userRepository.get({ email });

    return user;
}

async function addUser (userData = {}) {
    const {
        name, email, password
    } = userData;

    const hashedPassword = bcrypt.hashSync(password, 12);

    const userAdded = await userRepository.insert({name, email, hashedPassword});

    return userAdded;
}

async function validateUserCredentials ({email, password}) {
    const user = await getByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return false;
    }

    return user;
}

async function signin(userId) {
    const token = jwt.sign({
        id: userId
      }, process.env.JWT_SECRET);

    return token;
}

export {
    getByEmail,
    addUser,
    validateUserCredentials,
    signin,
}