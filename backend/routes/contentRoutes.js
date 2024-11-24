const express = require('express');
const { getAllContent, getContentById } = require('../controllers/contentControllers');
const router = express.Router();

router.get('/', getAllContent);
router.get('/:id', getContentById);

module.exports = router;
