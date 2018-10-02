var User = require('../models/user');
var Exercise = require('../models/excercise');


var apiRoute = function(app) {


    app.get('/api/exercise/users', function(req, res) {
        User.find({}, '_id username', function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    });

    app.route('/api/exercise/new-user')
        .post(function(req, res) {
            var newUser = new User();

            newUser.username = req.body.username;

            newUser.save(function(err, doc) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({
                        _id: doc._id,
                        username: doc.username
                    });
                }
            });
        });

    app.route('/api/exercise/add')
        .post(function(req, res) {
            User.findById(req.body.userId
                , function(err, userRecord) {

                    if (err) {
                        res.status(400).send('user not found');
                    } else {

                        var exercise = new Exercise();
                        exercise.userId = req.body.userId;
                        exercise.description = req.body.description;
                        exercise.duration = req.body.duration;
                        exercise.date = req.body.date || new Date();

                        exercise.save(function(err, record) {
                            if (err) {
                                res.status(400).send('invalid data');
                            } else {
                                res.json({
                                    _id: userRecord._id,
                                    username: userRecord.username,
                                    description: record.description,
                                    duration: record.duration,
                                    date: record.date
                                });
                            }
                        });
                    }
                })
        });

    app.get('/api/exercise/log', function(req, res) {
        var uId = req.query.userId;
        if (!uId) {
            res.status(400).send('invalid userId');
        } else {
            User.findById(uId, function(err, userDoc) {
                if (err) {
                    res.send(err);
                } else if (!userDoc) {
                    res.send('User Not Found');
                } else {

                    var dtFrom = req.query.from || new Date('1/1/1001');
                    var dtTo = req.query.to || new Date('1/1/9999');
                    var reqLimit = req.query.limit || 0;
                    Exercise.find({
                        userId: uId,
                        date: {
                            $gte: dtFrom,
                            $lte: dtTo
                        }
                    },
                        {},
                        {
                            sort: {
                                date: 1
                            },
                            limit: parseInt(reqLimit)
                        },
                        function(err, doc) {
                            if (err) {
                                res.send(err);
                            } else {
                                var ret = {
                                    _id: uId,
                                    userName: userDoc.username,
                                    count: doc.length,
                                    log: doc.map(function(d){
                                        return {description: d.description,
                                         duration:d.duration,
                                         date:d.date};
                                    })
                                };
                                res.json(ret);
                            }
                        });
                }
            });

        }
    });
}

module.exports = apiRoute;