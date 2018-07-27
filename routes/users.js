const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users');

const { validateParam, validateBody, schemas }  = require('../helpers/userRouterHelper');


router.route('/register').post(validateBody(schemas.userSchema) ,UsersController.newUser);

router.route('/login').post(UsersController.userLogin);

router.route('/logout').get(UsersController.userLogout);

module.exports = router;