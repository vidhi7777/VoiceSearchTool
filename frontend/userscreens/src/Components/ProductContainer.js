import React from 'react';
import ProductCard from './ProductCard';

const ProductContainer = (props) => {
    console.log(props.items);
    const body =props.items.map(item => {
        return item.images.map(img => (
            <ProductCard title = {item.title} image = {img} body={item.body}/>    
        ))
    })
    return(
        <div style={{display:"flex",flexDirection:"row",justifyItems:"center",justifyContent:"space-between",
        flexWrap : "wrap",padding : 100}}>
            {
             body   
            }
        </div>
    )
}

export default ProductContainer;