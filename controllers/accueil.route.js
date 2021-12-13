const express = require('express');
const { route } = require('./bikes.route');
const router = express.Router();
router.get('/', accueilRootAction);

function accueilRootAction(request, response) {
    response.render("accueil");
}

module.exports = router;