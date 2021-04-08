import React,{useState,useEffect} from 'react';
import ProductCard from './ProductCard';

const ProductContainer = (props) => {
    return(
        <div>
            {
                props.items.map(item => {
                    item.images.map(img => (
                        <ProductCard title = {item.title} image = {img} body={item.body}/>    
                    ))
                })
            }
        </div>
    )
}

export default ProductContainer;