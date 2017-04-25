var mongoose = require('mongoose'),
    User = mongoose.model('User');


exports.create = function (req, res) {
    var user = new User(req.body);
    user.name = req.body.name;
    user.email = req.body.email;
    user.creator = req.user;
    user.save(function (err) {
        if (err) {
            return res.status(400).send({message: getErrorMessages(err)});
        } else {
            return res.json(user);
        }
    })

};