const notesRoutes = require('./notesRoutes.js');
const router = require('express').Router();

// reuses router from notesRoutes
router.use(notesRoutes);

module.exports = router;
