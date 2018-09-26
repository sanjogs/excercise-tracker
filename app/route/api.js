var User = require('../models/user');

var apiRoute = function(app) {

    app.get('/api/exercise/log', function(req, res) {});
    app.get('/api/exercise/users', function(req, res) {
        User.find(function(err, result) {
            if (err) res.status(500).send();
            res.json(result);
        });
    });

    app.route('/api/exercise/new-user')
        .post(function(req, res) {
            var newUser = new User();

            newUser.username = req.body.username;

            newUser.save(function(err, record) {
                if (err) {
                    res.status(501).send();
                }

                res.json(record);
            });

        });

    app.route('/api/excercise/add')
        .post(function(req, res) {});
}

module.exports = apiRoute;