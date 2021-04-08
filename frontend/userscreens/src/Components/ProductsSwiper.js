import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import ProductCard from './ProductCard';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const ProductsSwiper = (props) =>{

    const body =  props.items.map((item,index) => {
      item.images.map(img => (
          <ProductCard title = {item.title} image = {img} body={item.body}/>                                   
      )
      )
    })
     return(
        <div>
            {fetched && (
                <AutoPlaySwipeableViews>
                  {
                   body
                  }
                </AutoPlaySwipeableViews>
            )}
            {!fetched && (
                <CircularProgress color="secondary"/>
            )}

        </div>
    
    )
}

export default ProductsSwiper;