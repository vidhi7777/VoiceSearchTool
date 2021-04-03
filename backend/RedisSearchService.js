import dataset from './testData.js';

const redis = require("redis");
const redisearch = require("redredisearch");

const client = redis.createClient({ port: 6379, host: "127.0.0.1" });
const search = redisearch.setClient(client);

const searchService = () => {
    search.createSearch("search-test",dataset,function(err,search){

        dataset.data.forEach(item => {

            search.index([
                search.findDefinition.text(item.size,true),
                search.findDefinition.text(item.brand,true),
                search.findDefinition.text(item.dominant_material,true),
                search.findDefinition.text(item.actual_color,true),
                search.findDefinition.text(item.title,true),
                search.findDefinition.text(item.product_type,true),
                search.findDefinition.text(item.body,true),
                search.findDefinition.text(item.product_details,true),
                search.findDefinition.text(item.type,true),
                search.findDefinition.text(item.complete_the_look,true),
                search.findDefinition.text(item.specifications,true),
            ])

            search.query("Polyster").end(function (err, ids) {
                if (err) throw err;
                console.log('Search results for "%s":', query);
                ids.forEach(function (id) {
                  console.log("  - %s", strs[id]);
                });
              });
        });

    })

}

export default searchService;