import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-bootstrap";
// import anim4 from "../carouselimages/anim4.jpg"
// import anim14 from "../carouselimages/anim14.jpg"
// import anim1 from "../carouselimages/anim1.jpg"
// import anim5 from "../carouselimages/anim5.jpg"
// import anim2 from "../carouselimages/anim2.jpg"

import quote1 from "../carouselimages/quote1.png";
import quote2 from "../carouselimages/quote2.png";
import { Paper } from "@material-ui/core";

import {
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  CardActions,
  CardContent,
} from "@material-ui/core";

class Slide extends Component {
  render() {
    return (
      <Carousel
        style={{
          marginTop: "2%",
          padding: "1%",
          width: "60%",
        }}
      >
        {/* <Carousel.Item interval={400}>
    <img
      className="d-block w-100"
      src={anim4}
      alt="First slide"
    />
  
  </Carousel.Item>
  <Carousel.Item interval={400}>
    <img
      className="d-block w-100"
      alt="Third slide"
      src={anim1}

    />
  
  </Carousel.Item>
  <Carousel.Item interval={400}>
    <img
      className="d-block w-100"
      src={anim14}
      alt="Third slide"
    />
  
  </Carousel.Item>
  <Carousel.Item interval={400}>
    <img
      className="d-block w-100"
      src={anim5}
      alt="Third slide"
    />
  
  </Carousel.Item>
  <Carousel.Item interval={400}>
    <img
      className="d-block w-100"
      src={anim2}
      alt="Third slide"
    />
  
  </Carousel.Item> */}

        <Carousel.Item interval={2000}>
          <img
            borderRadius="10%"
            className="d-block w-100"
            src={quote1}
            alt="Third slide"
          />
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img className="d-block w-100" src={quote2} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
    );
  }
}
export default Slide;

// Don't forget to include the css in your page

// Using webpack or parcel with a style loader
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

// Using html tag:
// <link rel="stylesheet" href="<NODE_MODULES_FOLDER>/react-responsive-carousel/lib/styles/carousel.min.css"/>
