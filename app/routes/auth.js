var constants = require('../constants/constants');
var jwt = require('jwt-simple');

module.exports = function(app){
    app.all('/app/*', function (req, res, next) {
        console.log('Accessing the secret section ...');
        var token = req.headers['token'];
        if(token){
            try{
                var decoded = jwt.decode(token, constants.secret, constants.algorithm);
                if(decoded.secret === constants.secret){
                    constants.db.collection('userCollection').findOne({_id:decoded.username}, function(err, result){
                        if(err){
                            res.send({
                                error: 'Unauthorised User'
                            });
                            return;
                        }
                        
                        if(result){
                            next(); // pass control to the next handler
                        }
                    })
                }else{
                    res.send({
                        error: 'Unauthorised User'
                    });
                }
            }catch(e){
                res.send({
                    error: 'Unauthorised User'
                });
            }
        }else{
            res.send({
                error: 'Unauthorised User'
            });
        }
        
    })
}
