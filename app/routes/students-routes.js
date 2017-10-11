var constants = require('../constants/constants');
module.exports = function(app){
    app.post('/app/student/new-student', function(req, res){
        constants.db.collection('students').insert(req.body,{},function(err, result){
            if(err){
                res.status(500);
                res.send(formErrorMessage(err));
            }
            else{
                res.send(result);
            }
                
        })
    });
    
    app.post('/app/student/update', function(req, res){
        constants.db.collection('students').update({_id: req.body._id},{'$set':req.body.updatedContent},function(err, result){
            if(err){
                res.status(500);
                res.send(err);
            }
            else{
                res.send(result);
            }
                
        })
    });
    
    app.get('/app/student/stats', function(req, res){
        constants.db.collection('students').aggregate({
            $group:{
                _id:'',
                totalFeesPending:{$sum:'$totalFeesPending'},
                totalFeesExpected:{$sum:'$totalFeesExpected'},
                count:{$sum:1}
            }
        }, function(err, result){
            if(err){
                res.status(500);
                res.send(err);
            }
            else{
                res.send(result);
            }
        })
    })
    
}

function formErrorMessage(error){
    if(error.code === 11000){
        return 'Duplicate Admission Number';
    }
    return error;
}
