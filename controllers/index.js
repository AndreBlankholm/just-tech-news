//packaged group of API endpoints and prefixing them with the path /api
const router = require('express').Router();
const homeRoutes = require('./home-routes.js');  // client facing
const apiRoutes = require('./api');


router.use('/', homeRoutes);    // client facing
router.use('/api', apiRoutes);



router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
