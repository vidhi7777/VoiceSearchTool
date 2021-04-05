const dotenv = require('dotenv');

dotenv.config()

const dataset = require('./testData').dataset;
const redis = require("redis");
const rediSearchClient = require('./index.js');
const my_data = rediSearchClient(redis,'myntra',{ clientOptions:{port: 6379, host: "127.0.0.1",no_ready_check: true,password:process.env.PASSWORD }});


const searchService = () => {
    my_data.createIndex([
        my_data.fieldDefinition.text('body',true),
        my_data.fieldDefinition.text('uniq_id',true),
        my_data.fieldDefinition.text('product_id',true)
    ],
    function(err){
            if(err){
                console.log('error1',err.message,err.stack);
            }
    })
    dataset.data.forEach((item,index) => {
            my_data.add(`doc${index}`,item,function(err){
                if(err){
                    console.log('error2',err.message,err.stack);
                }
            })
    });
    console.log(my_data);
    my_data.search('kurta',function(err,results){
        if(err){
            console.log(err);
        }
        console.log(results.results[0]);
    })
    my_data.dropIndex();
}

module.exports = {searchService}