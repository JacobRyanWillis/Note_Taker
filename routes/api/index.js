const router = require('express').Router();
const noteRoutes = require('./noteRoutes.js');

router.use('/notes', noteRoutes);


module.exports = router;