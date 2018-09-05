const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users');

const { validateParam, validateMultiParam , validateBody, schemas }  = require('../helpers/RouterHelper');

router.route('/').get(UsersController.isNotAuthenticated,UsersController.notAuthenticatedHandle);
router.route('/:reqpage-:reqsize').get([ validateMultiParam(schemas.paginationSchema) ],UsersController.pagination)

router.route('/update/:userId').patch([validateParam(schemas.idSchema,'userId'), validateBody(schemas.userUpdateSchema) ], UsersController.updateUser);

router.route('/register').post(validateBody(schemas.userSchema) ,UsersController.newUser);

router.route('/login').post(UsersController.isNotAuthenticated,UsersController.userLogin)
                      .get(UsersController.notAuthenticatedHandle);    

router.route('/logout').get(UsersController.isAuthenticated,UsersController.userLogout);




module.exports = router;