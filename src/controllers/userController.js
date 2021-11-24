import * as userService from '../services/userService.js';

async function signup(req, res) {
    try {
      const { name, email, password } = req.body;
  
      if (!name || !email || !password) {
        return res.sendStatus(400);
      }
  
      const existingUserWithGivenEmail = await userService.getByEmail(email);
  
      if (existingUserWithGivenEmail) {
        return res.sendStatus(409);
      }
  
      await userService.addUser({name, email, password});
  
      res.sendStatus(201);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

async function signin (req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
        return res.sendStatus(400);
        }


        const user = await userService.validateUserCredentials({ email, password });
        if (!user) {
        return res.sendStatus(401);
        }

        const token = await userService.signin(user.id);

        res.send({
        token,
        });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export {
    signup,
    signin,
}
