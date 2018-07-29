const express = require('express');
const router = express.Router();

const poorHouseControllers = require('../controllers/poorHouse');

router.route('/').get(poorHouseControllers.getPoorHouse)
                .post(poorHouseControllers.newPoorHouse);

module.exports = router;