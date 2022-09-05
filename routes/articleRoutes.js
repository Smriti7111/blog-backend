const { Router } = require("express");
const { index, show, store, update, destroy } = require("../controllers/articleController");

const router = Router();

//routes
router.get('/', index);
router.get('/:slug', show);
router.post('/', store);
router.patch('/:slug', update);
router.delete('/:slug', destroy);

module.exports = router;