const express = require('express');
const cors = require('cors');
const pyClient = require('./runToken');
const dotenv = require('dotenv');
dotenv.config()
const { RedisSearchService } = require('./services/RedisSearchService');
const { response } = require('express');

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
app.get('/api/results/', async (req,res)=> {
   
    console.log(req.query.command);

    // const output = await pyClient.run(req.query.command);

    // console.log(output)

    const searchObj = new RedisSearchService();
    await new Promise(function(resolve,reject){
      resolve(searchObj.searchService("white shirt and pants"));
    }).then((results)=>{
          console.log(results);
          res.send({"results": results});
    })
})

app.get('api/weatherfilter/results',async(req,res)=>{

    const output = await run(req.query.command);
    const searchObj = new RedisSearchService();
    await new Promise(function(resolve,reject){
      resolve(searchObj.searchService(req.query.command));
    }).then((results)=>{
          console.log(results);
          res.send({"results": results});
    })


})

app.listen(process.env.PORT || 8080);