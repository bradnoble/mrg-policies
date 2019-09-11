///////////////////////////
// #region App Initialization

const cfenv = require("cfenv"),
  appEnv = cfenv.getAppEnv(),
  dotenv = require('dotenv').config(),
  express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  jsonParser = bodyParser.json(),
  // Json2csvParser = require('json2csv').Parser,
  // qrate = require('qrate'),
  opts = { url: process.env.URL }
  ;

// Initialize Cloudant
var cloudant = require('@cloudant/cloudant')(opts);
var db = cloudant.db.use("mrg");

// Create a new Express application.
var app = express();
// enable cors for all requests
// https://github.com/expressjs/cors
app.use(cors());
var http = require('http').Server(app);

app.use(bodyParser.urlencoded({ extended: false }));

//Define base directory for application. Use it by referencing '__basedir'
global.__basedir = __dirname;
//console.log('base=' + __basedir);

http.listen(appEnv.port, "0.0.0.0", function () {
  console.log("server starting on " + appEnv.url);     // print a message when the server starts listening
});

app.use(express.static(__dirname + '/public'));

// #endregion app initializiation
///////////////////////////


///////////////////////////
// #region endpoints 

// faceted search 
app.get('/api/search',
  function (req, res) {
  
    // set a placeholder for the query params that we will send to cloudant
    // after we work on them a bit
    let obj = req.query;

    let queryString = req.query.q.trim();
    // convert default Lucene query from OR to AND
    // and add wildcards so that users don't have to get searches exactly right
    // 1. split the querystring into an array
    let queryStringAsArray = queryString.split(' ');
    // 2. add the wildcard operator to every element in the array
    queryStringAsArray = queryStringAsArray.map(function(e) {return e + '*'});
    // turn the array into one long string, with AND between the wildcard strings
    queryStringAsArray = queryStringAsArray.join(' AND ');

    obj.q = queryStringAsArray;

    if(typeof req.query.drilldown == 'string'){
      obj.drilldown = JSON.parse(req.query.drilldown);
    }

    // build an object for query parameters
    let params = {
      include_docs: true,
      limit: 200,
      // sort: ["type<string>","title<string>"], // https://developer.ibm.com/answers/questions/178330/sorting-cloudant-data-in-node-red/
      counts: [
        "type"
      ]
    }

    // merge the querystring (q) and drilldown params into the params object
    // so that we can use it in the query below
    Object.assign(obj,params);
    
    if (req.query) {
      db.search('foo', 'search',
        obj
        , function (err, resp) {
          if (!err) {
            console.log(resp);
            res.send(resp)
          } else {
            console.log(err);
            res.send(err)
          }
        }
      );
    } 
  }
);

// get a record, simple
app.get('/api/lookup/:id',
  function (req, res) {
    let id = req.params.id;

    // console.log(id);

    db.get(id).then(
      (doc) => {
        // console.log(doc)
        res.send(doc);
      }, (error) => {
        console.log('error: ', error)
        res.status(404).json({
          "error": "That record does not exist."
        });
      }
    );
  }
);

// get items by type
app.get('/api/get/items/',
  function(req, res){
    /////////////////////////////////////
    // #region selector for items by type
    /* https://cloud.ibm.com/docs/services/Cloudant/api?topic=cloudant-query#the-or-operator
    "selector": {
        "$or": [
            { "director": "George Lucas" },
            { "director": "Steven Spielberg" }
        ]
    },
    */
    let selectorArray = [];
    let requestedTypes = [];
    let selectorObj = {};

    if(req.query.type){      
      // console.log("type:" + typeof req.query.type);
      // if it's a string but not formatted like an array
      // ie, it's not surrounded by brackets... push it into an array
      if(typeof req.query.type == "string"){
        if(req.query.type.indexOf("[") < 0){
          // http://localhost:6002/api/get/items?type=clip
          // console.log('string but not formatted like an array')
          requestedTypes.push(req.query.type);
        } else {
          // http://localhost:6002/api/get/items?type=["clip"]
          // http://localhost:6002/api/get/items?type=["clip","policy"]
          // console.log('string formatted like an array')
          requestedTypes = JSON.parse(req.query.type);
          // console.log(requestedTypes);
        }
      } else {
        // http://localhost:6002/api/get/items?type=clip&type=policy
        // console.log('array')
        requestedTypes = req.query.type;
      }

      requestedTypes.forEach((type) => {
        selectorArray.push({"type": type});
      })
      selectorObj = {
        "$or": selectorArray
      };
    }

    // #endregion selector for items by type
    /////////////////////////////////////

    db.find({
      selector: selectorObj,
      sort: [
        {"date:string":"desc"}
      ]
    })
    .then((data) => {
      // console.log(data);
      res.send(data);
    })
    .catch((err) => {
      // console.log(err);
      res.status(404).json({
        "error": "There is a problem with that request."
      });
  })
  }
);

