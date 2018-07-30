const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../controllers/users');
const { validateParam, validateMultiParam , validateBody, schemas }  = require('../helpers/RouterHelper');
const poorRelationControllers = require('../controllers/poorRelation');

router.route('/').get();

module.exports = router;