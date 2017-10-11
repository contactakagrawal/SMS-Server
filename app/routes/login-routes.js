var constants = require('../constants/constants');
var jwt = require('jwt-simple');

module.exports = function(app){
    
    // on successful login create a jwt token and send it in response
    app.post('/users/login', function(req, res){
        var username = req.body.username;
        var password = req.body.password;
        // validate if the username & password are correct
        constants.db.collection('userCollection').findOne({_id:username, password:password}, function(err, result){
            if(err) throw err;
            console.log(JSON.stringify(result));
            if(result){
                var payload = {secret: constants.secret, username:username};
                var token = jwt.encode(payload, constants.secret, constants.algorithm);
                res.send({
                    isValidUser: true,
                    token: token
                });
            }else{
                res.send({
                    isValidUser: false
                });
            }
            
        })
    });
}
