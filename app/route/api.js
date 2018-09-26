var User = require('../models/user');
var Exercise=require('../models/excercise');


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

    app.route('/api/exercise/add')
        .post(function(req, res) {
          
            var exercise = new Exercise();
            exercise.userId=req.body.userId;
            exercise.description=req.body.description;
            exercise.duration=req.body.duration;
            exercise.date=req.body.date || new Date();

            exercise.save(function(err, record){
                res.json(record);
            });

        });

    var validateExerciseRequest = function(req,res){
        //check required fields
        //userid
        //descriptpn
        //duration
        //
    }
}

module.exports = apiRoute;