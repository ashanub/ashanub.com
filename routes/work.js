const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('work', { title: 'Ashan Boralugoda'});
});

module.exports = router;
