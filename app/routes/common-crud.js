var constants = require('../constants/constants');


module.exports = function(app){
    
    app.post('/app/read', function(req, res){
        req.body.limit = req.body.limit || 0;
        req.body.skip = req.body.skip || 0;

        let fn = constants.db.collection(req.body.collectionName)
            .find(req.body.filter)
            .limit(req.body.limit)
            .skip(req.body.skip);
        if(req.body.sort){
            fn = fn.sort(req.body.sort);
        }
        fn.toArray(function(err, result){
                if(err) res.send(err);
                res.send(result);
        })
    });
    
    app.post('/app/delete', function(req, res){
        constants.db.collection(req.body.collectionName).remove(req.body.removeCriteria, function(err, result){
                if(err) res.send(err);
                res.send(result);
        })
    });
    
    app.post('/app/save', function(req, res){
        constants.db.collection(req.body.collectionName).save(req.body.newPayLoad, function(err, result){
                if(err) res.send(err);
                res.send(result);
        })
    });

    app.post('/app/insert', function(req, res){
        constants.db.collection(req.body.collectionName).insert(req.body.payloadToBeInserted,{},function(err, result){
            if(err) {
                res.status(500);
            }
            else{
                res.send(result);
            }

        })
    });

    app.post('/app/update', function(req, res){
        constants.db.collection(req.body.collectionName).update(req.body.updateCriteria,{'$set':req.body.updatedContent},function(err, result){
            if(err){
                res.status(500);
                res.send(err);
            }
            else{
                res.send(result);
            }
        })
    })
    
};
