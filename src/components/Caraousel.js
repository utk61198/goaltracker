import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import anim4 from "../carouselimages/anim4.jpg"
import anim14 from "../carouselimages/anim14.jpg"
import anim9 from "../carouselimages/anim9.png"
import anim1 from "../carouselimages/anim1.jpg"


 
class Slide extends Component {
    render() {
        return (
            <Carousel autoPlay infiniteLoop showThumbs={false} swipeable dynamicHeight={true}>
                <div>
                    <img src={anim4} />
                </div>
                <div>
                    <img src={anim14} />
                </div>
                <div>
                    <img src={anim1} />
                </div>
            </Carousel>
        );
    }
}
export default Slide
 
 
// Don't forget to include the css in your page
 
// Using webpack or parcel with a style loader
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
 
// Using html tag:
// <link rel="stylesheet" href="<NODE_MODULES_FOLDER>/react-responsive-carousel/lib/styles/carousel.min.css"/>