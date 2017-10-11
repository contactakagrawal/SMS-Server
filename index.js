(function(){
    'use strict';
    let express = require('express');
    let app = express();
    let cors = require('cors')
    let bodyParser = require('body-parser');
    let jwt = require('jwt-simple');

    let MongoClient = require('mongodb').MongoClient;
    let constants = require('./app/constants/constants');
    
    app.use(bodyParser.json());
    app.use(cors());
    app.use(express.static('dist'));
    
    process.on('exit', function () {
        console.log('About to exit.');
    });
    
    // Initialize connection once
    MongoClient.connect("mongodb://localhost:27017/JPS", function(err, database) {
      if(err) throw err;
      constants.db = database;

      // Start the application after the database connection is ready
      app.listen(3000, function(){
          console.log("Listening on port 3000");
      });
    });
    
    require('./app/routes/students-routes.js')(app);
    require('./app/routes/common-crud.js')(app);
    
})();
