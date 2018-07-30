const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../controllers/users');
const { validateParam, validateMultiParam , validateBody, schemas }  = require('../helpers/RouterHelper');
const poorRelationControllers = require('../controllers/poorRelation');

router.route('/').post(poorRelationControllers.newDoc);
router.route('/:phrId').patch(poorRelationControllers.updateDoc);
router.route('/:reqpage-:reqsize').get(poorRelationControllers.pagination)

module.exports = router;