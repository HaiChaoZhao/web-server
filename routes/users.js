const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users');

const { validateParam, validateMultiParam , validateBody, schemas }  = require('../helpers/userRouterHelper');

router.route('/').get(UsersController.index);
router.route('/:reqpage-:reqsize').get([ UsersController.paginationParams, validateMultiParam(schemas.userPaginationSchema) ],UsersController.pagination)

router.route('/register').post(validateBody(schemas.userSchema) ,UsersController.newUser);

router.route('/login').post(UsersController.isNotAuthenticated,UsersController.userLogin);

router.route('/logout').get(UsersController.isAuthenticated,UsersController.userLogout);



module.exports = router;