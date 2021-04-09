import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import ProductCard from './ProductCard';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const ProductsSwiper = (props) =>{

    const body =  props.items.map((item,index) => {
      return item.images.map(img => (
          <ProductCard title = {item.title} image = {img} body={item.body}/>                                   
      )
      )
    })
    return(
        <div>
                <AutoPlaySwipeableViews>
                  {
                   body
                  }
                </AutoPlaySwipeableViews>
        </div>
    
    )
}

export default ProductsSwiper;