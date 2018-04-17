var express = require('express');
var router = express.Router();

/* GET all users. */
router.get('/', function(req, res) {
    // retrieve all users from the db
   res.render('users', { });
});

/* POST new user. */
router.post('/', function(req, res) {
    // store the user in the db
    res.render('users', { });
});

/* GET specific user. */
router.get('/:userId', function(req, res) {
    // retrieve one user from the db
    res.render('user page', { });
});

module.exports = router;
