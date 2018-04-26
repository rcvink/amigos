var express = require('express');
var router = express.Router();
var typeorm = require('typeorm');
var connection = typeorm.getConnection();

/* GET all users. */
router.get('/', function(req, res) {
    // retrieve all users from the db
   res.render('users', { });
});

/* POST new user. */
router.post('/', function(req, res) {
    var saveUser = function(connection) {
        var user = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        };
        var userRepository = connection.getRepository("user");
        userRepository.save(user)
            .then(function(savedUser) {
                console.log("User has been saved: ", savedUser);
            });
    };
    saveUser(connection);
    res.render('signed-up', { username: req.body.username });
});

/* GET specific user. */
router.get('/:userId', function(req, res) {
    // retrieve one user from the db
    res.render('user page', { });
});

module.exports = router;
