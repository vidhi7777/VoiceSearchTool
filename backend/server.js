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
  // searchService();
  console.log("hello");
 return res.send('Search Results api');
});

// endpoint for returning results back to React server
app.get('/api/results/',function(req,res){

    // call here the ML script which returns the end search results.    

})

// endpoint for receiving data
app.post('/api/user-query',function(req,res){
    const query={
        command : req.body.command
    }
    console.log(query); 

})

app.listen(process.env.PORT || 8080);