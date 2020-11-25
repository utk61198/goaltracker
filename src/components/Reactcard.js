import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactCardCarousel from "react-card-carousel";
import quote1 from "../carouselimages/quote1.png";
import quote2 from "../carouselimages/quote2.png";
import q1 from "../carouselimages/q1.jpg";
import q2 from "../carouselimages/q2.jpg";
import q3 from "../carouselimages/q3.jpg";
import q4 from "../carouselimages/q4.jpg";
import q5 from "../carouselimages/q5.jpg";
import q6 from "../carouselimages/q6.jpg";
import q7 from "../carouselimages/q7.jpg";
import q8 from "../carouselimages/q8.jpg";
import q9 from "../carouselimages/q9.jpg";





class MyCarousel extends Component {
  static get CONTAINER_STYLE() {
    return {
      position: "relative",
      height: "45vh",
      width: "100%",
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "middle",

    };
  }

  static get CARD_STYLE() {
    return {
      height: "40vh",
      width: "100%",
    //   paddingTop: "80px",
      textAlign: "center",
      background: "#52C0F5",
      color: "#FFF",
      fontFamily: "sans-serif",
      fontSize: "12px",
      textTransform: "uppercase",
      borderRadius: "20px",
      boxSizing: "border-box",
    //   padding:"0.5%"

    };
  }

  render() {
    return (
      <div style={MyCarousel.CONTAINER_STYLE}>
        <ReactCardCarousel autoplay={true} autoplay_speed={3000}>
          <div style={MyCarousel.CARD_STYLE}><img src={quote1} height="100%" width="100%" style={{borderRadius:"20px"}}></img></div>
          <div style={MyCarousel.CARD_STYLE}><img src={quote2} height="100%" width="100%" style={{borderRadius:"20px"}}/></div>
          <div style={MyCarousel.CARD_STYLE}><img src={q1} height="100%" width="100%" style={{borderRadius:"20px"}}/></div>
          <div style={MyCarousel.CARD_STYLE}><img src={q2} height="100%" width="100%" style={{borderRadius:"20px"}}/></div>
          <div style={MyCarousel.CARD_STYLE}><img src={q3} height="100%" width="100%" style={{borderRadius:"20px"}}/></div>
          <div style={MyCarousel.CARD_STYLE}><img src={q4} height="100%" width="100%" style={{borderRadius:"20px"}}/></div>
          <div style={MyCarousel.CARD_STYLE}><img src={q5} height="100%" width="100%" style={{borderRadius:"20px"}}/></div>
          <div style={MyCarousel.CARD_STYLE}><img src={q6} height="100%" width="100%" style={{borderRadius:"20px"}}/></div>
          <div style={MyCarousel.CARD_STYLE}><img src={q7} height="100%" width="100%" style={{borderRadius:"20px"}}/></div>
          <div style={MyCarousel.CARD_STYLE}><img src={q8} height="100%" width="100%" style={{borderRadius:"20px"}}/></div>
          

        </ReactCardCarousel>
      </div>
    );
  }
}

export default MyCarousel