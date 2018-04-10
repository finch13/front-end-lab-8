var express = require('express');
var router = express.Router();
var handlers = require('./controllers/handlers');

router.get('/', handlers.all);
router.get('/:id', handlers.findById);

router.post('/', handlers.create);
router.put('/:id', handlers.update);
router.delete('/:id', handlers.delete);

module.exports = router;