app.get('/api/get/itemsById',
  function(req, res){
    // console.log(req.query.keys)
    db.fetch({
      'keys': req.query.keys,
      'include_docs': true
    }).then((body) => {
      console.log(body)
      res.send(body);      
    }, (error) => {
        // console.log('error: ', error)
        res.status(404).json({
          "error": "Those docs do not exist."
        });
  });
});

// get items by type
app.get('/api/get/relatedItems/',
  function(req, res){
    db.find({
        "selector": {
           "policies": {
              "$elemMatch": {
                 "$eq": req.query.id
              }
           }
        },
        "sort": [
           {
              "date:string": "desc"
           }
        ]
    })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      // console.log(err);
      res.status(404).json({
        "error": "There is a problem with that request."
      });
  })
  }
);



// get policies
app.get('/api/get/policies',
  function(req, res){
    db.view('foo','by_type',{
      // 'key': 'policy',
      'include_docs': true
    }).then((body) => {
      console.log(body)
      res.send(body);      
    }, (error) => {
        console.log('error: ', error)
        res.status(404).json({
          "error": "That view does not exist."
        });
  });
});

app.post('/api/save',
  jsonParser,
  function (req, res) {
    var item = req.body;

    // datestamp the update
    item.date_updated = new Date().toISOString();

    db.insert(item, function (err, doc) {
      if (!err) {
        //console.log('success updating person, will add people to response next');
        //console.log(doc);
        res.send(doc);
      }
      else {
        console.log('item:' + err.reason);
      }
    });
  }
);

// #endregion endpoints
/////////////////////////


///////////////////////////
// #region database indexes

// code below holds couchdb/Cloudant views and search indexes
// b/c that code is in this file, server restarts automatically upload and reindex
// having them in this file makes managing them easier than using the admin console
// and allows for version control in git

// https://stackoverflow.com/questions/38385101/couchdb-update-design-doc
const ddoc = {
  _id: "_design/foo",
  views: {
    by_type: {
      map: function (doc) {
        if (doc.type == 'policy') {
          emit(doc.date, 1);
        }
      }//,
      //reduce: '_sum'
    },
    last_updated: {
      map: function (doc) {
        if(doc.updated) {
          emit(doc.updated, 1);
        }
      }
    },
  },
  indexes: {
    search: {
      analyzer: 'standard',
      index: function (doc) {
        index('type', doc.type, { "store": true, "facet": true });
        index('title', doc.title, { "store": true, "facet": true });
        index('default', doc.body, { "store": true });
        index('default', doc.title, { "store": true });
      }
    }
  }
};

// upload the design doc
db.get(ddoc._id, function (err, doc) {
if (err) {
  //console.log('no ddoc');
  db.insert(ddoc, function (err, doc) {
    if (!err) {
      //console.log('success: inserted ddoc');
    }
    else {
      console.log('ddoc:' + err.reason);
    }
  });
}
else {
  ddoc._rev = doc._rev;
  db.insert(ddoc, function (err, doc) {
    if (!err) {
      //console.log('success: updated ddoc');
      //console.log(doc);
    }
    else {
      console.log('ddoc:' + err.reason);
    }
  });
}
});

// build the Cloudant Query index for ad hoc queries by type
const ad_hoc_queries = { 
  name:'type', 
  type:'text', 
  index:{}
};
db.index(ad_hoc_queries, function(err, response) {
  if (err) {
    throw err;
  }
  console.log('Index creation result: %s', response.result);
});


// #endregion database indexes
///////////////////////////////
