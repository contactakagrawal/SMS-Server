(function(){
    'use strict';
    let express = require('express');
    let app = express();
    let cors = require('cors')
    let bodyParser = require('body-parser');
    let jwt = require('jwt-simple');
    const fileUpload = require('express-fileupload');
    let PORT = 3000;

    let MongoClient = require('mongodb').MongoClient;
    let constants = require('./app/constants/constants');
    
    app.use(bodyParser.json());
    app.use(cors());
    app.use(express.static('dist'));
    app.use(express.static('studentpics'));
    app.use(fileUpload());
    
    // Initialize connection once
    MongoClient.connect("mongodb://localhost:27017/JPS", function(err, database) {
      if(err) throw err;
      constants.db = database;

      // Start the application after the database connection is ready
      app.listen(PORT, function(){
          console.log(`Listening on port ${PORT}`);
      });
    });
    
    require('./app/routes/students-routes.js')(app);
    require('./app/routes/common-crud.js')(app);
    
})();
