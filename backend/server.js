const service = require('./services/RedisSearchService');
const express = require('express');
const cors = require('cors');

const app = express();

//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json());

// BASE-URL
app.get('/', function (req, res) {
    console.log("Server running");
    return res.send('Search Results api');
});

// endpoint for returning results back to React server
app.get('/api/results/',function(req,res){
  const query={
      command : req.query.command
  }
    console.log("QueryString: ",query); 
    if(query!==null || query!==""){
      res.send(JSON.stringify(service.searchService(query.command)))
    }
     res.send({"message":"Invalid query"})

})

app.listen(process.env.PORT || 8080);