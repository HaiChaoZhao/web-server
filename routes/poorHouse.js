const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../controllers/users');
const { validateParam, validateMultiParam , validateBody, schemas }  = require('../helpers/RouterHelper');
const poorHouseControllers = require('../controllers/poorHouse');

router.route('/').get([isAuthenticated,poorHouseControllers.userAccess("无限制")], poorHouseControllers.getPoorHouse)
                .post(isAuthenticated, poorHouseControllers.newPoorHouse);

router.route('/search/:phName').get(isAuthenticated,poorHouseControllers.getPoorHouseByName)

router.route('/:phId').patch([validateParam(schemas.idSchema,'phId'), validateBody(schemas.poorHouseUpdateSchema)],poorHouseControllers.updatePoorHouse)
                     

router.route('/:reqpage-:reqsize').get(validateMultiParam(schemas.paginationSchema),poorHouseControllers.pagination);

module.exports = router;