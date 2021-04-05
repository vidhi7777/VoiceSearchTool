/**
 * this method extract the images and title of the resultant products fetched from redis-search-service.
 */

 const extract = (results) =>{
    var arr = results.map(item => {
        return {
            title : item.doc.title,
            images : item.doc.images
        }
    });
    return arr;
 }

 module.exports = {extract}