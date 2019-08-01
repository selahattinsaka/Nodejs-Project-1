var express = require('express');
var router = express.Router();

const Director = require('../models/Director');
router.post('/', (req, res, next) => {
  const director = new Director(req.body);

  director.save((err, data) =>{
    if (err)
      res.json(err);

    res.json(data);
  });
});

module.exports = router;
