import jwt from 'jsonwebtoken';
import models from '../database/models';
/**
 * Express middleware to verify if request has jwt auth token
 * @param {object} req express request object
 * @param {object} res express response object
 * @param {function} next express middleware next() function
 * @returns {function} express next() function
 */
export default async (req, res, next) => {
  const accessToken = req.body.access_token || req.query.access_token || req.headers['x-access-token'];

  try {
    const userData = jwt.verify(accessToken, 'secret');
    const user = await models.User.findOne({ where: { email: userData.email } });
    if (user) {
      req.authUser = user.get();
      return next();
    }

    throw new Error('Invalid token.');
  } catch (e) {
    return res.sendFailureResponse({ message: 'Unauthenticated.' }, 401);
  }
};
